import { KeyUri, newKeyUri, parseKeyUri } from '../uri';

test('create default KeyUri', () => {
    expect(newKeyUri()).toBeDefined();
});

test('parse - invalid string throws', () => {
    expect(() => parseKeyUri('gobble')).toThrowError();
});

test('parse - hotp', () => {
    const string =
        'otpauth://hotp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example&counter=30';

    const obj: KeyUri = {
        accountName: 'alice@google.com',
        algorithm: 'SHA1',
        counter: 30,
        digits: 6,
        issuer: 'Example',
        period: undefined,
        secret: 'JBSWY3DPEHPK3PXP',
        type: 'hotp',
    };

    expect(parseKeyUri(string)).toEqual(obj);
});

test('parse - hotp requires counter', () => {
    const string =
        'otpauth://hotp/Example:alice@google.com' +
        '?secret=JBSWY3DPEHPK3PXP&issuer=Example';

    expect(() => parseKeyUri(string)).toThrowError();
});

test('parse - totp', () => {
    const string =
        'otpauth://totp/ACME%20Co:john.doe@email.com' +
        '?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ' +
        '&issuer=ACME%20Co&algorithm=SHA256&digits=8&period=45';

    const obj: KeyUri = {
        accountName: 'john.doe@email.com',
        algorithm: 'SHA256',
        counter: undefined,
        digits: 8,
        issuer: 'ACME Co',
        period: 45,
        secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ',
        type: 'totp',
    };

    expect(parseKeyUri(string)).toEqual(obj);
});

test('parse - issuer in label', () => {
    const string =
        'otpauth://totp/john.doe@email.com' +
        '?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ' +
        '&issuer=ACME%20Co&algorithm=SHA256&digits=8&period=45';

    const obj: KeyUri = {
        accountName: 'john.doe@email.com',
        algorithm: 'SHA256',
        counter: undefined,
        digits: 8,
        issuer: 'ACME Co',
        period: 45,
        secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ',
        type: 'totp',
    };

    expect(parseKeyUri(string)).toEqual(obj);
});

test('parse - issuer parameter', () => {
    const string =
        'otpauth://totp/ACME%20Co:john.doe@email.com' +
        '?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ' +
        '&algorithm=SHA256&digits=8&period=45';

    const obj: KeyUri = {
        accountName: 'john.doe@email.com',
        algorithm: 'SHA256',
        counter: undefined,
        digits: 8,
        issuer: 'ACME Co',
        period: 45,
        secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ',
        type: 'totp',
    };

    expect(parseKeyUri(string)).toEqual(obj);
});

test('parse - issuer needs to match', () => {
    const string =
        'otpauth://totp/ACME%20Co:john.doe@email.com' +
        '?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ' +
        '&issuer=ACME%20Cos&algorithm=SHA256&digits=8&period=45';

    expect(() => parseKeyUri(string)).toThrowError();
});

test('parse - secret is required', () => {
    const string =
        'otpauth://totp/ACME%20Co:john.doe@email.com' +
        '?issuer=ACME%20Cos&algorithm=SHA256&digits=8&period=45';

    expect(() => parseKeyUri(string)).toThrowError();
});
