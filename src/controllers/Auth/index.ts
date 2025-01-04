import { createUserSessions, invalidateUserSessions } from "@/utils/session";
import { loginUserDTO } from "@/model/dto";
import { login } from "@/model/methods";
import { Elysia } from "elysia";

export default new Elysia({ prefix: "Auth", normalize: true }).post(
  "Login",
  async ({ body, cookie, set }) => {
    const { id: user_id, ...rest } = await login(body);
    // Sessions Cleaning
    const cleanSessions = await invalidateUserSessions(user_id);
    if (!cleanSessions) return;
    // New Session Creating
    const session = await createUserSessions(user_id);
    if (!session) return;
    // New Cookie Creation
    set.status = 201;
    cookie["session"].set({
      value: session.id,
      secure: Bun.env.NODE_ENV === "production",
      maxAge: session.expires_at,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    });
    return rest;
  },
  { body: loginUserDTO }
);
