// ======================================== //
//
// Interface definitions 
// Set: geo.json, data.json
//
// @jaakidup
// ======================================== //

export interface Searchable {
    geo: string,
    distance?:number
    payload: any
}

export interface Device {
    active: number,
    asn: number,
    countrycode: string,
    id: number,
    statecode: null | string,
    meta: string
}

export interface GEO {
    ipv4: string,
    geo: string,
    distance?:number
}

