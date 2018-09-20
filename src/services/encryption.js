import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export function encrypt(obj, passphrase) {
  return AES.encrypt(JSON.stringify(obj), passphrase).toString();
}

export function decrypt(ciphertext, passphrase) {
  try{
    const result = AES.decrypt(ciphertext, passphrase).toString(Utf8);
    return JSON.parse(result)
  } catch (e) {
    throw Error(e);
  }
}
