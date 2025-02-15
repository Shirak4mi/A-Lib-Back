import { useErrorMiddleware, useSuccessResponseMiddleware } from "@/middlewares/response.ts";
import Bussiness from "./Business/index.ts";
import Bookins from "./Bookins/index.ts";
import Profile from "./Profile/index.ts";
import Queue from "./Queue/index.ts";
import Auth from "./Auth/index.ts";

import { Elysia } from "elysia";

export const routes = new Elysia({ prefix: "api" })
  .use(useSuccessResponseMiddleware)
  .use(useErrorMiddleware)
  .use([Auth, Profile, Bussiness, Queue, Bookins]);
