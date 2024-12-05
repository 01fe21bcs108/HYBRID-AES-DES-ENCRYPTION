import React from 'react';
import { AlertCircle } from 'lucide-react';

interface KeyValidationProps {
  aesKey: string;
  desKey: string;
}

const KeyValidation: React.FC<KeyValidationProps> = ({ aesKey, desKey }) => {
  const aesMinLength = 16; // 128 bits
  const desMinLength = 8; // 64 bits

  const isAesValid = aesKey.length >= aesMinLength;
  const isDesValid = desKey.length >= desMinLength;

  return (
    <div className="space-y-2 text-sm">
      <div className={`flex items-center gap-2 ${isAesValid ? 'text-green-400' : 'text-red-400'}`}>
        <AlertCircle size={16} />
        <span>AES Key: {isAesValid ? 'Valid' : `Minimum ${aesMinLength} characters required`}</span>
      </div>
      <div className={`flex items-center gap-2 ${isDesValid ? 'text-green-400' : 'text-red-400'}`}>
        <AlertCircle size={16} />
        <span>DES Key: {isDesValid ? 'Valid' : `Minimum ${desMinLength} characters required`}</span>
      </div>
    </div>
  );
}

export default KeyValidation;