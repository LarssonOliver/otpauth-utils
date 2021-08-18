/**
 * Representation of a key uri.
 * As specified here: {@link https://github.com/google/google-authenticator/wiki/Key-Uri-Format}.
 */
export interface KeyUri {
    type: 'hotp' | 'totp';
    accountName: string;
    secret: string;
    issuer: string | undefined;
    algorithm: 'SHA1' | 'SHA256' | 'SHA512' | undefined;
    digits: 6 | 8 | undefined;
    counter: number | undefined;
    period: number | undefined;
}

/**
 * Create a new {@link KeyUri} object with default values.
 * @returns a new {@link KeyUri} object.
 */
export function newKeyUri(): KeyUri {
    return {
        type: 'totp',
        accountName: '',
        secret: '',
    } as KeyUri;
}

const UriRegEx =
    '^otpauth://(?<type>[ht]otp)/(?:(?<issuer>[^:]*):)' +
    '?[ ]*(?<account>[^:?]*)?(?:&?[^=&]+=[^=&]+)+$';

/**
 * Read and parse an OTPAuth URI.
 * @param uri the OTPAuth URI to parse.
 * @returns a {@link KeyUri} object containing parsed data.
 */
export function parseKeyUri(uri: string): KeyUri {
    const match = decodeURIComponent(uri).match(UriRegEx);

    if (
        match === null ||
        match.groups === undefined ||
        match.input === undefined
    )
        throw new Error('invalid input uri format');

    const res = newKeyUri();

    // Parse query.
    const query = match.input.split('?')[1];
    query.split('&').forEach((param) => {
        const [key, value] = param.split('=');

        switch (key) {
            case 'secret':
                res.secret = value;
                break;

            case 'issuer':
                res.issuer = value;
                break;

            case 'algorithm':
                if (
                    value === 'SHA1' ||
                    value === 'SHA256' ||
                    value === 'SHA512'
                )
                    res.algorithm = value;
                else throw new Error('algorithm invalid');
                break;

            case 'digits':
                if (+value === 6) res.digits = 6;
                else if (+value === 8) res.digits = 8;
                else throw new Error('digits invalid');
                break;

            case 'counter':
                res.counter = +value;
                break;

            case 'period':
                res.period = +value;
                break;

            default:
                break;
        }
    });

    if (res.secret.length === 0) throw new Error('secret is required');

    res.type = match.groups['type'] as 'hotp' | 'totp';
    if (res.type === 'hotp' && res.counter === undefined)
        throw new Error('counter cannot be undefined when type is "hotp"');

    if (
        res.issuer !== undefined &&
        match.groups['issuer'] !== undefined &&
        res.issuer !== match.groups['issuer']
    )
        throw new Error('issuer mismatch');
    else if (match.groups['issuer'] !== undefined)
        res.issuer = match.groups['issuer'];

    res.accountName = match.groups['account'];

    if (res.algorithm === undefined) res.algorithm = 'SHA1';
    if (res.digits === undefined) res.digits = 6;
    if (res.type === 'totp' && res.period === undefined) res.period = 30;

    return res;
}

/**
 * Will convert a {@link KeyUri} object into a URI conforming to
 * {@link https://github.com/google/google-authenticator/wiki/Key-Uri-Format}.
 * @param obj the {@link KeyUri} object to stringify.
 */
export function stringifyKeyUri(obj: KeyUri): string {
    let res = `otpauth://${obj.type}/`;

    if (obj.issuer) {
        if (obj.issuer.indexOf(':') !== -1)
            throw new Error('issuer cannot contain ":"');

        res += `${obj.issuer}:`;
    }

    if (!obj.accountName) throw new Error('accountName is required');
    else if (obj.accountName.indexOf(':') !== -1)
        throw new Error('accountName cannot contain ":"');
    res += `${obj.accountName}?`;

    if (!obj.secret) throw new Error('secret is required');
    res += `secret=${obj.secret}`;

    if (obj.issuer) res += `&issuer=${obj.issuer}`;
    if (obj.algorithm && obj.algorithm !== 'SHA1')
        res += `&algorithm=${obj.algorithm}`;
    if (obj.digits && obj.digits !== 6) res += `&digits=${obj.digits}`;

    if (obj.type === 'hotp') {
        if (!obj.counter)
            throw new Error('counter is required when type is hotp');
        res += `&counter=${obj.counter}`;
    } else if (obj.period !== undefined) {
        if (obj.period < 1) throw new Error('period cannot be < 1');
        else if (obj.period !== 30) res += `&period=${obj.period}`;
    }

    return encodeURI(res);
}
