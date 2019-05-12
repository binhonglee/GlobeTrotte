/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/user.struct
 */

package structs

import (
    "time"
)

type User struct {
    Id             int          `json:"id"`
    Name           string       `json:"name"`
    Email          string       `json:"email"`
    Bio            string       `json:"bio"`
    TimeCreated    time.Time    `json:"time_created"`
    Trips          []int        `json:"trips"`
}

func (user User) GetID() int {
    return user.Id
}

func (user *User) SetID(id int) {
    user.Id = id
}

type Users []User
