import ForgotPassword from "./methods/ForgotPassword";
import ValidateEmail from "./methods/ValidateEmail";
import Register from "./methods/Register";
import LogOut from "./methods/Logout";
import Login from "./methods/Login";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Auth", normalize: true })
  .use(Login)
  .use(Register)
  .use(ForgotPassword)
  .use(ValidateEmail)
  .use(LogOut);
