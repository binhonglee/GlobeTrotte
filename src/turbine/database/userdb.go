/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers.
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
    "database/sql"
    "fmt"
    "strconv"
    "time"
    istructs "turbine/structs/istructs"
    newuser "turbine/structs/newuser"
    user "turbine/structs/user"

    "github.com/lib/pq"
)

// NewUserDB - Adding new user to the database.
func NewUserDB(newUser istructs.IStructs) int {
    user, ok := newUser.(*newuser.NewUser)
    if !ok {
        fmt.Println("User add failed since interface passed in is not a NewUser.")
        return -1
    }

    return addNewUser(*user)
}

// GetUserDB - Retrieve user information from database with ID.
func GetUserDB(id int) istructs.IStructs {
    newUser := getUserWithID(id)
    return &newUser
}

func GetUserPasswordHashDB(user newuser.NewUser) string {
    return getUserWithEmail(user.Email).Password
}

// UpdateUserDB - Update user information back into the database.
func UpdateUserDB(updatedUser istructs.IStructs) bool {
    user, ok := updatedUser.(*user.User)
    if !ok {
        fmt.Println("User update failed since interface passed in is not a user.")
        return false
    }

    return updateUser(*user)
}

// DeleteUserDB - Delete user from the database.
func DeleteUserDB(existingUser istructs.IStructs) bool {
    user, ok := existingUser.(*user.User)
    if !ok {
        fmt.Println("User deletion failed since interface passed in is not a trip.")
        return false
    }

    existingUser = GetUserDB(user.GetID())

    if existingUser.GetID() == -1 {
        return false
    }

    //TODO: More testing to make sure this is the same user

    return deleteUserWithID(existingUser.GetID())
}

func addNewUser(newUser newuser.NewUser) int {
    sqlStatement := `
    INSERT INTO users (name, email, password, bio, time_created)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id`
    id := 0
    err := db.QueryRow(
        sqlStatement,
        newUser.Name,
        newUser.Email,
        newUser.Password,
        "",
        time.Now(),
    ).Scan(&id)
    if err != nil {
        fmt.Println(err)
        return -1
    }
    fmt.Println("New record ID is: ", id)
    return id
}

func getUserWithID(id int) user.User {
    var user user.User
    var sqlInt64 []sql.NullInt64
    sqlStatement := `
    SELECT id, name, email, bio, time_created, trips
    FROM users WHERE id=$1;`
    switch err := db.QueryRow(sqlStatement, id).Scan(
        &user.Id,
        &user.Name,
        &user.Email,
        &user.Bio,
        &user.TimeCreated,
        pq.Array(&sqlInt64),
    ); err {
        case sql.ErrNoRows:
            fmt.Println("User not found.")
            user.Id = -1
        case nil:
            fmt.Println("User found.")
        default:
            panic(err)
    }

    user.Trips = []int{}
    for _, trip := range sqlInt64 {
        if trip.Valid {
            user.Trips = append(user.Trips, int(trip.Int64))
        }
    }

    return user
}

func getUserWithEmail(hashedPassword string) newuser.NewUser {
    var user newuser.NewUser
    sqlStatement := `
    SELECT id, password
    FROM users WHERE email=$1;`
    switch err := db.QueryRow(sqlStatement, hashedPassword).Scan(
        &user.Id,
        &user.Password,
    ); err {
        case sql.ErrNoRows:
            fmt.Println("User not found.")
            user.Id = -1
        case nil:
            fmt.Println("User found.")
        default:
            panic(err)
    }

    return user
}

func updateUser(updatedUser user.User) bool {
    existingUser := GetUserDB(updatedUser.GetID())
    if existingUser.GetID() != updatedUser.GetID() {
        fmt.Println("Existing User is not found. Aborting update.")
        fmt.Println(
            "Given ID is "+strconv.Itoa(updatedUser.GetID()),
            " but found ID is "+strconv.Itoa(existingUser.GetID()),
            " instead.",
        )
        return false
    }

    sqlStatement := `
    UPDATE users
    SET name = $2,
    email = $3,
    bio = $4,
    trips = $5
    WHERE id = $1;`

    _, err := db.Exec(
        sqlStatement,
        updatedUser.Id,
        updatedUser.Name,
        updatedUser.Email,
        updatedUser.Bio,
        pq.Array(updatedUser.Trips),
    )

    if err != nil {
        fmt.Println("Failed to update user.")
        fmt.Println(err)
        return false
    }

    return true
}

func deleteUserWithID(id int) bool {
    sqlStatement := `
    DELETE FROM users
    WHERE id = $1;`
    if _, err := db.Exec(sqlStatement, id); err != nil {
        fmt.Println(err)
        return false
    }
    fmt.Println("User ID ", id, " deleted")
    return true
}
