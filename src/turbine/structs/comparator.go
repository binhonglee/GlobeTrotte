package structs

import (
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func CompareTrips(t1 wings.Trip, t2 wings.Trip) (bool, []string) {
	difference := []string{}
	if t1.ID != t2.ID {
		difference = append(difference, "ID")
	}

	if t1.Name != t2.Name {
		difference = append(difference, "Name")
	}

	if len(t1.Cities) != len(t2.Cities) {
		difference = append(difference, "Cities")
	}

	if t1.Description != t2.Description {
		difference = append(difference, "Description")
	}

	return !(len(difference) > 0), difference
}

func CompareUser(u1 wings.User, u2 wings.User) (bool, []string) {
	difference := []string{}
	if u1.ID != u2.ID {
		difference = append(difference, "ID")
	}

	if u1.Name != u2.Name {
		difference = append(difference, "Name")
	}

	if u1.Email != u2.Email {
		difference = append(difference, "Email")
	}

	return !(len(difference) > 0), difference
}
