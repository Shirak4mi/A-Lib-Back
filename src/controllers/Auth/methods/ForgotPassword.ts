import { generateDate, generateToken } from "@/utils/functions";
import { BadRequestException, InternalServerErrorException } from "@/utils/error";
import { sendRecoverEmail } from "@/utils/mail";
import { recoverUserDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "ForgotPassword",
  async ({ body: { email } }) => {
    try {
      const expires_at = generateDate(2, "h");
      const hashed_token = generateToken();

      const user = await prisma.user.update({
        data: {
          Tokens: { create: { hashed_token, expires_at, Type: { connect: { id: 3 } } } },
          Status: { connect: { id: 3 } },
        },
        select: { email: true },
        where: { email },
      });

      if (!user) throw new InternalServerErrorException("");

      const sendEmail = await sendRecoverEmail(hashed_token, email);
      if (!sendEmail) throw new Error("Could not send email, please try again later!");

      console.log(sendEmail);

      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { body: recoverUserDTO }
);
