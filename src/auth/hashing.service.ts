import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private salt = 10;
  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, this.salt);
  }

  async compare(text: string, hashToCompare: string): Promise<boolean> {
    return bcrypt.compare(text, hashToCompare);
  }
}
