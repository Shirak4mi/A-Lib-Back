import { Elysia } from "elysia";

export default new Elysia({ prefix: "Profile", normalize: true, detail: { tags: ["Profile"] } });
