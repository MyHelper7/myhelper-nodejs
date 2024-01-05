import * as uuid from 'uuid';
import crypto from 'crypto';
import { BLACKLIST_BODY_KEYS, BLACKLIST_PARAMS_KEYS, BLACKLIST_QUERY_KEYS } from '../constants';

class AppHelper {
  public camelToSnake(input: string): string {
    return input.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  }
  public snakeToCamelCase(input: string): string {
    return input.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
  }
  
  public async sleep(seconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  public isObjectEmpty(input: object): boolean {
    return Array.isArray(input) ? !!input.length : Object.keys(input).length === 0;
  }

  public uuidV1(): string {
    return uuid.v1();
  }

  public uuidV4(): string {
    return uuid.v4();
  }

  public convertKeysToSnakeCase(input: object | string): object | string {
    if (typeof input === 'object' && input !== null) {
      if (Array.isArray(input)) {
        return input.map(this.camelToSnake);
      } else {
        const result = {};
        for (const [key, value] of Object.entries(input)) {
          result[this.camelToSnake(key)] = (typeof value === 'object' ? this.convertKeysToSnakeCase(value) : value);
        }
        return result;
      }
    } else if (typeof input === 'string') {
      return this.camelToSnake(input);
    } else {
      return input;
    }
  }

  public convertKeysToCamelCase(input: any): any {
    if (typeof input === 'object' && input !== null) {
      if (Array.isArray(input)) {
        return input.map(this.snakeToCamelCase);
      } else {
        const result = {};
        for (const [key, value] of Object.entries(input)) {
          result[this.snakeToCamelCase(key)] = (typeof value === 'object' ? this.convertKeysToCamelCase(value) : value);
        }
        return result;
      }
    } else if (typeof input === 'string') {
      return this.snakeToCamelCase(input);
    } else {
      return input;
    }
  }

  public convertToBase64(input: string): string {
    return Buffer.from(input).toString('base64');
  };
  
  public genreateHash(limit?: number, algo: string = 'sha1'): string {
    const hash = crypto.createHash(algo).digest('hex');
    return limit ? hash.substring(0, limit) : hash;
  };
  
  public hexToBytes(hex: string): number[] {
    if (!hex) return [];
  
    const bytes: number[] = [];
    for (let c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
  };
  
  public bytesToHex(bytes: number[]): string {
    return Array.from(bytes, function (byte) {
      return `0${(byte & 0xff).toString(16)}`.slice(-2); // eslint-disable-line no-bitwise
    }).join('');
  };

  public removeListedKeys(input: object, type: string) {
    let blackListKeys: string[] = [];
    switch(type) {
    case 'body':
      blackListKeys = BLACKLIST_BODY_KEYS;
      break;
    case 'query':
      blackListKeys = BLACKLIST_QUERY_KEYS;
      break;
    case 'params':
      blackListKeys = BLACKLIST_PARAMS_KEYS;
      break;
    default: break;
    }

    for (const key in input) {
      if (blackListKeys.indexOf(key) > -1) {
        delete input[key];
      }
    }

    return input;
  }
}

export const appHelper = new AppHelper();
