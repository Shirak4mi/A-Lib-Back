import Create from "./methods/Create.ts";
import Delete from "./methods/Delete.ts";
import Update from "./methods/Update.ts";
import Find from "./methods/Find.ts";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Bussiness", normalize: true }).use(Create).use(Update).use(Delete).use(Find);
