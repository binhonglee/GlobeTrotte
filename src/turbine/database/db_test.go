package database

import (
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
        if _, err := db.Exec(fmt.Sprintf(checkTable, element)); err != nil {
            t.Log(err)
            t.Errorf("initializeDB(), " + element + " was not initialized.")
        }
    }
}
