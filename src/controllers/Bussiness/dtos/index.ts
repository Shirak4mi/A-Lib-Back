import { t, type Static } from "elysia";

export const CreateBussinessDTO = t.Object({
  name: t.String({ minLength: 1 }),
  description: t.String({ minLength: 1 }),
  address: t.String({ minLength: 1 }),
  phone_number: t.String({ minLength: 1 }),
  email: t.String({ minLength: 1, format: "email" }),
  open_from: t.String({ minLength: 1, format: "time" }),
  open_to: t.String({ minLength: 1, format: "time" }),
  bussiness_type: t.Number({ minimum: 1 }),
  owner_id: t.Number({ minimum: 1 }),
});

export type TCreateBussinessDTO = Static<typeof CreateBussinessDTO>;
