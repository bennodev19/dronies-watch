import { AES, enc } from 'crypto-js';
import config from '../../../config';

export function encrypt(token: string, secret: string): string {
  return AES.encrypt(token, secret).toString();
}

export function decrypt(encrypted: string, secret: string): string {
  return AES.decrypt(encrypted, secret).toString(enc.Utf8);
}

export function getEncryptedJsonPayload(value: any) {
  const encryptedData = encrypt(
    JSON.stringify(value),
    config.api.jsonPayloadSecret,
  );

  return {
    encrypted: true,
    data: encryptedData,
  };
}
