import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  frontEndUrl: process.env.FRONTEND_URL,
  isProduction: process.env.NODE_ENV == 'production',
}));
