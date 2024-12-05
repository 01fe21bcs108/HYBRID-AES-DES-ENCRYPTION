import React, { useState } from 'react';
import { Lock, Unlock, RefreshCw, Key, Download } from 'lucide-react';
import GlowingButton from './components/GlowingButton';
import FileUpload from './components/FileUpload';
import ChaoticParameters from './components/ChaoticParameters';
import KeyValidation from './components/KeyValidation';
import { encryptData, decryptData, validateKeys } from './utils/encryption';
import { downloadFile } from './utils/fileHandling';

interface ChaoticParameters {
  seed: number;
  r: number;
  iterations: number;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [encryptedContent, setEncryptedContent] = useState<string>('');
  const [decryptedContent, setDecryptedContent] = useState<string>('');
  const [aesKey, setAesKey] = useState<string>('');
  const [desKey, setDesKey] = useState<string>('');
  const [sharedKey, setSharedKey] = useState<string>('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [parameters, setParameters] = useState<ChaoticParameters | null>(null);

  const handleEncrypt = async () => {
    if (!file || !aesKey || !desKey) return;
    if (!validateKeys(aesKey, desKey)) {
      alert('Please ensure AES key is at least 16 characters and DES key is at least 8 characters');
      return;
    }

    try {
      // Read file as base64 for binary files
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        const { encryptedData, sharedKey: generatedKey, parameters: chaosParams } = encryptData(fileContent, aesKey, desKey);
        setEncryptedContent(encryptedData);
        setSharedKey(generatedKey);
        setParameters(chaosParams);
        setDecryptedContent('');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Encryption failed. Please check your keys.');
    }
  };

  const handleDecrypt = () => {
    if (!encryptedContent || !sharedKey) return;

    try {
      const decrypted = decryptData(encryptedContent, sharedKey);
      setDecryptedContent(decrypted);
    } catch (error) {
      alert('Decryption failed. Please check your shared key.');
    }
  };

  const handleDownload = (type: 'encrypted' | 'decrypted') => {
    const content = type === 'encrypted' ? encryptedContent : decryptedContent;
    const fileName = file ? file.name : 'file';
    downloadFile(content, fileName, type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Hybrid AES-DES Encryption
        </h1>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl mb-8">
          <div className="flex justify-center gap-4 mb-6">
            <GlowingButton
              onClick={() => setMode('encrypt')}
              color={mode === 'encrypt' ? 'blue' : 'purple'}
            >
              <div className="flex items-center gap-2">
                <Lock size={20} />
                Encrypt Mode
              </div>
            </GlowingButton>
            <GlowingButton
              onClick={() => setMode('decrypt')}
              color={mode === 'decrypt' ? 'blue' : 'purple'}
            >
              <div className="flex items-center gap-2">
                <Unlock size={20} />
                Decrypt Mode
              </div>
            </GlowingButton>
          </div>

          {mode === 'encrypt' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">AES Key (min 16 characters)</label>
                  <input
                    type="text"
                    value={aesKey}
                    onChange={(e) => setAesKey(e.target.value)}
                    placeholder="Enter AES key"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">DES Key (min 8 characters)</label>
                  <input
                    type="text"
                    value={desKey}
                    onChange={(e) => setDesKey(e.target.value)}
                    placeholder="Enter DES key"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <KeyValidation aesKey={aesKey} desKey={desKey} />
            </>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Shared Key</label>
              <input
                type="text"
                value={sharedKey}
                onChange={(e) => setSharedKey(e.target.value)}
                placeholder="Enter shared key for decryption"
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            <FileUpload onFileSelect={setFile} />
            {file && (
              <p className="mt-2 text-sm text-gray-400">
                Selected file: {file.name}
              </p>
            )}
          </div>

          {parameters && mode === 'encrypt' && (
            <ChaoticParameters {...parameters} />
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {mode === 'encrypt' ? (
              <>
                <GlowingButton
                  onClick={handleEncrypt}
                  color="blue"
                  disabled={!file || !aesKey || !desKey || !validateKeys(aesKey, desKey)}
                >
                  <div className="flex items-center gap-2">
                    <Lock size={20} />
                    Encrypt
                  </div>
                </GlowingButton>
                {encryptedContent && (
                  <GlowingButton
                    onClick={() => handleDownload('encrypted')}
                    color="purple"
                  >
                    <div className="flex items-center gap-2">
                      <Download size={20} />
                      Download Encrypted
                    </div>
                  </GlowingButton>
                )}
              </>
            ) : (
              <>
                <GlowingButton
                  onClick={handleDecrypt}
                  color="green"
                  disabled={!encryptedContent || !sharedKey}
                >
                  <div className="flex items-center gap-2">
                    <Key size={20} />
                    Decrypt
                  </div>
                </GlowingButton>
                {decryptedContent && (
                  <GlowingButton
                    onClick={() => handleDownload('decrypted')}
                    color="purple"
                  >
                    <div className="flex items-center gap-2">
                      <Download size={20} />
                      Download Decrypted
                    </div>
                  </GlowingButton>
                )}
              </>
            )}

            <GlowingButton
              onClick={() => {
                setFile(null);
                setEncryptedContent('');
                setDecryptedContent('');
                setSharedKey('');
                setParameters(null);
              }}
              color="purple"
            >
              <div className="flex items-center gap-2">
                <RefreshCw size={20} />
                Reset
              </div>
            </GlowingButton>
          </div>

          {(encryptedContent || decryptedContent || sharedKey) && (
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              {encryptedContent && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Encrypted Content:</h3>
                  <div className="bg-gray-700 p-4 rounded-lg overflow-auto max-h-40">
                    <code className="text-sm text-gray-300 break-all">
                      {encryptedContent}
                    </code>
                  </div>
                </div>
              )}
              {sharedKey && mode === 'encrypt' && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Generated Shared Key:</h3>
                  <div className="bg-gray-700 p-4 rounded-lg overflow-auto">
                    <code className="text-sm text-gray-300 break-all">
                      {sharedKey}
                    </code>
                  </div>
                </div>
              )}
              {decryptedContent && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Decrypted Content:</h3>
                  <div className="bg-gray-700 p-4 rounded-lg overflow-auto max-h-40">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {decryptedContent}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;