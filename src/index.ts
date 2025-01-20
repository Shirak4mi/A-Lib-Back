import { app_port } from "./utils/constants";
import { swagger } from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";
import { routes } from "@/controllers";
import { Elysia } from "elysia";

const helmetExec = helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "same-site" } });

new Elysia({ name: "E-Tickets API", strictPath: true, precompile: true })
  .use(swagger({ theme: "Dark", version: "0.1", exclude: ["/swagger", "/swagger/json"] }))
  .get("ping", () => "pong", { tags: ["Test"] })
  .use(helmetExec)
  .use(routes)
  .listen(app_port, ({ url }) => console.log(`🦊 Elisya is Running on ${url}`));
