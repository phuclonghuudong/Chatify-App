import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, err } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Messenger!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (err) {
    console.error("Error sending welcome email:", err);
    throw new Error("Failed to send welcome email");
  }
  console.log("Welcome Email", data);
};
