// DO NOT EDIT THIS FILE DIRECTLY!
// Edits will be overwritten on build.
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip_search_query.wings)
// and run the following command:
// plz build //src/wings/...

package trip

import (
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

// TripsSearchQuery - Search query for trips
type TripsSearchQuery struct {
	Cities []wings.City `json:"cities"`
	Length int          `json:"length"`
	Query  string       `json:"query"`
}

// TripsSearchQuerys - An array of TripsSearchQuery
type TripsSearchQuerys []TripsSearchQuery