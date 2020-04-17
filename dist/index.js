"use strict";
/*


 GEOSearch
 
 Desc:
     Fire up a new GEOSearch
     Load up some data
     Do a search for all devices, sort near to far


    Then:
    Do a search closest device

 @jaakidup
*/
Object.defineProperty(exports, "__esModule", { value: true });
var DataLayer_1 = require("./DataLayer");
var GEOSearch_1 = require("./GEOSearch");
var Validator_1 = require("./Validator");
var valid = new Validator_1.Validator();
var search = new GEOSearch_1.GEOSearch(DataLayer_1.GetSearchableData());
// search for all devices, sort near-far
console.log(search.search(53.574148, 17.867897));
// search for closest device
console.log(search.search(53.574148, 17.867897, true));
// Formatter is still a work in progress... 
// finding the right REGEX to pull data!!!
function Formatter(input) {
    var hostname;
    var ip;
    var address;
    var inputSplit = input.split(" ");
    console.log(inputSplit);
    for (var i = 0; i < inputSplit.length; i++) {
        var split = inputSplit[i];
        if (valid.hostname(split)) {
            hostname = split;
            console.log("hostname", hostname);
            delete inputSplit[i];
            continue;
        }
        if (valid.ipv4(split)) {
            ip = split;
            console.log("ip", ip);
            delete inputSplit[i];
            continue;
        }
    }
}
