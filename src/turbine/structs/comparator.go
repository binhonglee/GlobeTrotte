package structs

import (
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

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
