import { InternalServerErrorException, UnauthorizedException } from "@/utils/error";
import { commonBDR, generateRandomSalt } from "@/utils/functions";
import { updateUserProfilePicture } from "@/utils/file_management";
import { session_cookie_name } from "@/utils/constants";
import { sessionCookie } from "@/common/DTO";
import { UpdateProfileDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().patch(
  "Update",
  async ({ cookie, body }) => {
    try {
      const id = cookie[session_cookie_name].value;
      const isValidSession = await prisma.session.findFirst({
        select: { User: { select: { id: true, username: true } } },
        where: { id },
      });

      if (!isValidSession) throw new UnauthorizedException("Not Authorized!");

      // Sugary Destructs
      const { User } = isValidSession;
      const { birth_date, document_type_id, password } = body;

      // Constants
      const username = body.email ? body.email.split("@")[0] : User.username;
      const password_salt = generateRandomSalt();

      const isFileSaved = await updateUserProfilePicture(username, User.username, body.profile_picture);

      const uptd_user = await prisma.user.update({
        where: { id: User.id },
        data: {
          ...(password && { password: await Bun.password.hash(password_salt + password, { algorithm: "argon2d" }) }),
          ...(document_type_id && { Document_Type: { connect: { id: parseInt(document_type_id.toString()) } } }),
          ...(birth_date && { birth_date: commonBDR(birth_date ?? "01/01/1777") }),
          user_pictures: isFileSaved ? JSON.stringify(isFileSaved) : undefined,
          ...(password ? { password_salt } : { password_salt: undefined }),
          phone_number: body.phone_number,
          Status: { connect: { id: 2 } },
          document_id: body.document_id,
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          username,
        },
        select: {
          verified_email: true,
          username: true,
          email: true,
        },
      });

      if (!uptd_user) throw new InternalServerErrorException("Could not create user");
      return uptd_user;
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie, body: UpdateProfileDTO }
);
