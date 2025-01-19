import { BadRequestException, InternalServerErrorException } from "@/utils/error";
import { generateRandomSalt } from "@/utils/functions";
import { CommonTokenDTO } from "@/common/DTO";
import { restorePasswordDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "RecoverPassword/:token",
  async ({ params: { token }, body: { password } }) => {
    try {
      if (!token || !token.length) throw new BadRequestException("Invalid Token");

      const tokenValidation = await prisma.temporalTokens.findFirst({
        select: { id: true, user_id: true },
        where: { hashed_token: token },
      });

      if (!tokenValidation) throw new BadRequestException("Invalid Token");
      // Sugary Code
      const password_salt = generateRandomSalt();
      const { id, user_id } = tokenValidation;

      const updateUser = await prisma.user.update({
        data: {
          password: await Bun.password.hash(password_salt + password, { algorithm: "argon2d" }),
          Status: { connect: { id: 2 } },
          Tokens: { delete: { id } },
          password_salt,
        },
        select: { email: true },
        where: { id: user_id },
      });

      if (!updateUser) throw new InternalServerErrorException("Couldn't change password try later");
      return updateUser;
    } catch (e) {
      throw e;
    }
  },
  { params: CommonTokenDTO, body: restorePasswordDTO }
);
