"use strict";
// ======================================== //
//
// GEOSearch  
//  Search a set of GEO objects, type Searchable
// 
// Usage:
// 
//  let geosearch = new GEOSearch(GetSearchableData());
//  console.log( geosearch.search(53.574148, 17.867897) )
// 
//
//
//
//
// @jaakidup
// ======================================== //
Object.defineProperty(exports, "__esModule", { value: true });
var CalculateDistance_1 = require("./CalculateDistance");
var GEOSearch = /** @class */ (function () {
    function GEOSearch(searchable) {
        this.searchable = searchable;
        this.searchable = searchable;
    }
    // Search according to lat and lon,
    // return a distance sorted array of items or Error if nothing is found
    GEOSearch.prototype.search = function (lat, lon, closestOnly) {
        var _this = this;
        if (closestOnly === void 0) { closestOnly = false; }
        var found = this.searchable.find(function (item) {
            if (_this.lat(item.geo) == lat && _this.lon(item.geo)) {
                return item;
            }
        });
        if (!found) {
            return new Error("Coordinates supplied didn't find any matching results.");
        }
        this.calculateDistances(lat, lon);
        this.sortAccordingToDistance();
        if (closestOnly) {
            return this.searchable[1];
        }
        return this.searchable;
    };
    // calculate distances from lat and lon
    GEOSearch.prototype.calculateDistances = function (lat, lon) {
        var _this = this;
        this.searchable.forEach(function (item) {
            item.distance = CalculateDistance_1.distance(lat, lon, _this.lat(item.geo), _this.lon(item.geo));
        });
    };
    // sort the searchable set according to distance from search lat and lon
    GEOSearch.prototype.sortAccordingToDistance = function () {
        this.searchable.sort(function (a, b) {
            if (a.distance < b.distance) {
                return -1;
            }
            else {
                return 1;
            }
        });
    };
    // extract the latitude from the geo string
    GEOSearch.prototype.lat = function (input) {
        return +input.split(",")[0];
    };
    // extract the longitude from the geo string
    GEOSearch.prototype.lon = function (input) {
        return +input.split(",")[1];
    };
    return GEOSearch;
}());
exports.GEOSearch = GEOSearch;
