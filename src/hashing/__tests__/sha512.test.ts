/**
 * Test vectors grabbed from
 * [here.]{@link https://www.di-mgt.com.au/sha_testvectors.html}
 */

// import { SHA512 } from '../sha512';
// import { Uint32ArrayToUint8Array } from './sha1.test';

// test('simple string', () => {
//     expect(SHA512('abc')).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xddaf35a1, 0x93617aba, 0xcc417349, 0xae204131, 0x12e6fa4e,
//                 0x89a97ea2, 0x0a9eeee6, 0x4b55d39a, 0x2192992a, 0x274fc1a8,
//                 0x36ba3c23, 0xa3feebbd, 0x454d4423, 0x643ce80e, 0x2a9ac94f,
//                 0xa54ca49f,
//             ]),
//         ),
//     );
// });

// test('empty string', () => {
//     expect(SHA512('')).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xcf83e135, 0x7eefb8bd, 0xf1542850, 0xd66d8007, 0xd620e405,
//                 0x0b5715dc, 0x83f4a921, 0xd36ce9ce, 0x47d0d13c, 0x5d85f2b0,
//                 0xff8318d2, 0x877eec2f, 0x63b931bd, 0x47417a81, 0xa538327a,
//                 0xf927da3e,
//             ]),
//         ),
//     );
// });

// test('448 bit input', () => {
//     expect(
//         SHA512('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
//     ).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0x204a8fc6, 0xdda82f0a, 0x0ced7beb, 0x8e08a416, 0x57c16ef4,
//                 0x68b228a8, 0x279be331, 0xa703c335, 0x96fd15c1, 0x3b1b07f9,
//                 0xaa1d3bea, 0x57789ca0, 0x31ad85c7, 0xa71dd703, 0x54ec6312,
//                 0x38ca3445,
//             ]),
//         ),
//     );
// });

// test('896 bit input', () => {
//     expect(
//         SHA512(
//             'abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijkl' +
//                 'mnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu',
//         ),
//     ).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0x8e959b75, 0xdae313da, 0x8cf4f728, 0x14fc143f, 0x8f7779c6,
//                 0xeb9f7fa1, 0x7299aead, 0xb6889018, 0x501d289e, 0x4900f7e4,
//                 0x331b99de, 0xc4b5433a, 0xc7d329ee, 0xb6dd2654, 0x5e96e55b,
//                 0x874be909,
//             ]),
//         ),
//     );
// });

// test("1 million * 'a'", () => {
//     expect(SHA512('a'.repeat(10e6))).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xe718483d, 0x0ce76964, 0x4e2e42c7, 0xbc15b463, 0x8e1f98b1,
//                 0x3b204428, 0x5632a803, 0xafa973eb, 0xde0ff244, 0x877ea60a,
//                 0x4cb0432c, 0xe577c31b, 0xeb009c5c, 0x2c49aa2e, 0x4eadb217,
//                 0xad8cc09b,
//             ]),
//         ),
//     );
// });
