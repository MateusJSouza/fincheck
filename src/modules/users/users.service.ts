import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUserById(userId: string) {
    return { userId };
  }
}
