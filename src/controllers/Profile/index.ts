import GetBookins from "./methods/GetBookins.ts";
import Update from "./methods/Update.ts";
import GetMe from "./methods/GetMe.ts";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Profile", normalize: true, detail: { tags: ["Profile"] } }).use([
  GetMe,
  Update,
  GetBookins,
]);
