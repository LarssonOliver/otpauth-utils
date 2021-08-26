/**
 * Test vectors are from
 * [rfc2202]{@link https://datatracker.ietf.org/doc/html/rfc2202} and
 * [rfc4231]{@link https://datatracker.ietf.org/doc/html/rfc4231}.
 */

import { HMAC_SHA1 } from '../hmac';

/**
 * Parse hex value into uint8array.
 * @param hex hex input.
 * @returns value as uint8array.
 */
function hexToUint8Array(hex: string): Uint8Array {
    return new Uint8Array(
        (hex.startsWith('0x') ? hex.substr(2) : hex)
            .match(/.{2}/g)
            ?.map((n) => parseInt(n, 16)) ?? [],
    );
}

test('TEST METHOD - hex to uint8array', () => {
    expect(hexToUint8Array('ffff')).toEqual(new Uint8Array([0xff, 0xff]));
    expect(hexToUint8Array('')).toEqual(new Uint8Array([]));
    expect(hexToUint8Array('0xabc123')).toEqual(
        new Uint8Array([0xab, 0xc1, 0x23]),
    );
});

test('HMAC-SHA1 - 1', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array('0x0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'),
            'Hi There',
        ),
    ).toEqual(hexToUint8Array('0xb617318655057264e28bc0b6fb378c8ef146be00'));
});

test('HMAC-SHA1 - 2', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array('0x4a656665'),
            'what do ya want for nothing?',
        ),
    ).toEqual(hexToUint8Array('0xeffcdf6ae5eb2fa2d27416d5f184df9c259a7c79'));
});

test('HMAC-SHA1 - 3', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array('0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
            '\xdd'.repeat(50),
        ),
    ).toEqual(hexToUint8Array('0x125d7342b9ac11cd91a39af48aa17b4f63f175d3'));
});

test('HMAC-SHA1 - 4', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array(
                '0x0102030405060708090a0b0c0d0e0f10111213141516171819',
            ),
            '\xcd'.repeat(50),
        ),
    ).toEqual(hexToUint8Array('0x4c9007f4026250c6bc8414f9bf50c86c2d7235da'));
});

test('HMAC-SHA1 - 5', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array('0x0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c'),
            'Test With Truncation',
        ),
    ).toEqual(hexToUint8Array('0x4c1a03424b55e07fe7f27be1d58bb9324a9a5a04'));
});

test('HMAC-SHA1 - 6', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array('0xaa'.repeat(80)),
            'Test Using Larger Than Block-Size Key - Hash Key First',
        ),
    ).toEqual(hexToUint8Array('0xaa4ae5e15272d00e95705637ce8a3b55ed402112'));
});

test('HMAC-SHA1 - 7', () => {
    expect(
        HMAC_SHA1(
            hexToUint8Array('0xaa'.repeat(80)),
            'Test Using Larger Than Block-Size Key and Larger Than One Block-Size Data',
        ),
    ).toEqual(hexToUint8Array('0xe8e99d0f45237d786d6bbaa7965c7808bbff1a91'));
});
