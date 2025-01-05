import { commonBDR, generateDate, generateRandomSalt, generateToken } from "@/utils/functions";
import { ConflictException, InternalServerErrorException } from "@/utils/error";
import { createUserDTO } from "../dtos";
import { Elysia } from "elysia";
import { prisma } from "@/db";
import { sendWelcomeMail } from "@/utils/mail";

export default new Elysia().post(
  "/Register",
  async ({ body, set }) => {
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
    const expires_at = generateDate(2, "h");
    const hashed_token = generateToken();

    const nUser = await prisma.user.create({
      data: {
        password: await Bun.password.hash(password_salt + body.password, { algorithm: "argon2d" }),
        Document_Type: { connect: { id: body.document_type_id } },
        birth_date: commonBDR(body.birth_date ?? "01/01/1777"),
        username: body.email.split("@")[0],
        phone_number: body.phone_number,
        Status: { connect: { id: 1 } },
        document_id: body.document_id,
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

    const sentEmail = sendWelcomeMail(hashed_token, nUser.email);
    
    if (!sentEmail) throw new InternalServerErrorException("Couldn't send email");

    set.headers["accept-encoding"] = "application/json";
    return nUser;
  },
  { body: createUserDTO }
);
