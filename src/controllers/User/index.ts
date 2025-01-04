import { Elysia } from "elysia";

export default new Elysia({ prefix: "User", normalize: true }).post("Create", () => {});
