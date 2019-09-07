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

    structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"

    "github.com/lib/pq"
)

// NewUserDB - Adding new user to the database.
func NewUserDB(newUser structs.IStructs) int {
    user, ok := newUser.(*structs.NewUser)
    if !ok {
        fmt.Println("User add failed since interface passed in is not a NewUser.")
        return -1
    }

    return addNewUser(*user)
}

// GetUserDB - Retrieve user information from database with ID.
func GetUserDB(id int) structs.IStructs {
    newUser := getUserWithID(id)
    return &newUser
}

// GetUserPasswordHashDB - Retreives and return the password hash of the user account.
func GetUserPasswordHashDB(user structs.NewUser) string {
    return getUserWithEmail(user.Email).Password
}

// UpdateUserDB - Update user information back into the database.
func UpdateUserDB(updatedUser structs.IStructs) bool {
    user, ok := updatedUser.(*structs.User)
    if !ok {
        fmt.Println("User update failed since interface passed in is not a user.")
        return false
    }

    return updateUser(*user)
}

// DeleteUserDB - Delete user from the database.
func DeleteUserDB(existingUser structs.IStructs) bool {
    user, ok := existingUser.(*structs.User)
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

func addNewUser(newUser structs.NewUser) int {
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

func getUserWithID(id int) structs.User {
    var user structs.User
    var sqlInt64 []sql.NullInt64
    sqlStatement := `
    SELECT id, name, email, bio, time_created, trips
    FROM users WHERE id=$1;`
    switch err := db.QueryRow(sqlStatement, id).Scan(
        &user.ID,
        &user.Name,
        &user.Email,
        &user.Bio,
        &user.TimeCreated,
        pq.Array(&sqlInt64),
    ); err {
        case sql.ErrNoRows:
            fmt.Println("User not found.")
            user.ID = -1
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

func getUserWithEmail(hashedPassword string) structs.NewUser {
    var user structs.NewUser
    sqlStatement := `
    SELECT id, password
    FROM users WHERE email=$1;`
    switch err := db.QueryRow(sqlStatement, hashedPassword).Scan(
        &user.ID,
        &user.Password,
    ); err {
        case sql.ErrNoRows:
            fmt.Println("User not found.")
            user.ID = -1
        case nil:
            fmt.Println("User found.")
        default:
            panic(err)
    }

    return user
}

func updateUser(updatedUser structs.User) bool {
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
        updatedUser.ID,
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
