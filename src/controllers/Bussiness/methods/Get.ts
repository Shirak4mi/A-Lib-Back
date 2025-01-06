import { prisma } from "@/db/index.ts";
import { FilterBussinessDTO } from "../dtos/index.ts";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Get",
  async ({ query }) => {
    try {
      // Sugary Destructuring
      const { address, bussiness_type, description, email, name, open_from, open_to, owner_id, phone_number } = query;

      const filteredBussiness = await prisma.business.findMany({
        where: {
          name: { equals: name },
          email: { equals: email },
          address: { equals: address },
          description: { equals: description },
          phone_number: { equals: phone_number },
        },
      });

      console.log({ filteredBussiness });
    } catch (e) {
      throw e;
    }
  },
  { query: FilterBussinessDTO }
);
