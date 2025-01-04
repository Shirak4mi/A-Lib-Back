import { Elysia } from "elysia";
import Auth from "./Auth/index";

export const routes = new Elysia({ prefix: "api" }).use(Auth);
