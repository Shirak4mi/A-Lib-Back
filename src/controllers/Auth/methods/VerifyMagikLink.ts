import { BadRequestException } from "@/utils/error";
import { CommonTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post("VerifyMagikLink/:token", async ({ params: { token } }) => {});
