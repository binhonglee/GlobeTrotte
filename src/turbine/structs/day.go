/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/day.struct.wings
 */

package structs

// Day - A day of a trip.
type Day struct {
    ID        int        `json:"id"`
    TripID    int        `json:"trip_id"`
    DayOf     int        `json:"day_of"`
    Places    []Place    `json:"places"`
}

// GetID (istruct) - Returns the day ID.
func (day Day) GetID() int {
    return day.ID
}

// SetID (istruct) - Sets the day ID.
func (day *Day) SetID(id int) {
    day.ID = id
}

// Days - An array of Day
type Days []Day
