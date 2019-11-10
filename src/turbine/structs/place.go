/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/place.struct.wings
 */

package structs

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
