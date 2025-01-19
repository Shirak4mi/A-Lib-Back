import { commonBDR, generateDate, generateRandomSalt, generateToken } from "@/utils/functions";
import { ConflictException, InternalServerErrorException } from "@/utils/error";
import { saveUserProfilePicture } from "@/utils/file_management";
import { sendWelcomeMail } from "@/utils/mail";
import { createUserDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "Register",
  async ({ body, set }) => {
    try {
      const isNotUniqueUser = await prisma.user.findFirst({
        select: { id: true, email: true, document_id: true },
        where: {
          AND: [
            { email: { contains: body.email, mode: "insensitive" } },
            { document_id: { contains: body.document_id, mode: "insensitive" } },
          ],
        },
      });

      if (isNotUniqueUser) throw new ConflictException("User already Exists!");

      const password_salt = generateRandomSalt();
      const username = body.email.split("@")[0];
      const expires_at = generateDate(2, "h");
      const hashed_token = generateToken();

      const isFileSaved = await saveUserProfilePicture(body.profile_picture, `public/${username}`);

      const nUser = await prisma.user.create({
        data: {
          password: await Bun.password.hash(password_salt + body.password, { algorithm: "argon2d" }),
          Tokens: { create: { Type: { connect: { id: 1 } }, hashed_token, expires_at } },
          user_pictures: isFileSaved ? JSON.stringify(isFileSaved) : undefined,
          Document_Type: { connect: { id: parseInt(body.document_type_id) } },
          User_Type: { connect: { id: parseInt(body.account_type_id) } },
          birth_date: commonBDR(body.birth_date ?? "01/01/1777"),
          username: body.email.split("@")[0],
          phone_number: body.phone_number,
          Status: { connect: { id: 1 } },
          document_id: body.document_id,
          is_bookable: body.is_bookable,
          first_name: body.first_name,
          last_name: body.last_name,
          address: body.address,
          email: body.email,
          password_salt,
        },
        select: {
          verified_email: true,
          username: true,
          email: true,
        },
      });

      if (!nUser) throw new InternalServerErrorException("Unknown!");

      // Send Email if user was successfully created
      const sentEmail = sendWelcomeMail(hashed_token, nUser.email);

      if (!sentEmail) throw new InternalServerErrorException("Couldn't send email");

      // Set Response Headers
      set.headers["accept-encoding"] = "application/json";

      return nUser;
    } catch (e) {
      throw e;
    }
  },
  { body: createUserDTO }
);
