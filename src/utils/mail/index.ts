import { type SentMessageInfo, createTransport } from "nodemailer";
import HTML from "../mail/templates/welcome.html";

const { EMAIL_PASSWORD, EMAIL_USERNAME, FRONTEND_BASE_URI } = Bun.env;

const transporter = createTransport({ auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD }, service: "gmail" });

export async function sendTestEmail(token: string, to: string): Promise<SentMessageInfo> {
  try {
    const mailSentInfo = await transporter.sendMail({
      from: `"Support Account 👻" <${EMAIL_USERNAME}>`,
      html: `<b>Hello world \n\r\n ${token}</b>`,
      subject: "This is a Test Email ✔",
      to: to,
    });
    return mailSentInfo;
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function sendWelcomeMail(token: string, to: string): Promise<SentMessageInfo> {
  try {
    const htmlTemplate = await Bun.file(HTML).text();
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

export async function sendRecoverEmail() {}
