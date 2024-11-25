import {formatRut, validateRut, getBodyRut, calculateVerifierDigit} from "./utils/rut.utils";

console.log("Rut Util Library");

console.log("Format Rut: ", formatRut("11111111", { full: true }));

console.log("Validate Rut: ", validateRut("111111111"));

console.log("Get body Rut: ", getBodyRut("11.111.111-1", {dots: true}));

console.log("Calculate Verifier Digit: ", calculateVerifierDigit("11111111"));

