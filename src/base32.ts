/**
 * Encode raw byte data into an RFC4648 base32 string.
 * @param input raw byte data to encode.
 * @param padding should padding '=' be written?
 * @see https://datatracker.ietf.org/doc/html/rfc4648
 */
export function base32encode(input: Uint8Array, padding = true): string {
    const res: number[] = [];
    for (let offset = 0; offset < input.length * 8; offset += 5) {
        const byteoffset = Math.floor(offset / 8);
        const bitoffset = offset % 8;

        if (bitoffset < 4) {
            res.push((input[byteoffset] >> (3 - bitoffset)) & 0b11111);
        } else {
            let num = (input[byteoffset] << (bitoffset - 3)) & 0b11111;
            if (byteoffset + 1 < input.length)
                num += input[byteoffset + 1] >> (7 - (bitoffset - 4));
            res.push(num);
        }
    }

    const str = res.map((n) => String.fromCharCode((n < 26 ? 65 : 24) + n));
    if (padding && str.length % 8 != 0)
        str.push('========'.substr(str.length % 8));

    return ''.concat(...str);
}

/**
 * Decode an  base32 encoded string into raw bytes.
 * @param input base32 encoded string to decode.
 * @see https://datatracker.ietf.org/doc/html/rfc4648
 */
export function base32decode(input: string): Uint8Array {
    throw new Error('not implemented');
}
