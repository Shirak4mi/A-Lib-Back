import { createUserSessions, invalidateUserSessions } from "@/utils/session";
import { BadRequestException, UnauthorizedException } from "@/utils/error";
import { loginUserDTO } from "../dtos";
import { Elysia } from "elysia";
import { prisma } from "@/db";

export default new Elysia().post(
  "Login",
  async ({ body: { email, password }, cookie, set }) => {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
        select: {
          Status: { select: { name: true, id: true } },
          verified_email: true,
          password_salt: true,
          first_name: true,
          last_name: true,
          username: true,
          password: true,
          email: true,
          id: true,
        },
      });

      if (!user || !user.password_salt || !user.password) throw new BadRequestException("User not found.");

      const { Status, password: hash, password_salt: salt, id, ...rest } = user;

      if (!(await Bun.password.verify(salt + password, hash, "argon2d")))
        throw new BadRequestException("Password is invalid.");

      if (Status.id === 1) throw new UnauthorizedException("Please validate your email, before login!");
      if (Status.id > 3) throw new UnauthorizedException("Account blocked or deleted, please contact support!");

      // Sessions Cleaning
      const cleanSessions = await invalidateUserSessions(id);
      if (!cleanSessions) return;

      // New Session Creating
      const session = await createUserSessions(id);
      if (!session) return;

      // New Cookie Creation
      cookie["session"].set({
        secure: Bun.env.NODE_ENV === "production",
        maxAge: session.expires_at,
        value: session.id,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      });
      // Set Response Status => 201 -> A new Session Was Created
      set.status = 201;
      return rest;
    } catch (e) {
      throw e;
    }
  },
  { body: loginUserDTO }
);
