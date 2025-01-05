import RecoverPassword from "./methods/RecoverPassword";
import ForgotPassword from "./methods/ForgotPassword";
import ValidateEmail from "./methods/ValidateEmail";
import Register from "./methods/Register";
import LogOut from "./methods/Logout";
import Login from "./methods/Login";
import Me from "./methods/Me";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Auth", normalize: true })
  .use(Login)
  .use(Me)
  .use(Register)
  .use(ValidateEmail)
  .use(ForgotPassword)
  .use(RecoverPassword)
  .use(LogOut);
