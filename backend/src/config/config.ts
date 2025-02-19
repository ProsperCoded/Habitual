import { registerAs } from '@nestjs/config';
import { CookieOptions } from 'express';

export default registerAs('config', () => ({
  frontEndUrl: process.env.FRONTEND_URL,
  isProduction: process.env.NODE_ENV == 'production',
}));

let cookie_duration = 7; // days
export const globalCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 60 * 60 * 24 * cookie_duration,
};
