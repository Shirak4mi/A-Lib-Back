import { IdBasedTokenDTO } from "@/common/DTO";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Find/:id",
  async ({ params: { id } }) => {
    try {
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
