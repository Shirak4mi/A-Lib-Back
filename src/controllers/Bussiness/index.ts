import Create from "./methods/Create";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Bussiness", normalize: true }).use(Create);
