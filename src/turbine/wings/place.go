// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/place.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// Place - One of many location for a Day (in a Trip).
type Place struct {
	ID             int       `json:"id"`
	Label          string    `json:"label"`
	URL            string    `json:"url"`
	Description    string    `json:"description"`
}

// GetID (istruct) - Returns the place ID.
func (place Place) GetID() int {
	return place.ID
}

// SetID (istruct) - Sets the place ID.
func (place *Place) SetID(id int) {
	place.ID = id
}

// Places - An array of Place
type Places []Place
