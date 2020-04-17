// ======================================== //
//
// Data Layer 
// Fetch and validate Data
// Set: geo.json, data.json
//
// @jaakidup
// ======================================== //

import {GEO, Device, Searchable} from "./Interfaces"
import  { Validator }  from "./Validator"
const valid = new Validator();


// GetSearchableData
// pull data from various sources
// merge data into Searchable[] objects for GEOSearch 
export function GetSearchableData() {
    let searchable: Searchable[] = []
    let geoData = FetchGEOData();
    let deviceData = FetchDeviceData();

    let ipMatches = (ipaddress: string) : boolean =>  {
        let ipMatch = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
        return ipMatch.test(ipaddress)
    }
    
    geoData.forEach((geo) => {
        let foundDevice = deviceData.find((device) => ipMatches(device.meta));
        let searchableItem: Searchable = {geo: geo.geo, payload: foundDevice}
        searchable.push(searchableItem)
    });
    return searchable
}

// Fetch and returns validated GEO data
export function FetchGEOData() : GEO[] {
    let geo = require("../geo.json") as GEO[];
    return ValidateGEOData(geo)
}

// Fetch and returns validated Device data
export function FetchDeviceData() : Device[] {
    let data = require("../data.json") as Device[];
    return ValidateDeviceData(data)
}

// GetGEOData fetches data, 
// runs basic data validation
// returns valid data
function ValidateGEOData(geo: GEO[]) : GEO[] {
    return geo.filter((item) => {
        if( valid.ipv4(item.ipv4) && valid.geo(item.geo)) {
            return item
        }
    })
}

// GetDeviceData fetches data, 
// runs basic data validation
// returns valid data
function ValidateDeviceData( data:Device[] ) : Device[] {
    return data.filter((item) => {
        if (valid.active(item.active) && valid.asn(item.asn)) {
            return item
        }
    })
}

