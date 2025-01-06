import { IdBasedTokenDTO } from "@/common/DTO";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Get",
  async ({ params: { id } }) => {
    try {
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
