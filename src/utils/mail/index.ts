import { type SentMessageInfo, createTransport } from "nodemailer";
import WelcomeHTML from "../mail/templates/welcome.html";
import RestoreHTML from "../mail/templates/restore.html";

const { EMAIL_PASSWORD, EMAIL_USERNAME, FRONTEND_BASE_URI } = Bun.env;

const transporter = createTransport({ auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD }, service: "gmail" });

export async function sendWelcomeMail(token: string, to: string): Promise<SentMessageInfo> {
  try {
    const htmlTemplate = await Bun.file(WelcomeHTML).text();
    const mailSentInfo = await transporter.sendMail({
      html: htmlTemplate.replace("TOKEN", FRONTEND_BASE_URI + "Verify/" + token),
      from: `"Support Account 👻" <${EMAIL_USERNAME}>`,
      subject: "Welcome to Rentex",
      to: to,
    });
    return mailSentInfo;
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function sendRecoverEmail(token: string, to: string): Promise<SentMessageInfo> {
  try {
    const htmlTemplate = await Bun.file(RestoreHTML).text();
    const mailSentInfo = await transporter.sendMail({
      html: htmlTemplate.replace("TOKEN", FRONTEND_BASE_URI + "Reset/" + token),
      from: `"Support Account 👻" <${EMAIL_USERNAME}>`,
      subject: "Welcome to Rentex",
      to: to,
    });
    return mailSentInfo;
  } catch (e) {
    console.log(e);
    return;
  }
}
