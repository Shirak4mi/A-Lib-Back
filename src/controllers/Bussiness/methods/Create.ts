import { CreateBussinessDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "Create",
  async ({ body }) => {
    try {
      // const createBussiness = await prisma.
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
