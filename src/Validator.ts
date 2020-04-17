// ======================================== //
//
// Data Validation 
// Set: geo.json, data.json
//
// @jaakidup
// ======================================== //

export class Validator {
    // Checkes for Valid IPAddress
    // "ipv4": "66.207.196.130",
    ipv4(input: string): boolean {
        const matcher = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return matcher.test(input)
    }

    // Checkes for Valid Hostname
    // "ipv4": "ausregistry01.ring.nlnog.net",
    hostname(input: string): boolean {
        const matcher = /[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;
        return matcher.test(input)
    }

    // Validates GEO Coordinates
    // "geo": "43.638090,-79.425509"
    geo(input: string): boolean {
        const matcher = /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/;
        return matcher.test(input)
    }

    // Validates input is 1 or 0 (numerical boolean)
    // "active": 1,
    active(input: number): boolean {
        if (input === 0 || input === 1) {
            return true
        }
        return false
    }

    // Validates that ASN is between than 10 - 1000000
    // "asn": 21949,
    asn(input: number) {
        if (input >= 10 && input <= 1000000) {
            return true
        }
        return false
    }
}
