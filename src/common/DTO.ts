import { t, type Static } from "elysia";

export const CommonTokenDTO = t.Object({ token: t.String({ minLength: 1 }) });

export type TCommonTokenDTO = Static<typeof CommonTokenDTO>;

export const IdBasedTokenDTO = t.Object({ id: t.String({ minLength: 1 }) });

export type TIdBasedTokenDTO = Static<typeof IdBasedTokenDTO>;
