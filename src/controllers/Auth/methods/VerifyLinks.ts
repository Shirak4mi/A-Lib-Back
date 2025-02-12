import { createUserSessions, invalidateUserSessions } from "@/utils/session";
import { BadRequestException, ImATeapotException } from "@/utils/error";
import { session_cookie_name } from "@/utils/constants";
import { CommonTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "VerifyLink/:token",
  async ({ params: { token: short_code }, cookie, redirect }) => {
    try {
      const isValidNano = await prisma.temporal_short_links.findFirst({
        where: { short_code },
        select: {
          User: { select: { email: true, id: true } },
          Type: { select: { id: true } },
          original_url: true,
          expires_at: true,
        },
      });
      if (!isValidNano) throw new BadRequestException("The Provided Token is not a valid One");
      // Sugar Destructuration for better accesibility => Type existance already validated
      const { expires_at, original_url, Type, User } = isValidNano;

      // Check Expiration

      switch (Type.id) {
        case 1:
          // Sessions Cleaning
          const cleanSessions = await invalidateUserSessions(Type.id);
          if (!cleanSessions) return;

          // New Session Creating
          const session = await createUserSessions(Type.id);
          if (!session) return;

          // New Cookie Creation
          cookie[session_cookie_name].set({
            secure: Bun.env.NODE_ENV !== "production",
            maxAge: session.expires_at,
            value: session.id,
            sameSite: "lax",
            httpOnly: true,
            path: "/",
          });

          // Set Response Status => 308 -> A new Session Was Created and the response is to move the user
          return redirect("http://localhost:3000/en/Home", 308);
        case 2:
          break;
        case 3:
          break;
        default:
          throw new ImATeapotException("Looks like this impossible case happened, I'm indeed a teapot");
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { params: CommonTokenDTO }
);
