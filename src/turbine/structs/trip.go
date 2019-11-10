/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/trip.struct.wings
 */

package structs

import (
    city "github.com/binhonglee/GlobeTrotte/src/turbine/city"
    "time"
)

// Trip - All information of a single trip.
type Trip struct {
    ID             int            `json:"id"`
    UserID         int            `json:"user_id"`
    Name           string         `json:"name"`
    Cities         []city.City    `json:"cities"`
    Days           []Day          `json:"days"`
    Description    string         `json:"description"`
    TimeCreated    time.Time      `json:"time_created"`
    LastUpdated    time.Time      `json:"last_updated"`
}

// GetID (istruct) - Returns the trip ID.
func (trip Trip) GetID() int {
    return trip.ID
}

// SetID (istruct) - Sets the trip ID.
func (trip *Trip) SetID(id int) {
    trip.ID = id
}

// Trips - An array of Trip
type Trips []Trip
