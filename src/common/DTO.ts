import { t, type Static } from "elysia";

export const CommonTokenDTO = t.Object({ token: t.String({ minLength: 1 }) });

export type TCommonTokenDTO = Static<typeof CommonTokenDTO>;

export const IdBasedTokenDTO = t.Object({ id: t.Number({ minLength: 1 }) });

export type TIdBasedTokenDTO = Static<typeof IdBasedTokenDTO>;

export const sessionCookie = t.Cookie({ session: t.String({ minLength: 1 }) });

export type TSessionCookie = Static<typeof sessionCookie>;
