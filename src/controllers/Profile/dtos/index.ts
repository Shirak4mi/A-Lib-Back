import { t, type Static } from "elysia";

export const GetBookinsQueryDTO = t.Object({
  page: t.Number({ default: 1 }),
});

export type TGetBookinsQueryDTO = Static<typeof GetBookinsQueryDTO>;
