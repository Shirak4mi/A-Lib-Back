import { BadRequestException } from "@/utils/error";
import { validateEmailDTO } from "../dtos";
import { Elysia } from "elysia";

export default new Elysia().post(
  "ValidateEmail/:token",
  ({ params: { token } }) => {
    if (!token || !token.length) throw new BadRequestException("Invalid Token");

     


  },
  { params: validateEmailDTO }
);
