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


import { GetSearchableData } from "./DataLayer";
import { GEOSearch } from "./GEOSearch"
import { Validator } from "./Validator"
const valid = new Validator()



let search = new GEOSearch(GetSearchableData());
// search for all devices, sort near-far
console.log(search.search(53.574148, 17.867897))
// search for closest device
console.log(search.search(53.574148, 17.867897, true))






// Formatter is still a work in progress... 
// finding the right REGEX to pull data!!!
function Formatter(input: string) {

    let hostname;
    let ip;
    let address;

    let inputSplit = input.split(" ")
    console.log(inputSplit)

    for (let i = 0; i < inputSplit.length; i++) {
        const split = inputSplit[i];

        if(valid.hostname(split)) {
            hostname = split
            console.log("hostname",hostname)
            delete inputSplit[i]
            continue
        }
        if(valid.ipv4(split)) {
            ip = split
            console.log("ip", ip)
            delete inputSplit[i]
            continue
        }
    }
}
