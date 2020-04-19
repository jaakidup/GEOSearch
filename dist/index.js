"use strict";
// ======================================== //
//
// GEOSearch
// 
// Desc: 
//     Fire up a new GEOSearch
//     Load up some data 
//     Do a search for all devices, sort near to far
//
//
//    Then:
//    Do a search closest device
//
//    Then:
//    Run through a formatter ()
//
// @jaakidup
// ======================================== //
Object.defineProperty(exports, "__esModule", { value: true });
var DataLayer_1 = require("./DataLayer");
var GEOSearch_1 = require("./GEOSearch");
var search = new GEOSearch_1.GEOSearch(DataLayer_1.GetSearchableData());
// search for all devices, sort near-far
console.log("All results");
console.log(search.search(53.574148, 17.867897));
console.log("=======================================================");
// search for closest device
console.log("Single Result");
var singleResult = search.search(53.574148, 17.867897, true);
console.log(singleResult);
console.log("=======================================================");
console.log("Through formatter");
console.log(Formatter(singleResult));
console.log("=======================================================");
// Formatter is still a work in progress... 
// TODO: Make this pluggable into output result and handle single or multiple results
// TODO: Add guards to check input
function Formatter(item) {
    var input = item.payload.meta;
    var hostname;
    var ip;
    var address;
    var hostnameRegex = /([\w]+\.){1,3}[a-z|A-Z]+/g;
    var ipRegex = /\b(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9]))\b/g;
    hostname = hostnameRegex.exec(input)[0];
    input = input.replace(hostname, "");
    ip = ipRegex.exec(input)[0];
    input = input.replace(ipRegex, "");
    address = input;
    return {
        "id": item.payload.id,
        "active": item.payload.active,
        "asn": item.payload.asn,
        "hostname": hostname,
        "ip": ip,
        "geo": item.geo,
        "countrycode": item.payload.countrycode,
        "statecode": item.payload.statecode,
        "address": address,
        "distance": Math.round(item.distance)
    };
}
