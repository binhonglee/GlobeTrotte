package user

import (
	"testing"

	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

var user UserObj

func TestNewUser(t *testing.T) {
	failCondition := -1
	newUser := wings.NewUser{
		Name:     "DummyUser",
		Username: "usertestdummyuser",
		Email:    "user_test@testuser.globetrotte.com",
		Password: "shouldReplaceThisWithRand",
	}
	res := NewUser(newUser)
	user = res.User

	if user.ID == failCondition {
		t.Errorf("NewUser(), unable to add new user. ")
	}

	res = NewUser(newUser)
	duplicateEmail := res.User
	if res.Error != wings.EmailAlreadyExists {
		t.Errorf("NewUser(), when attempting to add new acount with email that already exist should throw EmailAlreadyExists error.")
	}
	if !same(duplicateEmail.Details, DummyUserObj().Details) {
		t.Errorf("NewUser(), when attempting to add new acount with email that already exist, it should fail.")
	}
}

func TestGetUser(t *testing.T) {
	retrievedUser := GetUserObj(user.ID, user.ID)

	if !same(retrievedUser.Details, user.Details) {
		t.Errorf(
			"GetUserObj(), retrieved user is different from previously added user.",
		)
	}

	retrievedUser = GetUserObj(-10, user.ID)
	if !same(retrievedUser.Details, DummyUserObj().Details) {
		t.Errorf(
			"GetUserObj(), retrieved user expected to be dummy user but its not.",
		)
	}
}

func TestUpdateUser(t *testing.T) {
	user.Details.Name = "user_test user"
	user.Details.Bio = "Hi, this is a test user. If you can see this, someone is testing in prod."
	updatedUser := UpdateUserObj(user.Details, user.ID)

	if !same(updatedUser.Details, user.Details) {
		t.Errorf(
			"UpdateUserObj(), updated user is different than expected.",
		)
	}

	user = updatedUser

	updatedUser = UpdateUserObj(user.Details, -10)
	if !same(updatedUser.Details, DummyUserObj().Details) {
		t.Errorf(
			"UpdateUserObj(), users should not be allowed to update info of other users.",
		)
	}
}

func TestDeleteUser(t *testing.T) {
	if DeleteUserObj(user.Details, -10) {
		t.Errorf(
			"DeleteUserObj(), deleting user by non-owner should not be allowed.",
		)
	}

	anotherUser := user
	anotherUser.Details.Bio = "mutated user bio"
	anotherUser.Details.Name = "mutated user name"
	if DeleteUserObj(anotherUser.Details, user.ID) {
		t.Errorf(
			"DeleteUserObj(), user deletion should be blocked if attached detail is different.",
		)
	}

	if !DeleteUserObj(user.Details, user.ID) {
		t.Errorf("DeleteUserObj(), unable to delete user.")
	}

	id := GetUserObj(user.ID, user.ID).ID
	if id > 0 {
		t.Errorf("DeleteUserObj(), deleted user still exist in database.")
	}
}
