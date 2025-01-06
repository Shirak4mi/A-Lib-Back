import Create from "./methods/Create";
import Update from "./methods/Update";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Bussiness", normalize: true }).use(Create).use(Update);
