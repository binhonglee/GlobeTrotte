// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip_basic.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// TripBasic - Only core information of a trip.
type TripBasic struct {
	ID          int               `json:"id"`
	Name        string            `json:"name"`
	Cities      []City            `json:"cities"`
	Days        []Day             `json:"days"`
	Description string            `json:"description"`
	Private     bool              `json:"private"`
	SharedWith  []UserAccessLevel `json:"shared_with"`
}

// GetID (istruct) - Returns the trip ID.
func (trip TripBasic) GetID() int {
	return trip.ID
}

// SetID (istruct) - Sets the trip ID.
func (trip *TripBasic) SetID(id int) {
	trip.ID = id
}

// TripBasics - An array of TripBasic
type TripBasics []TripBasic
