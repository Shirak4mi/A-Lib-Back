import { IdBasedTokenDTO } from "@/common/DTO";
import { Elysia } from "elysia";

export default new Elysia().get(
  "GetBussinessQueue",
  async () => {
    try {
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
