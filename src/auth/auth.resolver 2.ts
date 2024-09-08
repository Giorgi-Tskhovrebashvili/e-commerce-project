import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInPayload } from './dto/sign-in.payload.dto';
import { SignUpPayload } from './dto/sign-up.payload.dto';
import { SignUpInput } from './dto/sign-up.args.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpPayload)
  async signUp(
    @Args('signup') signUpInput: SignUpInput,
  ): Promise<SignUpPayload> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SignInPayload)
  async signIn(
    @Args('signin') signinInput: SignUpInput,
  ): Promise<SignInPayload> {
    return this.authService.signIn(signinInput);
  }
}
