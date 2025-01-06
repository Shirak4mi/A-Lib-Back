import { t, type Static } from "elysia";

export const createUserDTO = t.Object({
  address: t.String({ minLength: 1 }),
  birth_date: t.String({ minLength: 1 }),
  first_name: t.String({ minLength: 1 }),
  last_name: t.String({ minLength: 1 }),
  phone_number: t.String({ minLength: 1 }),
  document_type_id: t.Number({ minLength: 1 }),
  account_type_id: t.Number({ minLength: 1 }),
  document_id: t.String({ minLength: 1 }),
  password: t.String({ minLength: 1 }),
  email: t.String({ minLength: 1, format: "email" }),
});

export type TCreateUserDTO = Static<typeof createUserDTO>;

export const loginUserDTO = t.Object({
  email: t.String({ minLength: 1, format: "email" }),
  password: t.String({ minLength: 8 }),
});

export type TLoginUserDTO = Static<typeof loginUserDTO>;

export const recoverUserDTO = t.Object({ email: t.String({ minLength: 1, format: "email" }) });

export type TRecoverUserDTO = Static<typeof recoverUserDTO>;

export const restorePasswordDTO = t.Object({ password: t.String({ minLength: 8 }) });

export type TRestorePasswordDTO = Static<typeof restorePasswordDTO>;
