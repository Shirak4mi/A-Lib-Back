import { swagger } from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";
import { routes } from "@/controllers";
import { Elysia } from "elysia";

const helmetExec = helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "same-site" } });

new Elysia({ name: "Renter API", strictPath: true, precompile: true })
  .use(swagger({ theme: "Dark", version: "0.1", exclude: ["/swagger", "/swagger/json"] }))
  .get("ping", () => "pong", { tags: ["Test"] })
  .use(helmetExec)
  .use(routes)
  .listen(Bun.env.PORT ?? 8080, ({ url }) => console.log(`🦊 Elisya is Running on ${url}`));
