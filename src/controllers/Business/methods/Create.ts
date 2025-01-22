import { InternalServerErrorException, UnauthorizedException } from "@/utils/error";
import { saveBusinessMainPictures } from "@/utils/file_management";
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

      // Sugary Destruction
      const {
        bussiness_employees,
        business_services,
        business_pictures,
        bussiness_type,
        open_from,
        owner_id,
        open_to,
        ...data
      } = body;

      const pictures = await saveBusinessMainPictures(data.name, business_pictures);

      console.log({ pictures });

      // const createBussiness = await prisma.business.create({
      //   data: {
      //     open_to: new Date("2019-01-16 " + open_to),
      //     open_from: new Date("2019-01-16 " + open_from),
      //     Owner: { connect: { id: parseInt(owner_id) } },
      //     pictures: pictures ? JSON.stringify(pictures) : undefined,
      //     Bussiness_Type: { connect: { id: parseInt(bussiness_type) } },
      //     Services: { connect: (bussiness_employees ?? "").split(",").map((x) => ({ id: parseInt(x) })) },
      //     Employees: { connect: (business_services ?? "").split(",").map((x) => ({ id: parseInt(x) })) },
      //     ...data,
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

      return { createBussiness: "" };
    } catch (e) {
      throw e;
    }
  },
  { body: CreateBussinessDTO }
);
