import CryptoJS from 'crypto-js';
import { logisticMap, generateKeyFromChaos } from './chaoticMap';

interface ChaoticParameters {
  seed: number;
  r: number;
  iterations: number;
}

export const generateSharedKey = (aesKey: string, desKey: string): { sharedKey: string; parameters: ChaoticParameters } => {
  const combinedKey = aesKey + desKey;
  const seed = Array.from(combinedKey).reduce((acc, char) => acc + char.charCodeAt(0), 0) / 65535;
  const r = 3.7 + (Array.from(combinedKey).reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0) % 3000) / 10000;
  const iterations = 100;
  
  const chaosSequence = logisticMap(seed, r, iterations);
  const sharedKey = generateKeyFromChaos(chaosSequence, 32);
  
  return {
    sharedKey,
    parameters: { seed, r, iterations }
  };
};

export const validateKeys = (aesKey: string, desKey: string): boolean => {
  return aesKey.length >= 16 && desKey.length >= 8;
};

export const encryptData = (data: string, aesKey: string, desKey: string) => {
  if (!validateKeys(aesKey, desKey)) {
    throw new Error('Invalid key lengths');
  }

  const { sharedKey, parameters } = generateSharedKey(aesKey, desKey);
  
  const aesEncrypted = CryptoJS.AES.encrypt(data, aesKey).toString();
  const desEncrypted = CryptoJS.DES.encrypt(aesEncrypted, desKey).toString();
  const finalEncrypted = CryptoJS.AES.encrypt(desEncrypted, sharedKey).toString();
  
  return { encryptedData: finalEncrypted, sharedKey, parameters };
};

export const decryptData = (encryptedData: string, sharedKey: string) => {
  try {
    const sharedDecrypted = CryptoJS.AES.decrypt(encryptedData, sharedKey).toString(CryptoJS.enc.Utf8);
    
    if (!sharedDecrypted) {
      throw new Error('Invalid shared key');
    }
    
    return sharedDecrypted;
  } catch (error) {
    throw new Error('Decryption failed. Invalid shared key or corrupted data.');
  }
};