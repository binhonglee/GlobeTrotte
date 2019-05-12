/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/new_user.struct
 */

package structs

type NewUser struct {
    Id          int       `json:"id"`
    Name        string    `json:"name"`
    Email       string    `json:"email"`
    Password    string    `json:"password"`
}

func (newUser NewUser) GetID() int {
    return newUser.Id
}

func (newUser *NewUser) SetID(id int) {
    newUser.Id = id
}

type NewUsers []NewUser
