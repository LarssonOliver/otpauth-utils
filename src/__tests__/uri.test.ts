import { KeyUri, newKeyUri, parseKeyUri, stringifyKeyUri } from '../uri';

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
        '&issuer=ACME%20Co&algorithm=SHA256&digits=6&period=45';

    const obj: KeyUri = {
        accountName: 'john.doe@email.com',
        algorithm: 'SHA256',
        counter: undefined,
        digits: 6,
        issuer: 'ACME Co',
        period: 45,
        secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ',
        type: 'totp',
    };

    expect(parseKeyUri(string)).toEqual(obj);
});

test('parse - encoded colon', () => {
    const string =
        'otpauth://totp/ACME%20Co%3Ajohn.doe@email.com' +
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

test('parse - username space', () => {
    const string =
        'otpauth://totp/ACME%20Co:%20%20john.doe@email.com' +
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

test('parse - discard extra query parameters', () => {
    const string = 'otpauth://totp/testuser?secret=ABC&test=gobble';

    expect(() => parseKeyUri(string)).not.toThrowError();
});

test('parse - throw on invalid parametrs', () => {
    const string1 = 'otpauth://totp/testuser?secret=ABC&digits=abc';
    expect(() => parseKeyUri(string1)).toThrowError();

    const string2 = 'otpauth://totp/testuser?secret=ABC&algorithm=abc';
    expect(() => parseKeyUri(string2)).toThrowError();
});

test('stringify - invalid object throws', () => {
    expect(() => stringifyKeyUri({} as KeyUri)).toThrowError();
});

test('stringify - correct encode', () => {
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

    const string =
        'otpauth://totp/ACME%20Co:john.doe@email.com' +
        '?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ' +
        '&issuer=ACME%20Co&algorithm=SHA256&digits=8&period=45';

    expect(stringifyKeyUri(obj)).toEqual(string);
});

test('stringify - encode type', () => {
    const obj = {
        accountName: 'test',
        secret: 'SUPERSECRET',
        type: 'totp',
        counter: 3,
    } as KeyUri;

    expect(stringifyKeyUri(obj)).toContain('otpauth://totp/');

    obj.type = 'hotp';
    expect(stringifyKeyUri(obj)).toContain('otpauth://hotp/');
});

test('stringify - encode account name', () => {
    const obj = {
        accountName: 'test',
        secret: 'SUPERSECRET',
        type: 'totp',
    } as KeyUri;

    expect(stringifyKeyUri(obj)).toContain('otpauth://totp/test?');

    obj.accountName = 'test 2';
    expect(stringifyKeyUri(obj)).toContain('otpauth://totp/test%202?');

    obj.accountName = 'test:2';
    expect(() => stringifyKeyUri(obj)).toThrowError();
});

test('stringify - encode secret', () => {
    const obj = {
        accountName: 'test',
        type: 'totp',
    } as KeyUri;

    expect(() => stringifyKeyUri(obj)).toThrowError();

    obj.secret = 'TEST';
    expect(stringifyKeyUri(obj)).toContain('secret=TEST');
});

test('stringify - encode issuer', () => {
    const obj = {
        accountName: 'test',
        issuer: 'github',
        secret: 'SUPERSECRET',
        type: 'totp',
    } as KeyUri;

    expect(stringifyKeyUri(obj)).toContain('otpauth://totp/github:');
    expect(stringifyKeyUri(obj)).toContain('issuer=github');

    obj.issuer = 'test 2';
    expect(stringifyKeyUri(obj)).toContain('otpauth://totp/test%202:');
    expect(stringifyKeyUri(obj)).toContain('issuer=test%202');

    obj.issuer = 'test:2';
    expect(() => stringifyKeyUri(obj)).toThrowError();
});

test('stringify - encode algorithm', () => {
    const obj = {
        accountName: 'test',
        secret: 'SUPERSECRET',
        type: 'totp',
        algorithm: 'SHA1',
    } as KeyUri;

    expect(stringifyKeyUri(obj)).not.toContain('algorithm=');

    obj.algorithm = 'SHA256';
    expect(stringifyKeyUri(obj)).toContain('algorithm=SHA256');

    obj.accountName = 'test:2';
    expect(() => stringifyKeyUri(obj)).toThrowError();
});

test('stringify - encode digits', () => {
    const obj = {
        accountName: 'test',
        secret: 'SUPERSECRET',
        type: 'totp',
    } as KeyUri;

    expect(stringifyKeyUri(obj)).not.toContain('digits=');

    obj.digits = 6;
    expect(stringifyKeyUri(obj)).not.toContain('digits=');

    obj.digits = 8;
    expect(stringifyKeyUri(obj)).toContain('digits=8');
});

test('stringify - encode counter', () => {
    const obj = {
        accountName: 'test',
        secret: 'SUPERSECRET',
        type: 'hotp',
    } as KeyUri;

    expect(() => stringifyKeyUri(obj)).toThrowError();

    obj.counter = 50;

    expect(stringifyKeyUri(obj)).toContain('counter=50');

    obj.counter = -6;
    expect(stringifyKeyUri(obj)).toContain('counter=-6');

    obj.type = 'totp';
    expect(stringifyKeyUri(obj)).not.toContain('counter=-6');
});

test('stringify - encode period', () => {
    const obj = {
        accountName: 'test',
        secret: 'SUPERSECRET',
        type: 'hotp',
        counter: 2,
        period: 20,
    } as KeyUri;

    expect(stringifyKeyUri(obj)).not.toContain('period=20');

    obj.type = 'totp';
    expect(stringifyKeyUri(obj)).toContain('period=20');

    obj.period = 30;
    expect(stringifyKeyUri(obj)).not.toContain('period=30');

    obj.period = undefined;
    expect(stringifyKeyUri(obj)).not.toContain('period=30');

    obj.period = -1;
    expect(() => stringifyKeyUri(obj)).toThrowError();

    obj.period = 0;
    expect(() => stringifyKeyUri(obj)).toThrowError();
});
