import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInPayload } from './dto/sign-in.payload.dto';
import { SignUpPayload } from './dto/sign-up.payload.dto';
import { InvalidCredentials } from './error/credential.error';
import { UserAlreadyExists } from './error/user.error';
import { UserRegistrationSuccess } from './success-messages/user-registration.success';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpPayload> {
    const { email, password } = signUpDto;
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) throw UserAlreadyExists;

    const hashedPassword = await bcrypt.hash(password, 5);
    this.usersService.create({ email, password: hashedPassword });
    return { success: true, message: UserRegistrationSuccess };
  }

  async signIn(signInDto: SignInDto): Promise<SignInPayload> {
    const { email, password } = signInDto;
    const user = await this.usersService.findOne(email);
    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!user || !arePasswordsEqual) {
      throw InvalidCredentials;
    }

    const access_token = await this.jwtService.sign({ email });

    return { status: true, token: access_token };
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
