/**
 * Test vectors grabbed from
 * [here.]{@link https://www.di-mgt.com.au/sha_testvectors.html}
 */

// import { SHA256 } from '../sha256';
// import { Uint32ArrayToUint8Array } from './sha1.test';

// test('simple string', () => {
//     expect(SHA256('abc')).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xba7816bf, 0x8f01cfea, 0x414140de, 0x5dae2223, 0xb00361a3,
//                 0x96177a9c, 0xb410ff61, 0xf20015ad,
//             ]),
//         ),
//     );
// });

// test('empty string', () => {
//     expect(SHA256('')).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xe3b0c442, 0x98fc1c14, 0x9afbf4c8, 0x996fb924, 0x27ae41e4,
//                 0x649b934c, 0xa495991b, 0x7852b855,
//             ]),
//         ),
//     );
// });

// test('448 bit input', () => {
//     expect(
//         SHA256('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
//     ).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0x248d6a61, 0xd20638b8, 0xe5c02693, 0x0c3e6039, 0xa33ce459,
//                 0x64ff2167, 0xf6ecedd4, 0x19db06c1,
//             ]),
//         ),
//     );
// });

// test('896 bit input', () => {
//     expect(
//         SHA256(
//             'abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijkl' +
//                 'mnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu',
//         ),
//     ).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xcf5b16a7, 0x78af8380, 0x036ce59e, 0x7b049237, 0x0b249b11,
//                 0xe8f07a51, 0xafac4503, 0x7afee9d1,
//             ]),
//         ),
//     );
// });

// test("1 million * 'a'", () => {
//     expect(SHA256('a'.repeat(10e6))).toEqual(
//         Uint32ArrayToUint8Array(
//             new Uint32Array([
//                 0xcdc76e5c, 0x9914fb92, 0x81a1c7e2, 0x84d73e67, 0xf1809a48,
//                 0xa497200e, 0x046d39cc, 0xc7112cd0,
//             ]),
//         ),
//     );
// });
