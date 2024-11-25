import {validateRut, formatRut, getBodyRut, calculateVerifierDigit} from './rut.utils';

describe('isValidRut', () => {
    it('should return true if the given RUT is valid', () => {
        const validRut = '11.111.111-1';
        expect(validateRut(validRut)).toBe(true);
    });

    it('should return false if the given RUT is invalid', () => {
        const invalidRut = '11.111.111-2';
        expect(validateRut(invalidRut)).toBe(false);
    });
});

describe('formatRut', () => {
    it('should return the given RUT formatted full', () => {
        const rut = '111111111';
        const formattedRut = '11.111.111-1';
        expect(formatRut(rut, {full: true})).toBe(formattedRut);
    });

    it('should return the given RUT formatted without the verifier digit', () => {
        const rut = '111111111';
        const formattedRut = '11.111.111';
        expect(formatRut(rut, {dots: true})).toBe(formattedRut);
    });

    it('should return the given RUT formatted without dots', () => {
        const rut = '11111';
        const formattedRut = '1111-1';
        expect(formatRut(rut, {dots: false, dash: true})).toBe(formattedRut);
    });

    it('should return the given RUT formatted without dots and dash', () => {
        const rut = '11111';
        const formattedRut = '11111';
        expect(formatRut(rut, {dots: false, dash: false})).toBe(formattedRut);
    });

    it('should return the given RUT formatted with the given separator', () => {
        const rut = '111111111';
        const formattedRut = '11111111-1';
        expect(formatRut(rut, {dash: true})).toBe(formattedRut);
    });

    it('should throw an error if the given RUT is invalid', () => {
        const rut = '111a111112';
        expect(() => formatRut(rut)).toThrow();
    });

    it('should throw an error if digit not are a number or k', () => {
        const rut = '11111111a';
        expect(() => formatRut(rut)).toThrow();
    });
});

describe('getBodyRut', () => {
    it('should return the body of the given RUT', () => {
        const rut = '11.111.111-1';
        const body = '11111111';
        expect(getBodyRut(rut)).toBe(body);
    });
});

describe('calculateVerifierDigit', () => {
    it('should return the verifier digit of the given RUT body', () => {
        const body = '11111111';
        const verifierDigit = '1';
        expect(calculateVerifierDigit(body)).toBe(verifierDigit);
    });
});