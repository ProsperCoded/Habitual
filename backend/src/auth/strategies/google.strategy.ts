import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';
import googleOauthConfig from 'src/config/google-oauth.config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleOauthConfigurations: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    // Initialize the strategy with the configurations
    super({
      clientID: googleOauthConfigurations.clientId,
      clientSecret: googleOauthConfigurations.clientSecret,
      callbackURL: googleOauthConfigurations.redirectUrl,
      passReqToCallback: true,
      scope: ['email', 'profile'],
      accessType: 'offline',
      // prompt: 'consent',
    });
  }
  // validate method called after the user is authenticated
  async validate(
    req: Request,
    access_token: string,
    refresh_token: string,
    profile: any,
    done: VerifyCallback,
  ) {
    // console.log({ access_token, refresh_token, profile });
    const { name, emails, photos } = profile;
    const user: CreateUserDto = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      profilePicture: photos[0].value,
      accessToken: access_token,
      refreshToken: refresh_token,
    };
    console.log('authenticated user, on signup', user);

    return this.authService.validateGoogleOAuthUser(user);
  }
}
