const crypto = require('crypto');

const sessionSecretGenerator = () => {
  // Menghasilkan session secret dengan panjang 32 byte
  const generateSessionSecret = () => {
    return crypto.randomBytes(32).toString('hex');
  };

  const sessionSecret = generateSessionSecret();
  console.log("Session Secret:", sessionSecret);
}
