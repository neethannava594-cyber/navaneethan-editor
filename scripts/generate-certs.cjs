const fs = require('fs');
const path = require('path');
const https = require('https');

// Try to use the selfsigned npm package if available, otherwise generate using crypto
try {
  const selfsigned = require('selfsigned');
  const { cert, private: key } = selfsigned.generate(
    [{ name: 'commonName', value: 'localhost' }],
    { days: 365 }
  );
  const certsDir = path.resolve(__dirname, '..', 'certs');
  if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(certsDir, 'localhost.pem'), cert);
  fs.writeFileSync(path.join(certsDir, 'localhost-key.pem'), key);
  console.log('✓ Self-signed certificates generated in certs/');
} catch (e) {
  console.error('Failed to generate certs:', e.message);
  console.error('Install selfsigned: npm install selfsigned --save-dev');
  process.exit(1);
}
