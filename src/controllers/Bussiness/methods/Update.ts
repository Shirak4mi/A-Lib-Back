import { Elysia } from "elysia";
import { commonTokenDTO, UpdateBussinessDTO } from "../dtos";

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
