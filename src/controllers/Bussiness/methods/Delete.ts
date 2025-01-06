import { IdBasedTokenDTO } from "@/common/DTO";
import { Elysia } from "elysia";

export default new Elysia().delete(
  "Delete/:id",
  ({ params: { id } }) => {
    try {
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
