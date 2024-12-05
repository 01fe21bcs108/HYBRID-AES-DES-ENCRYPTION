export const downloadFile = (content: string, fileName: string, type: 'encrypted' | 'decrypted') => {
  // Get the original file extension
  const originalExt = fileName.split('.').pop() || '';
  
  // For decrypted files, use the original extension if it exists
  const extension = type === 'encrypted' ? 'enc' : originalExt || 'txt';
  
  // Determine if we're dealing with a binary file
  const isBinary = /^data:.*?;base64,/.test(content);
  
  let blob;
  if (isBinary) {
    // Handle base64 encoded binary data
    const base64Data = content.split(',')[1];
    const binaryData = atob(base64Data);
    const bytes = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }
    blob = new Blob([bytes], { type: getMimeType(extension) });
  } else {
    // Handle text data
    blob = new Blob([content], { type: getMimeType(extension) });
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName.split('.')[0]}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const getMimeType = (extension: string): string => {
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    'txt': 'text/plain',
    'enc': 'application/octet-stream'
  };
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
};