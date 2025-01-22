import { t, type Static } from "elysia";

export const GetBookinsQueryDTO = t.Object({
  page: t.Number({ default: 1 }),
});

export type TGetBookinsQueryDTO = Static<typeof GetBookinsQueryDTO>;

export const UpdateProfileDTO = t.Object({
  first_name: t.Optional(t.String({ minLength: 1 })),
  last_name: t.Optional(t.String({ minLength: 1 })),
  email: t.Optional(t.String({ minLength: 1, format: "email" })),
  username: t.Optional(t.String({ minLength: 1 })),
  password: t.Optional(t.String({ minLength: 8 })),
  birth_date: t.Optional(t.String()),
  phone_number: t.Optional(t.String()),
  document_id: t.Optional(t.String()),
  document_type_id: t.Optional(t.Union([t.String(), t.Number()])),
  profile_picture: t.Optional(t.File({ maxItems: 1, type: "image" })),
});

export type TUpdateProfileDTO = Static<typeof UpdateProfileDTO>;
