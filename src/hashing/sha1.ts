/**
 * The SHA1 hash of the given input, returned as a Uint8Array
 * storing the 20 bytes in big endian order.
 * @param input an input string to hash.
 */
export function SHA1(input: string): Uint8Array {
    const ml = input.length * 8;
    input += '\x80' + '\x00'.repeat(64 - ((input.length + 9) % 64));

    const upper32 = Math.floor(ml / 2e32);
    input += String.fromCharCode(
        upper32 >>> 24,
        (upper32 >> 16) & 0xff,
        (upper32 >> 8) & 0xff,
        upper32 & 0xff,
        ml >>> 24,
        (ml >> 16) & 0xff,
        (ml >> 8) & 0xff,
        ml & 0xff,
    );

    let h0 = 0x67452301;
    let h1 = 0xefcdab89;
    let h2 = 0x98badcfe;
    let h3 = 0x10325476;
    let h4 = 0xc3d2e1f0;

    for (let chunkOffset = 0; chunkOffset < input.length / 64; chunkOffset++) {
        const chunk = input.substr(chunkOffset * 64, 64);

        // We know that the match will not return null.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const w = chunk
            .match(/.{4}/g)!
            .map(
                (word) =>
                    (word.charCodeAt(0) << 24) |
                    (word.charCodeAt(1) << 16) |
                    (word.charCodeAt(2) << 8) |
                    word.charCodeAt(3),
            );

        for (let i = 16; i < 80; i++) {
            const temp = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
            w.push((temp << 1) | (temp >>> 31));
        }

        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;

        for (let i = 0; i < w.length; i++) {
            let f: number;
            let k: number;

            if (i < 20) {
                f = d ^ (b & (c ^ d));
                k = 0x5a827999;
            } else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ed9eba1;
            } else if (i < 60) {
                f = (b & c) | (d & (b | c));
                k = 0x8f1bbcdc;
            } else {
                f = b ^ c ^ d;
                k = 0xca62c1d6;
            }

            const temp =
                (((a << 5) | (a >>> 27)) + f + e + k + w[i]) & 0xffffffff;

            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = temp;
        }

        h0 = (h0 + a) & 0xffffffff;
        h1 = (h1 + b) & 0xffffffff;
        h2 = (h2 + c) & 0xffffffff;
        h3 = (h3 + d) & 0xffffffff;
        h4 = (h4 + e) & 0xffffffff;
    }

    const res = new Uint8Array([
        h0 >>> 24,
        (h0 >> 16) & 0xff,
        (h0 >> 8) & 0xff,
        h0 & 0xff,
        h1 >>> 24,
        (h1 >> 16) & 0xff,
        (h1 >> 8) & 0xff,
        h1 & 0xff,
        h2 >>> 24,
        (h2 >> 16) & 0xff,
        (h2 >> 8) & 0xff,
        h2 & 0xff,
        h3 >>> 24,
        (h3 >> 16) & 0xff,
        (h3 >> 8) & 0xff,
        h3 & 0xff,
        h4 >>> 24,
        (h4 >> 16) & 0xff,
        (h4 >> 8) & 0xff,
        h4 & 0xff,
    ]);

    // res.forEach((i) => console.log(i.toString(16)));

    return res;
}
