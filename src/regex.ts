export const BCRYPT_REGEX = new RegExp(/^\$2[ayb]\$.{56}$/);

export const UUID_REGEX = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
);

export const ALPHANUMERIC = new RegExp(/^[a-zA-Z0-9]+$/);

export const NAMES = new RegExp(/^[a-zA-Z\s-]+$/);
