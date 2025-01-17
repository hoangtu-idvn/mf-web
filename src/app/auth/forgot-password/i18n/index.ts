import { forgotPasswordMessages as viMessages } from './vi';
import { forgotPasswordMessages as enMessages } from './en';

export const messages = {
  vi: viMessages,
  en: enMessages
};

export type ForgotPasswordMessages = typeof viMessages;
export type Language = 'vi' | 'en';
