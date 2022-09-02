package user

import "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

func CompareUserObj(u1 UserObj, u2 UserObj) (bool, []string) {
	return CompareUserBasic(u1.Details, u2.Details)
}

func CompareUserBasic(u1 wings.UserBasic, u2 wings.UserBasic) (bool, []string) {
	difference := []string{}
	if u1.ID != u2.ID {
		difference = append(difference, "ID")
	}

	if u1.Name != u2.Name {
		difference = append(difference, "Name")
	}

	return !(len(difference) > 0), difference
}
