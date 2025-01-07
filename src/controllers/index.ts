import Bussiness from "./Business/index.ts";
import Bookins from "./Bookins/index.ts";
import Profile from "./Profile/index.ts";
import Queue from "./Queue/index.ts";
import Auth from "./Auth/index.ts";

import { Elysia } from "elysia";

export const routes = new Elysia({ prefix: "api" }).use(Auth).use(Profile).use(Bussiness).use(Queue).use(Bookins);
