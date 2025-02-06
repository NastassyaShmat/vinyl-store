import { promisify } from 'util';
import { createCipheriv, createDecipheriv, randomBytes, scrypt, timingSafeEqual } from 'crypto';

const scryptAsync = promisify(scrypt);

export class Crypto {
  static async getEncryptedString(str: string, size: number = 16, keylen: number = 64): Promise<string> {
    const salt = Crypto.getRandomBytes(size);

    const key = (await scryptAsync(str, salt, keylen)) as Buffer;

    return `${salt.toString('hex')}:${key.toString('hex')}`;
  }

  static getRandomTextHex(size: number = 8) {
    return Crypto.getRandomBytes(size).toString('hex');
  }

  static async verifyEncryptedWithOriginal(enc: string, orig: string, keylen: number = 64): Promise<boolean> {
    try {
      const [salt, key] = enc.split(':');
      const keyBuffer = Buffer.from(key, 'hex');
      const derivedKey = (await scryptAsync(orig, Buffer.from(salt, 'hex'), keylen)) as Buffer;
      return timingSafeEqual(keyBuffer, derivedKey);
    } catch {
      return false;
    }
  }

  static async encryptedBy256ctr(str: string): Promise<string> {
    const iv = Crypto.getRandomBytes(16);

    const key = (await scryptAsync('password', iv, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}:${key.toString('hex')}`;
  }

  static decryptedBy256ctr(str: string): string {
    const [iv, encrypted, key] = str.split(':');

    const decipher = createDecipheriv('aes-256-ctr', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

    return decrypted.toString();
  }

  private static getRandomBytes(size: number = 8) {
    return randomBytes(size);
  }
}
