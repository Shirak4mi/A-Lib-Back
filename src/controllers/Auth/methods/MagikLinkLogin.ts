import { prisma } from "@/db";
import { userMagikLinkDTO } from "../dtos";

import { Elysia } from "elysia";

export default new Elysia().post(
  "ForgotPassword",
  async ({ body: { email } }) => {
    try {
     const existingMagikLinks = await prisma.short_Temporal_Links




    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { body: userMagikLinkDTO }
);
