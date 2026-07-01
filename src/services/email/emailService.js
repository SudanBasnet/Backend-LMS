import {
  passwordResetOTPSendTemplate,
  userAccountActivatedNotification,
  userActivationUrlEmailTemplate,
  userPasswordUpdatedNotificationTemplate,
} from "./emailTemplates.js";
import { emailTransporter } from "./transport.js";
import nodemailer from "nodemailer";

const logEmailInfo = (info) => {
  console.log(info.messageId);

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log("Preview URL:", previewUrl);
  }
};

export const userActivationUrlEmail = async (obj) => {
  const transport = emailTransporter();

  const info = await transport.sendMail(userActivationUrlEmailTemplate(obj));
  logEmailInfo(info);
  return info.messageId;
};

export const userActivatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();

  const info = await transport.sendMail(userAccountActivatedNotification(obj));
  logEmailInfo(info);
  return info.messageId;
};

export const passwordResetOTPSendEmail = async (obj) => {
  const transport = emailTransporter();

  const info = await transport.sendMail(passwordResetOTPSendTemplate(obj));
  logEmailInfo(info);
  return info.messageId;
};

export const userPasswordUpdatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();

  const info = await transport.sendMail(
    userPasswordUpdatedNotificationTemplate(obj),
  );
  logEmailInfo(info);
  return info.messageId;
};
