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
                num += input[byteoffset + 1] >> (11 - bitoffset);
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
    for (let i = input.length - 1; i >= 0; i--) {
        if (input.charAt(i) !== '=') {
            if (i !== input.length - 1) input = input.substr(0, i + 1);
            break;
        }
    }

    const res = new Uint8Array(Math.floor((input.length * 5) / 8));

    for (let offset = 0; offset < input.length; offset++) {
        let num = input.charCodeAt(offset);

        if (num > 49 && num < 56) num -= 24;
        else if (num > 64 && num < 91) num -= 65;
        else
            throw new Error(
                `invalid character in base32 string '${input.charAt(offset)}'`,
            );

        const bitoffset = (offset * 5) % 8;
        const byteoffset = Math.floor((offset * 5) / 8);

        if (bitoffset % 8 < 4) {
            res[byteoffset] += num << (3 - bitoffset);
        } else {
            res[byteoffset] += num >> (bitoffset - 3);
            if (byteoffset + 1 < res.length)
                res[byteoffset + 1] += num << (11 - bitoffset);
        }
    }

    return res;
}
