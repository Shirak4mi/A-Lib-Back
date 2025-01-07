import CreateBookin from "./methods/CreateBookin.ts";
import UpdateBookin from "./methods/UpdateBookin.ts";
import DeleteBookin from "./methods/DeleteBookin.ts";
import GetDetails from "./methods/GetDetails.ts";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Bookins", normalize: true, detail: { tags: ["Bookin"] } })
  .use(CreateBookin)
  .use(UpdateBookin)
  .use(DeleteBookin)
  .use(GetDetails);
