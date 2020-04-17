"use strict";
// ======================================== //
//
// Data Layer 
// Fetch and validate Data
// Set: geo.json, data.json
//
// @jaakidup
// ======================================== //
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("./Validator");
var valid = new Validator_1.Validator();
// GetSearchableData
// pull data from various sources
// merge data into Searchable[] objects for GEOSearch 
function GetSearchableData() {
    var searchable = [];
    var geoData = FetchGEOData();
    var deviceData = FetchDeviceData();
    var ipMatches = function (ipaddress) {
        var ipMatch = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
        return ipMatch.test(ipaddress);
    };
    geoData.forEach(function (geo) {
        var foundDevice = deviceData.find(function (device) { return ipMatches(device.meta); });
        var searchableItem = { geo: geo.geo, payload: foundDevice };
        searchable.push(searchableItem);
    });
    return searchable;
}
exports.GetSearchableData = GetSearchableData;
// Fetch and returns validated GEO data
function FetchGEOData() {
    var geo = require("../geo.json");
    return ValidateGEOData(geo);
}
exports.FetchGEOData = FetchGEOData;
// Fetch and returns validated Device data
function FetchDeviceData() {
    var data = require("../data.json");
    return ValidateDeviceData(data);
}
exports.FetchDeviceData = FetchDeviceData;
// GetGEOData fetches data, 
// runs basic data validation
// returns valid data
function ValidateGEOData(geo) {
    return geo.filter(function (item) {
        if (valid.ipv4(item.ipv4) && valid.geo(item.geo)) {
            return item;
        }
    });
}
// GetDeviceData fetches data, 
// runs basic data validation
// returns valid data
function ValidateDeviceData(data) {
    return data.filter(function (item) {
        if (valid.active(item.active) && valid.asn(item.asn)) {
            return item;
        }
    });
}
