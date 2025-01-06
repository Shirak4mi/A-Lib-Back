import { CreateBussinessDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "Create",
  async ({ body }) => {
    try {
      const createBussiness = await prisma.business.create({
        data: {
          name: body.name,
          email: body.email,
          address: body.address,
          phone_number: body.phone_number,
          open_from: body.open_from,
          open_to: body.open_to,
          Owner: { connect: { id: body.owner_id } },
          Bussiness_Type: { connect: { id: body.bussiness_type } },
        },
      });

      console.log({ createBussiness });
    } catch (e) {
      throw e;
    }
  },
  { body: CreateBussinessDTO }
);

/**
 * 
 * 

{
  "name": "Papotico barbersho",
  "description": "Tu real barberia",
  "address": "#mi casa",
  "phone_number": "8099919999",
  "email": "papotico_barbersho@gmail.com",
  "owner_id": 1
}
  
 * 
 * 
 */
