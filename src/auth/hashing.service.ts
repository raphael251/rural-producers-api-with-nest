import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private salt = '10';
  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, Number(this.salt));
  }

  async compare(text: string, hashToCompare: string): Promise<boolean> {
    const hashedText = await bcrypt.hash(text, this.salt);
    return hashedText === hashToCompare;
  }
}
