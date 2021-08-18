import { base32encode, base32decode } from '../base32';

test('encode - empty array', () => {
    expect(base32encode(new Uint8Array())).toEqual('');
});

test('encode - encode 1 byte', () => {
    const arr = new Uint8Array([1]);
    expect(base32encode(arr)).toEqual('AE======');
});

test('encode - encode 2 bytes', () => {
    const arr = new Uint8Array([1, 1]);
    expect(base32encode(arr)).toEqual('AEAQ====');
});

test('encode - encode 3 bytes', () => {
    const arr = new Uint8Array([1, 1, 1]);
    expect(base32encode(arr)).toEqual('AEAQC===');
});

test('encode - encode 4 bytes', () => {
    const arr = new Uint8Array([1, 1, 1, 1]);
    expect(base32encode(arr)).toEqual('AEAQCAI=');
});

test('encode - encode 5 bytes', () => {
    const arr = new Uint8Array([1, 1, 1, 1, 1]);
    expect(base32encode(arr)).toEqual('AEAQCAIB');
});

test('encode - encode no padding', () => {
    const arr = new Uint8Array([1]);
    expect(base32encode(arr, false)).toEqual('AE');
});

test('encode - encode 10 bytes', () => {
    const arr = new Uint8Array([1, 1, 1, 1, 1, 2, 2, 2, 2, 2]);
    expect(base32encode(arr)).toEqual('AEAQCAIBAIBAEAQC');
});

test('decode - empty string', () => {
    expect(base32decode('')).toEqual(new Uint8Array());
});

test('decode - decode 1 byte', () => {
    const arr = new Uint8Array([1]);
    expect(base32decode('AE======')).toEqual(arr);
});

test('decode - decode 2 bytes', () => {
    const arr = new Uint8Array([1, 1]);
    expect(base32decode('AEAQ====')).toEqual(arr);
});

test('decode - decode 3 bytes', () => {
    const arr = new Uint8Array([1, 1, 1]);
    expect(base32decode('AEAQC===')).toEqual(arr);
});

test('decode - decode 4 bytes', () => {
    const arr = new Uint8Array([1, 1, 1, 1]);
    expect(base32decode('AEAQCAI=')).toEqual(arr);
});

test('decode - decode 5 bytes', () => {
    const arr = new Uint8Array([1, 1, 1, 1, 1]);
    expect(base32decode('AEAQCAIB')).toEqual(arr);
});

test('decode - decode no padding', () => {
    const arr = new Uint8Array([1]);
    expect(base32decode('AE')).toEqual(arr);
});

test('decode - decode 10 bytes', () => {
    const arr = new Uint8Array([1, 1, 1, 1, 1, 2, 2, 2, 2, 2]);
    expect(base32decode('AEAQCAIBAIBAEAQC')).toEqual(arr);
});
