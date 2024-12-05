# Hybrid AES-DES Encryption with Chaotic Key Sharing  

A secure web application implementing two-layer encryption using **AES** and **DES** algorithms, combined with a chaotic map-based shared key generation system for secure decryption.  

## Features  
- **Two-Layer Encryption**:  
  - Files are encrypted sequentially using AES and DES for enhanced security.  
  - Encrypted files are stored in binary format on the system.  

- **Chaotic Key Sharing**:  
  - A shared key is generated using a chaotic map based on:  
    - **Initial seed**, **R parameter**, and **Iterations**.  
  - Ensures secure decryption on the receiver's end.  

- **Readable Encrypted Content**:  
  - Encrypted content can be viewed in **Base64 format** for convenience.  

- **Two-Step Decryption**:  
  - The receiver uses the chaotic shared key to decrypt the file by reversing DES and AES encryption sequentially.  

## Application Flow  
1. **Sender** uploads a file and encrypts it using AES and DES keys.  
2. A **chaotic shared key** is generated for decryption.  
3. **Receiver** decrypts the file using the shared key, restoring the original content.  

## Technologies Used  
- **Frontend**: TypeScript, JavaScript, HTML, CSS, Tailwind CSS  
- **Encryption Algorithms**: AES, DES  
- **Key Generation**: Chaotic map (based on dynamic parameters)  

## Setup Instructions  
```bash
# Clone the repository to your local machine
git clone https://github.com/01fe21bcs108/HYBRID-AES-DES-ENCRYPTION.git

# Navigate to the project folder
cd HYBRID-AES-DES-ENCRYPTION

# Open the project folder in VS Code or any preferred development tool

# Install Vite
npm install vite

# Start the development server
npm run dev
