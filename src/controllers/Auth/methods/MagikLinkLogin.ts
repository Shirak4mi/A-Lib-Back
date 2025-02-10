import { getWorkingTokenTime, SecureNanoID } from "@/utils/functions";
import { BadRequestException } from "@/utils/error";
import { userMagikLinkDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "MagickLink",
  async ({ body: { email } }) => {
    try {
      const existingMagikLinks = await prisma.temporal_short_links.findFirst({ where: { User: { email } } });
      if (existingMagikLinks) throw new BadRequestException("Already exists a Magic Link");

      // Random NanoID Link
      const short_code = SecureNanoID.generate(16);
      const expires_at = getWorkingTokenTime(1);

      // Create DB Link
      const newLink = await prisma.temporal_short_links.create({
        data: {
          short_code,
          expires_at,
          original_url: "/magick_login",
          Type: { connect: { id: 1 } },
          User: { connect: { email } },
        },
      });

      if (!newLink) throw new BadRequestException("Could not create Magick Link");

      return newLink;
    } catch (e) {
      console.log("error XD");
      throw new BadRequestException("Could not create Magick Link");
    }
  },
  { body: userMagikLinkDTO }
);
