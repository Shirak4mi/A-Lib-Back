import { saveUserProfilePicture } from "@/utils/file_management";
import { session_cookie_name } from "@/utils/constants";
import { generateRandomSalt } from "@/utils/functions";
import { UnauthorizedException } from "@/utils/error";
import { sessionCookie } from "@/common/DTO";
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

      const isFileSaved = await saveUserProfilePicture(body.profile_picture, `public/${User.username}`);
      const password_salt = generateRandomSalt();
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie, body: UpdateProfileDTO }
);
