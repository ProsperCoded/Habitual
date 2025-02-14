import { registerAs } from '@nestjs/config';
import { CookieOptions } from 'express';

export default registerAs('config', () => ({
  frontEndUrl: process.env.FRONTEND_URL,
  isProduction: process.env.NODE_ENV == 'production',
}));

export const globalCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 3600,
  domain: process.env.FRONTEND_URL || undefined,
};
