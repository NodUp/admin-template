'use server';

const crypto = require('crypto');

export const getString = async (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};
