import crypto from 'crypto';

/** Generates a random secure password of specified length. */
export function generateDefaultPassword(length: number = 8): string {
  // Use a character set that avoids ambiguous characters like O, 0, I, 1, l
  const charset = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*';
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(crypto.randomInt(0, n)));
  }
  return retVal;
}
