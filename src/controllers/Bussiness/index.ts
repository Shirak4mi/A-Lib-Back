import GetQueue from "./methods/GetQueue.ts";
import Create from "./methods/Create.ts";
import Delete from "./methods/Delete.ts";
import Update from "./methods/Update.ts";
import Find from "./methods/Find.ts";
import Get from "./methods/Get.ts";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Business", normalize: true, detail: { tags: ["Business"] } })
  .use(Create)
  .use(Update)
  .use(Delete)
  .use(Find)
  .use(Get)
  .use(GetQueue);
