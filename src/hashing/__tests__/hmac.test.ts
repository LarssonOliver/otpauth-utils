/**
 * Test vectors are from
 * [rfc2202]{@link https://datatracker.ietf.org/doc/html/rfc2202} and
 * [rfc4231]{@link https://datatracker.ietf.org/doc/html/rfc4231}.
 */

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
    // expect();
});
