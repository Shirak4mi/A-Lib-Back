import { prisma } from "@/db";
import { userMagikLinkDTO } from "../dtos";

import { Elysia } from "elysia";

export default new Elysia().post(
  "ForgotPassword",
  async ({ body: { email } }) => {
    try {
     // const existingMagikLinks = await prisma.temporal_short_links.




    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { body: userMagikLinkDTO }
);
