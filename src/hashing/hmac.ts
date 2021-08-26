import { SHA1 } from './sha1';

/**
 * Hash-based message authentication code. Implemented
 * according to [rfc2104]{@link https://datatracker.ietf.org/doc/html/rfc2104}.
 * @param key private key.
 * @param message message to athenticate.
 * @param hash hash function, ex. SHA1, SHA256, SHA512...
 * @param blockSize hash function block size in bytes. (SHA1 -> 64)
 * @param outputSize hash function output size in bytes. (SHA1 -> 20)
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
function HMAC(
    key: Uint8Array,
    message: string,
    hash: (input: string) => Uint8Array,
    blockSize: number,
    outputSize: number,
): Uint8Array {
    throw new Error('not implemented');
}

/**
 * HMAC-SHA1 hashing implementation.
 * @param key private key.
 * @param message message to athenticate.
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
export const HMAC_SHA1 = (key: Uint8Array, message: string): Uint8Array =>
    HMAC(key, message, SHA1, 64, 20);

/**
 * HMAC-SHA256 hashing implementation.
 * @param key private key.
 * @param message message to athenticate.
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
export const HMAC_SHA256 = (key: Uint8Array, message: string): Uint8Array =>
    HMAC(key, message, SHA1, 64, 32);

/**
 * HMAC-SHA512 hashing implementation.
 * @param key private key.
 * @param message message to athenticate.
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
export const HMAC_SHA512 = (key: Uint8Array, message: string): Uint8Array =>
    HMAC(key, message, SHA1, 128, 64);
