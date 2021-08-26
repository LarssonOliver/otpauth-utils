/**
 * Test vectors are from
 * [rfc2202]{@link https://datatracker.ietf.org/doc/html/rfc2202} and
 * [rfc4231]{@link https://datatracker.ietf.org/doc/html/rfc4231}.
 */

import { HMAC_SHA1, HMAC_SHA256, HMAC_SHA512 } from '../hmac';

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

test('HMAC-SHA256 - 1', () => {
    expect(HMAC_SHA256(hexToUint8Array('\x0b'.repeat(20)), 'Hi There')).toEqual(
        hexToUint8Array(
            'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7',
        ),
    );
});

test('HMAC-SHA256 - 2', () => {
    expect(
        HMAC_SHA256(
            hexToUint8Array('4a656665'),
            'what do ya want for nothing?',
        ),
    ).toEqual(
        hexToUint8Array(
            '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843',
        ),
    );
});

test('HMAC-SHA256 - 3', () => {
    expect(
        HMAC_SHA256(hexToUint8Array('aa'.repeat(20)), '\xdd'.repeat(50)),
    ).toEqual(
        hexToUint8Array(
            '773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe',
        ),
    );
});

test('HMAC-SHA256 - 4', () => {
    expect(
        HMAC_SHA256(
            hexToUint8Array(
                '0102030405060708090a0b0c0d0e0f10111213141516171819',
            ),
            '\xcd'.repeat(50),
        ),
    ).toEqual(
        hexToUint8Array(
            '82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b',
        ),
    );
});

// Test 5 involves truncation and has been left out.

test('HMAC-SHA256 - 6', () => {
    expect(
        HMAC_SHA256(
            hexToUint8Array('aa'.repeat(131)),
            'Test Using Larger Than Block-Size Key - Hash Key First',
        ),
    ).toEqual(
        hexToUint8Array(
            '60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54',
        ),
    );
});

test('HMAC-SHA256 - 7', () => {
    expect(
        HMAC_SHA256(
            hexToUint8Array('aa'.repeat(131)),
            'This is a test using a larger than block-size key and a larger ' +
                'than block-size data. The key needs to be hashed before ' +
                'being used by the HMAC algorithm.',
        ),
    ).toEqual(
        hexToUint8Array(
            '9b09ffa71b942fcb27635fbcd5b0e944bfdc63644f0713938a7f51535c3a35e2',
        ),
    );
});

test('HMAC-SHA512 - 1', () => {
    expect(HMAC_SHA512(hexToUint8Array('\x0b'.repeat(20)), 'Hi There')).toEqual(
        hexToUint8Array(
            '87aa7cdea5ef619d4ff0b4241a1d6cb0' +
                '2379f4e2ce4ec2787ad0b30545e17cde' +
                'daa833b7d6b8a702038b274eaea3f4e4' +
                'be9d914eeb61f1702e696c203a126854',
        ),
    );
});

test('HMAC-SHA512 - 2', () => {
    expect(
        HMAC_SHA512(
            hexToUint8Array('4a656665'),
            'what do ya want for nothing?',
        ),
    ).toEqual(
        hexToUint8Array(
            '164b7a7bfcf819e2e395fbe73b56e0a3' +
                '87bd64222e831fd610270cd7ea250554' +
                '9758bf75c05a994a6d034f65f8f0e6fd' +
                'caeab1a34d4a6b4b636e070a38bce737',
        ),
    );
});

test('HMAC-SHA512 - 3', () => {
    expect(
        HMAC_SHA512(hexToUint8Array('aa'.repeat(20)), '\xdd'.repeat(50)),
    ).toEqual(
        hexToUint8Array(
            'fa73b0089d56a284efb0f0756c890be9' +
                'b1b5dbdd8ee81a3655f83e33b2279d39' +
                'bf3e848279a722c806b485a47e67c807' +
                'b946a337bee8942674278859e13292fb',
        ),
    );
});

test('HMAC-SHA512 - 4', () => {
    expect(
        HMAC_SHA512(
            hexToUint8Array(
                '0102030405060708090a0b0c0d0e0f10111213141516171819',
            ),
            '\xcd'.repeat(50),
        ),
    ).toEqual(
        hexToUint8Array(
            'b0ba465637458c6990e5a8c5f61d4af7' +
                'e576d97ff94b872de76f8050361ee3db' +
                'a91ca5c11aa25eb4d679275cc5788063' +
                'a5f19741120c4f2de2adebeb10a298dd',
        ),
    );
});

// Test 5 involves truncation and has been left out.

test('HMAC-SHA512 - 6', () => {
    expect(
        HMAC_SHA512(
            hexToUint8Array('aa'.repeat(131)),
            'Test Using Larger Than Block-Size Key - Hash Key First',
        ),
    ).toEqual(
        hexToUint8Array(
            '80b24263c7c1a3ebb71493c1dd7be8b4' +
                '9b46d1f41b4aeec1121b013783f8f352' +
                '6b56d037e05f2598bd0fd2215d6a1e52' +
                '95e64f73f63f0aec8b915a985d786598',
        ),
    );
});

test('HMAC-SHA512 - 7', () => {
    expect(
        HMAC_SHA512(
            hexToUint8Array('aa'.repeat(131)),
            'This is a test using a larger than block-size key and a larger ' +
                'than block-size data. The key needs to be hashed before ' +
                'being used by the HMAC algorithm.',
        ),
    ).toEqual(
        hexToUint8Array(
            'e37b6a775dc87dbaa4dfa9f96e5e3ffd' +
                'debd71f8867289865df5a32d20cdc944' +
                'b6022cac3c4982b10d5eeb55c3e4de15' +
                '134676fb6de0446065c97440fa8c6a58',
        ),
    );
});
