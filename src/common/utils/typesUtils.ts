// tslint:disable-next-line: typedef
const typeofString = {
    number: 'number',
    string: 'string',
    undefined: 'undefined',
    object: 'object',
    function: 'function',
};

/**
 * @returns whether the provided parameter is a JavaScript Array or not.
 */
export function isArray(array: any): boolean {
    if (Array.isArray) {
        return Array.isArray(array);
    }

    if (
        array &&
        typeof array.length === typeofString.number &&
        array.constructor === Array
    ) {
        return true;
    }

    return false;
}

export function isString(str: any): boolean {
    if (typeof str === typeofString.string || str instanceof String) {
        return true;
    }

    return false;
}

export function isStringArray(value: any): boolean {
    return isArray(value) && value.every(isString);
}

export function isObject(obj: any): boolean {
    return (
        typeof obj === typeofString.object &&
        obj !== null &&
        !Array.isArray(obj) &&
        !(obj instanceof RegExp) &&
        !(obj instanceof Date)
    );
}

export function isNumber(obj: any): boolean {
    if (
        (typeof obj === typeofString.number || obj instanceof Number) &&
        !Number.isNaN(obj)
    ) {
        return true;
    }

    return false;
}

export function isBoolean(obj: any): boolean {
    return obj === true || obj === false;
}

export function isUndefined(obj: any): boolean {
    return typeof obj === typeofString.undefined;
}

export function isUndefinedOrNull(obj: any): boolean {
    return isUndefined(obj) || obj === null;
}

export function isEmptyObject(obj: any): boolean {
    const { hasOwnProperty } = Object.prototype;
    if (!isObject(obj)) {
        return false;
    }

    for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}

export function isFunction(obj: any): boolean {
    return typeof obj === typeofString.function;
}

export function areFunctions(...objects: any[]): boolean {
    return objects.length > 0 && objects.every(isFunction);
}

export function getAllPropertyNames(obj: object): string[] {
    let res: string[] = [];
    let proto: any = Object.getPrototypeOf(obj);
    while (Object.prototype !== proto) {
        res = res.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return res;
}

export function getAllMethodNames(obj: object): string[] {
    const methods: string[] = [];
    for (const prop of getAllPropertyNames(obj)) {
        if (typeof (obj as any)[prop] === 'function') {
            methods.push(prop);
        }
    }
    return methods;
}

export function withNullAsUndefined<T>(x: T | null): T | undefined {
    return x === null ? undefined : x;
}

export function withUndefinedAsNull<T>(x: T | undefined): T | null {
    return typeof x === 'undefined' ? null : x;
}

/**
 * Get typeof value, instead of the origin 'typeof' API.
 * Return 'array' while value is an Array.
 */
export function getTypeof<T>(value: T) {
    switch (typeof value) {
        case 'object':
            return isObject(value) ? 'object' : 'array';
        default:
            return typeof value;
    }
}

export function isDate(d: any) {
    return isObject(d) && objectToString(d) === '[object Date]';
}

export function objectToString(o: any) {
    return Object.prototype.toString.call(o);
}

export function isRegExp(re: any) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
}

export function isPrimitive(arg: any) {
    return (
        arg === null ||
        typeof arg === 'boolean' ||
        typeof arg === 'number' ||
        typeof arg === 'string' ||
        typeof arg === 'symbol' ||
        typeof arg === 'undefined'
    );
}

export function isArguments(object: any) {
    return Object.prototype.toString.call(object) === '[object Arguments]';
}
