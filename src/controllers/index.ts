import Auth from "./Auth/index.ts";
import User from "./User/index.ts";

import { Elysia } from "elysia";

export const routes = new Elysia({ prefix: "api" }).use(Auth).use(User);
