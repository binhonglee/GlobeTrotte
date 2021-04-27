package trip

import "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

func CompareTripObj(t1 TripObj, t2 TripObj) (bool, []string) {
	return CompareTripBasic(t1.Details, t2.Details)
}

func CompareTripBasic(t1 wings.TripBasic, t2 wings.TripBasic) (bool, []string) {
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
