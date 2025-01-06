import { commonTokenDTO, UpdateBussinessDTO } from "../dtos";
import { Elysia } from "elysia";

export default new Elysia().patch(
  "Update/:token",
  async ({ params: { token }, body }) => {
    try {
    } catch (e) {
      throw e;
    }
  },
  {
    params: commonTokenDTO,
    body: UpdateBussinessDTO,
  }
);
