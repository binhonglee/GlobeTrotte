package database

import (
	"context"
	"fmt"
	"testing"
)

func TestInit(t *testing.T) {
	checkTable := `
		SELECT EXISTS(
			SELECT 1
			FROM %s
		);`

	for _, element := range tableNames {
		c := getConn()
		if _, err := c.Exec(
			context.Background(),
			fmt.Sprintf(checkTable, element),
		); err != nil {
			t.Log(err)
			t.Errorf("initializeDB(), " + element + " was not initialized.")
		}
	}
}
