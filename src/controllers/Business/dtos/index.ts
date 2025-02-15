import { t, type Static } from "elysia";

export const CreateBussinessDTO = t.Object({
  name: t.String({ minLength: 1 }),
  description: t.String({ minLength: 1 }),
  address: t.String({ minLength: 1 }),
  phone_number: t.String({ minLength: 1 }),
  email: t.String({ minLength: 1, format: "email" }),
  open_from: t.String({ minLength: 1 }),
  open_to: t.String({ minLength: 1 }),
  bussiness_type: t.String({ minimum: 1 }),
  owner_id: t.String({ minimum: 1 }),
  business_services: t.Optional(t.String()),
  bussiness_employees: t.Optional(t.String()),
  business_pictures: t.Optional(t.Files({ maxItems: 10, type: "image" })),
});

export type TCreateBussinessDTO = Static<typeof CreateBussinessDTO>;

export const UpdateBussinessDTO = t.Object({
  name: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String({ minLength: 1 })),
  address: t.Optional(t.String({ minLength: 1 })),
  phone_number: t.Optional(t.String({ minLength: 1 })),
  email: t.Optional(t.String({ minLength: 1, format: "email" })),
  open_from: t.Optional(t.String({ minLength: 1 })),
  open_to: t.Optional(t.String({ minLength: 1 })),
  bussiness_type: t.Optional(t.Number({ minimum: 1 })),
  owner_id: t.Optional(t.Number({ minimum: 1 })),
});

export type TUpdateBussinessDTO = Static<typeof UpdateBussinessDTO>;

export const FilterBussinessDTO = t.Object({
  page: t.Number({ minimum: 1, default: 1 }),
  name: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String({ minLength: 1 })),
  address: t.Optional(t.String({ minLength: 1 })),
  phone_number: t.Optional(t.String({ minLength: 1 })),
  email: t.Optional(t.String({ minLength: 1, format: "email" })),
  open_from: t.Optional(t.String({ minLength: 1 })),
  open_to: t.Optional(t.String({ minLength: 1 })),
  bussiness_type: t.Optional(t.Number({ minimum: 1 })),
  owner_id: t.Optional(t.Number({ minimum: 1 })),
});

export type TFilterBussinessDTO = Static<typeof FilterBussinessDTO>;
