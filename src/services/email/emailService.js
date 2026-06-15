import {
  userAccountActivatedNotification,
  userActivationUrlEmailTemplate,
} from "./emailTemplates.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  const transport = emailTransporter();

  const info = await transport.sendMail(userActivationUrlEmailTemplate(obj));
  console.log(info.messageId);
  return info.messageId;
};

export const userActivatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();

  const info = await transport.sendMail(userAccountActivatedNotification(obj));
  console.log(info.messageId);
  return info.messageId;
};
