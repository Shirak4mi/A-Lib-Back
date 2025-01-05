import Profile from "./Profile/index.ts";
import Auth from "./Auth/index.ts";

import { Elysia } from "elysia";

export const routes = new Elysia({ prefix: "api" }).use(Auth).use(Profile);
