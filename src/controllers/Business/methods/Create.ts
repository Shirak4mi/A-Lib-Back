import { InternalServerErrorException, UnauthorizedException } from "@/utils/error";
import { CreateBussinessDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "Create",
  async ({ body }) => {
    try {
      const isUserOwnerType = await prisma.user.findFirst({
        where: { id: parseInt(body.owner_id) },
        select: { User_Type: { select: { id: true } } },
      });

      if (!isUserOwnerType) throw new UnauthorizedException("The provided user does not exists!");

      if (isUserOwnerType.User_Type.id !== 2) throw new UnauthorizedException("The provided user is not an Owner!");

      console.log(body);

      // const createBussiness = await prisma.business.create({
      //   data: {
      //     name: body.name,
      //     email: body.email,
      //     address: body.address,
      //     description: body.description,
      //     phone_number: body.phone_number,
      //     Owner: { connect: { id: body.owner_id } },
      //     open_to: new Date("2019-01-16 " + body.open_to),
      //     open_from: new Date("2019-01-16 " + body.open_from),
      //     Bussiness_Type: { connect: { id: body.bussiness_type } },
      //     Services: { connect: [] },
      //   },
      //   select: {
      //     name: true,
      //     email: true,
      //     address: true,
      //     description: true,
      //     phone_number: true,
      //     open_to: true,
      //     open_from: true,
      //     Owner: { select: { email: true } },
      //     Bussiness_Type: { select: { name: true } },
      //   },
      // });

      // if (!createBussiness) throw new InternalServerErrorException("Error creating Bussiness");

      return {};
    } catch (e) {
      throw e;
    }
  },
  { body: CreateBussinessDTO }
);
