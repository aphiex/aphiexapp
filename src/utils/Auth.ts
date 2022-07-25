import { getSecureStoreItem, setSecureStoreItem } from "./SecureStore";

const stringLength = 22;

function stringGenerator(length: number) {
  let string = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    string += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return string;
}

export async function checkSystemKey(): Promise<string> {
  let systemKey = await getSecureStoreItem('SystemKey');

  if (systemKey) return systemKey;

  const newKey = stringGenerator(stringLength); // generate a random key with 22 characteres
  systemKey = await setSecureStoreItem('SystemKey', newKey);
  return systemKey;
}

export async function checkSystemIv(): Promise<string> {
  let systemIv = await getSecureStoreItem('SystemIv');

  if (systemIv) return systemIv;

  const newIv = stringGenerator(stringLength); // generate a random iv with 22 characteres
  systemIv = await setSecureStoreItem('SystemIv', newIv);
  return systemIv;
}