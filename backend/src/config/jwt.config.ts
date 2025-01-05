import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

// Identifier that will be used to inject the JwtService
export const JWT_IDENTIFIER = Symbol('JWT');

// Configurations for JWT
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7d' },
  }),
);
