import { IdBasedTokenDTO } from "@/common/DTO";
import { UpdateBussinessDTO } from "../dtos";

import { Elysia } from "elysia";

export default new Elysia().patch(
  "Update/:id",
  async ({ params: { id }, body }) => {
    try {
    } catch (e) {
      throw e;
    }
  },
  {
    params: IdBasedTokenDTO,
    body: UpdateBussinessDTO,
  }
);
