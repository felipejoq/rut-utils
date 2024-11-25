interface FormatOptions {
    dots?: boolean;
    dash?: boolean;
    full?: boolean;
}

type BodyFormatOptions = Pick<FormatOptions, 'dots' | 'full'>;

const isValidRutFormat = (rut: string): boolean => {
    const regex = /^[0-9.]+-?[0-9kK]?$/;
    return regex.test(rut);
}

const cleanRut = (rut: string): string => {
    return rut.replace(/[.-]/g, '');
}

const splitRut = (cleanRut: string): { body: string, verifier: string } => {
    const body = cleanRut.slice(0, -1);
    const verifier = cleanRut.slice(-1);
    return { body, verifier };
}

export const calculateVerifierDigit = (body: string): string => {
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const mod = sum % 11;
    return mod === 0 ? '0' : mod === 1 ? 'k' : (11 - mod).toString();
}

export const validateRut = (rut: string): boolean => {
    if (!isValidRutFormat(rut)) {
        return false;
    }

    const cleanRutStr = cleanRut(rut);
    const { body, verifier } = splitRut(cleanRutStr);

    if (!/^[0-9kK]$/.test(verifier)) {
        return false;
    }

    const calculatedVerifier = calculateVerifierDigit(body);
    return verifier.toLowerCase() === calculatedVerifier.toString();
}

export const formatRut = (rut: string, options: FormatOptions = {}): string => {
    if (!isValidRutFormat(rut)) {
        throw new Error("The RUT must contain only numbers, dots and a dash at the end.");
    }

    const cleanRutStr = cleanRut(rut);
    const { body, verifier } = splitRut(cleanRutStr);

    if (!/^[0-9kK]$/.test(verifier)) {
        throw new Error("The verifier digit must be a number or a 'k'.");
    }

    let formattedBody = body;
    if (options.dots || options.full) {
        formattedBody = body.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    if (options.full) {
        return `${formattedBody}-${verifier}`;
    } else if (options.dash) {
        return `${body}-${verifier}`;
    } else if (options.dots) {
        return formattedBody;
    } else {
        return cleanRutStr;
    }
}

export const getBodyRut = (rut: string, options: BodyFormatOptions = {}): string => {
    if (!isValidRutFormat(rut)) {
        throw new Error("The RUT must contain only numbers, dots and a dash at the end.");
    }

    const cleanRutStr = cleanRut(rut);
    const { body } = splitRut(cleanRutStr);

    if (options.dots || options.full) {
        return body.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    } else {
        return body;
    }
}