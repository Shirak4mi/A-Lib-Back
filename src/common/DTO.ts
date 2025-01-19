import { session_cookie_name } from "@/utils/constants";
import { type Static, t } from "elysia";

export const CommonTokenDTO = t.Object({ token: t.String({ minLength: 1 }) });

export type TCommonTokenDTO = Static<typeof CommonTokenDTO>;

export const IdBasedTokenDTO = t.Object({ id: t.Number({ minLength: 1 }) });

export type TIdBasedTokenDTO = Static<typeof IdBasedTokenDTO>;

export const sessionCookie = t.Cookie({ [session_cookie_name]: t.String({ minLength: 1 }) });

export type TSessionCookie = Static<typeof sessionCookie>;

export const CommonPaginationDTO = t.Object({ page: t.Number({ minimum: 1 }) });

export type TCommonPaginationDTO = Static<typeof CommonPaginationDTO>;
