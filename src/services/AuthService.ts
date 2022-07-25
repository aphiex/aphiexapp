import CryptoES from 'crypto-es';
import { TAuthData } from '../context/Auth'
import { checkSystemIv, checkSystemKey, getSecureStoreItem, setSecureStoreItem } from '../utils';

async function signIn(password: string): Promise<TAuthData> {
  return new Promise(async (resolve, reject) => {
    const systemKey = await getSecureStoreItem('SystemKey');
    const systemIv = await getSecureStoreItem('SystemIv');
    const passwordStored = await getSecureStoreItem('Password');

    if (systemKey && systemIv && passwordStored) {
      const key = CryptoES.enc.Base64.parse(systemKey);
      const iv = CryptoES.enc.Base64.parse(systemIv);

      const encryptPassword = CryptoES.AES.encrypt(password, key, { iv: iv }).toString();

      if (passwordStored === encryptPassword) {
        resolve({ key: password, authorized: true });
      } else {
        reject(new Error('Senha inválida'))
      }
    } else {
      reject(new Error('Não existe senha cadastrada'))
    }
  });
}

async function savePassword(password: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const systemKey = await checkSystemKey();
    const systemIv = await checkSystemIv();
    const key = CryptoES.enc.Base64.parse(systemKey);
    const iv = CryptoES.enc.Base64.parse(systemIv);

    const encryptedPassword = CryptoES.AES.encrypt(password, key, { iv: iv }).toString()

    const newPassword = await setSecureStoreItem('Password', encryptedPassword);

    if (newPassword) {
      resolve(password);
    } else {
      reject(new Error('Erro ao salvar senha'))
    }
  });
}

export const authService = { signIn, savePassword }