import { BadRequestException } from "@/utils/error";
import { commonTokenDTO } from "../dtos";
import { Elysia } from "elysia";
import { prisma } from "@/db";

export default new Elysia().post(
  "ValidateEmail/:token",
  async ({ params: { token } }) => {
    try {
      if (!token || !token.length) throw new BadRequestException("Invalid Token");

      const existingToken = await prisma.temporalTokens.findFirst({ where: { hashed_token: token }, select: { id: true } });

      if (!existingToken) throw new BadRequestException("The provided Token doesnt exists");

      const user = await prisma.temporalTokens.findUnique({
        select: { User: { select: { id: true } }, expires_at: true },
        where: { id: existingToken.id },
      });

      if (!user) throw new BadRequestException("Not valid user related to token");

      //  Token Destructuring
      const { User, expires_at } = user;

      const expiredDateTime = new Date(expires_at).getTime();
      const currentDateTime = new Date().getTime();

      if (currentDateTime === expiredDateTime || currentDateTime > expiredDateTime)
        throw new BadRequestException("Invalid Token");

      const validatedUser = await prisma.user.update({
        data: {
          Tokens: { delete: { id: existingToken.id } },
          Status: { connect: { id: 2 } },
          verified_email: true,
        },
        select: { email: true },
        where: { id: User.id },
      });

      return validatedUser;
    } catch (e) {
      throw e;
    }
  },
  { params: commonTokenDTO }
);
