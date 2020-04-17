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

import { distance } from "./CalculateDistance"
import { Searchable } from "./Interfaces";


export class GEOSearch {
    constructor(public searchable: Searchable[]) {
        this.searchable = searchable
    }


    // Search according to lat and lon,
    // return a distance sorted array of items or Error if nothing is found
    search(lat: number, lon: number, closestOnly: boolean = false): Searchable[] | Searchable | Error {
        let found = this.searchable.find((item) => {
            if (this.lat(item.geo) == lat && this.lon(item.geo)) {
                return item
            }
        })
        if (!found) {
            return new Error("Coordinates supplied didn't find any matching results.")
        }

        this.calculateDistances(lat, lon)
        this.sortAccordingToDistance()

        if (closestOnly) {
            return this.searchable[1]
        }
        return this.searchable
    }

    // calculate distances from lat and lon
    private calculateDistances(lat: number, lon: number) {
        this.searchable.forEach((item) => {
            item.distance = distance(lat, lon, this.lat(item.geo), this.lon(item.geo))
        })
    }

    // sort the searchable set according to distance from search lat and lon
    private sortAccordingToDistance() {
        this.searchable.sort((a, b) => {
            if (a.distance! < b.distance!) {
                return -1
            } else {
                return 1
            }
        })
    }

    // extract the latitude from the geo string
    private lat(input: string): number {
        return +input.split(",")[0]
    }
    // extract the longitude from the geo string
    private lon(input: string): number {
        return +input.split(",")[1]
    }
}




