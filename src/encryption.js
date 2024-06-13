import { NativeModules } from 'react-native';
import { encrypt, decrypt } from 'react-native-dotenv';

const { Encryption } = NativeModules;

export const encryptValue = async (value) => {
  const encryptedValue = await Encryption.encrypt(value);
  return encryptedValue;
};

export const decryptValue = async (encryptedValue) => {
  const decryptedValue = await Encryption.decrypt(encryptedValue);
  return decryptedValue;
};

export const getEncryptedApiKey = async () => {
  const apiKey = process.env.API_KEY;
  const encryptedApiKey = await encryptValue(apiKey);
  return encryptedApiKey;
};

export const getDecryptedApiKey = async () => {
  const encryptedApiKey = await getEncryptedApiKey();
  const decryptedApiKey = await decryptValue(encryptedApiKey);
  return decryptedApiKey;
};