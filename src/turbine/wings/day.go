// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/day.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// Day - A day of a trip.
type Day struct {
	ID     int     `json:"id"`
	TripID int     `json:"trip_id"`
	DayOf  int     `json:"day_of"`
	Places []Place `json:"places"`
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
