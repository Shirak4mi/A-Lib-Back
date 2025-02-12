import RecoverPassword from "./methods/RecoverPassword";
import ForgotPassword from "./methods/ForgotPassword";
import ValidateEmail from "./methods/VerifyEmail";
import ValidateLinks from "./methods/VerifyLinks";
import MagickLink from "./methods/MagikLinkLogin";
import Register from "./methods/Register";
import LogOut from "./methods/Logout";
import Login from "./methods/Login";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Auth", normalize: true, detail: { tags: ["Authentication"] } }).use([
  Login,
  Register,
  ValidateEmail,
  ValidateLinks,
  ForgotPassword,
  RecoverPassword,
  MagickLink,
  LogOut,
]);
