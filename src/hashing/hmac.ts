import { SHA1 } from './sha1';
import { SHA256 } from './sha256';
import { SHA512 } from './sha512';

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
): Uint8Array {
    const uint8ArrayToString = (array: Uint8Array): string =>
        String.fromCharCode(...Array.from(array));

    if (key.length > blockSize) key = hash(uint8ArrayToString(key));

    if (key.length <= blockSize)
        key = new Uint8Array([
            ...Array.from(key),
            ...new Array<number>(blockSize - key.length),
        ]);

    const opad = uint8ArrayToString(key.map((val) => val ^ 0x5c));
    const ipad = uint8ArrayToString(key.map((val) => val ^ 0x36));

    const ihash = hash(ipad + message);
    return hash(opad + uint8ArrayToString(ihash));
}

/**
 * HMAC-SHA1 hashing implementation.
 * @param key private key.
 * @param message message to athenticate.
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
export const HMAC_SHA1 = (key: Uint8Array, message: string): Uint8Array =>
    HMAC(key, message, SHA1, 64);

/**
 * HMAC-SHA256 hashing implementation.
 * @param key private key.
 * @param message message to athenticate.
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
export const HMAC_SHA256 = (key: Uint8Array, message: string): Uint8Array =>
    HMAC(key, message, SHA256, 64);

/**
 * HMAC-SHA512 hashing implementation.
 * @param key private key.
 * @param message message to athenticate.
 * @returns the HMAC hashed value stored in a big-endian uint8 array.
 */
export const HMAC_SHA512 = (key: Uint8Array, message: string): Uint8Array =>
    HMAC(key, message, SHA512, 128);
