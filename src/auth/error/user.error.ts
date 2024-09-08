import { BadRequestException } from '@nestjs/common';

const UserAlreadyExists = new BadRequestException('User already exists');
const UserNotFound = new BadRequestException('User not found');

export { UserAlreadyExists, UserNotFound };