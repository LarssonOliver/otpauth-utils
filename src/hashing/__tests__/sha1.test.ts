/**
 * Test vectors grabbed from
 * [here.]{@link https://www.di-mgt.com.au/sha_testvectors.html}
 */

import { SHA1 } from '../sha1';

test('TEST METHOD - array conversion', () => {
    expect(
        Uint32ArrayToUint8Array(
            new Uint32Array([
                0xa9993e36, 0x4706816a, 0xba3e2571, 0x7850c26c, 0x9cd0d89d,
            ]),
        ),
    ).toEqual(
        new Uint8Array([
            0xa9, 0x99, 0x3e, 0x36, 0x47, 0x06, 0x81, 0x6a, 0xba, 0x3e, 0x25,
            0x71, 0x78, 0x50, 0xc2, 0x6c, 0x9c, 0xd0, 0xd8, 0x9d,
        ]),
    );
});

test('simple string', () => {
    expect(SHA1('abc')).toEqual(
        Uint32ArrayToUint8Array(
            new Uint32Array([
                0xa9993e36, 0x4706816a, 0xba3e2571, 0x7850c26c, 0x9cd0d89d,
            ]),
        ),
    );
});

test('empty string', () => {
    expect(SHA1('')).toEqual(
        Uint32ArrayToUint8Array(
            new Uint32Array([
                0xda39a3ee, 0x5e6b4b0d, 0x3255bfef, 0x95601890, 0xafd80709,
            ]),
        ),
    );
});

test('448 bit input', () => {
    expect(
        SHA1('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
    ).toEqual(
        Uint32ArrayToUint8Array(
            new Uint32Array([
                0x84983e44, 0x1c3bd26e, 0xbaae4aa1, 0xf95129e5, 0xe54670f1,
            ]),
        ),
    );
});

test('896 bit input', () => {
    expect(
        SHA1(
            'abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijkl' +
                'mnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu',
        ),
    ).toEqual(
        Uint32ArrayToUint8Array(
            new Uint32Array([
                0xa49b2446, 0xa02c645b, 0xf419f995, 0xb6709125, 0x3a04a259,
            ]),
        ),
    );
});

test("1 million * 'a'", () => {
    expect(SHA1('a'.repeat(1e6))).toEqual(
        Uint32ArrayToUint8Array(
            new Uint32Array([
                0x34aa973c, 0xd4c4daa4, 0xf61eeb2b, 0xdbad2731, 0x6534016f,
            ]),
        ),
    );
});

export function Uint32ArrayToUint8Array(input: Uint32Array): Uint8Array {
    const res = new Uint8Array(input.length * 4);
    input.forEach((n, i) => {
        const offset = i * 4;
        res[offset] = (n >> 24) & 0xff;
        res[offset + 1] = (n >> 16) & 0xff;
        res[offset + 2] = (n >> 8) & 0xff;
        res[offset + 3] = n & 0xff;
    });
    return res;
}
