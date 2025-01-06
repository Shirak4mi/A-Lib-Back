import { AddMetaData, getCurrentCursorOffSet } from "@/utils/functions.ts";
import { NotFoundException } from "@/utils/error/index.ts";
import { FilterBussinessDTO } from "../dtos/index.ts";
import { prisma } from "@/db/index.ts";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Get",
  async ({ query }) => {
    try {
      // Sugary Destructuring
      const { address, bussiness_type, description, email, name, open_from, open_to, owner_id, phone_number, page } = query;

      const [data, count] = await prisma.$transaction([
        prisma.business.findMany({
          select: {
            name: true,
            email: true,
            address: true,
            description: true,
            phone_number: true,
            open_to: true,
            open_from: true,
            Owner: { select: { email: true } },
            Bussiness_Type: { select: { name: true } },
          },
          where: {
            name: { equals: name },
            email: { equals: email },
            address: { equals: address },
            Owner: { id: { equals: owner_id } },
            description: { equals: description },
            phone_number: { equals: phone_number },
            Bussiness_Type: { id: { equals: bussiness_type } },
          },
          take: 50,
          orderBy: { id: "asc" },
          skip: getCurrentCursorOffSet(page),
        }),
        prisma.business.count({
          where: {
            name: { equals: name },
            email: { equals: email },
            address: { equals: address },
            Owner: { id: { equals: owner_id } },
            description: { equals: description },
            phone_number: { equals: phone_number },
            Bussiness_Type: { id: { equals: bussiness_type } },
          },
        }),
      ]);

      if (!data) throw new NotFoundException("Theres no bussiness under this params");

      return AddMetaData(data, page, count);
    } catch (e) {
      throw e;
    }
  },
  { query: FilterBussinessDTO }
);
