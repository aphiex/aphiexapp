import * as SecureStore from 'expo-secure-store';

export async function setSecureStoreItem(key: string,value: string) {
  await SecureStore.setItemAsync(key, value);
  return value
}

export async function getSecureStoreItem(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) return result
  return null;
}

export async function deleteSecureStoreItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}