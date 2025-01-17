import { forgotEmailMessages as viMessages } from './vi';
import { forgotEmailMessages as enMessages } from './en';

export const messages = {
  vi: viMessages,
  en: enMessages
};

export type ForgotEmailMessages = typeof viMessages;
export type Language = 'vi' | 'en';
