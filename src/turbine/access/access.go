package access

import (
	"math/rand"
	"strconv"
	"time"

	"golang.org/x/crypto/bcrypt"
	"zgo.at/zcache"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/email"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/user"
)

var c = zcache.New(35*time.Minute, 60*time.Minute)

func randSeq(n int) string {
	var numbers = []rune("0123456789")
	b := make([]rune, n)
	for i := range b {
		b[i] = numbers[rand.Intn(len(numbers))]
	}
	return string(b)
}

func SendPasswordResetEmail(emailAddress string) bool {
	u := user.GetUserObjWithEmail(emailAddress)
	if u.ID < 1 {
		return false
	}

	// TODO: Add a version for testing that can run locally without email config.
	resetCode := randSeq(8)
	html := `<p>Your reset code is the following:</p>` +
		`<h1>` + resetCode + `</h1><br/>` +
		`This password reset code will only be valid for 30 minutes.` +
		`<br/><br/>` +
		`If you did not request for password reset, please ignore this email.`

	if email.SendEmail("Reset GlobeTrotte Password", html, u.Details.Email) {
		c.Set(strconv.Itoa(u.ID), resetCode, zcache.DefaultExpiration)
		return true
	}

	return false
}

func verifyCode(u user.UserObj, resetCode string) bool {
	if u.ID < 1 {
		return false
	}

	code, ok := c.Get(strconv.Itoa(u.ID))
	return ok && code == resetCode
}

func TriggerResetPassword(rp ResetPassword) bool {
	u := user.GetUserObjWithEmail(rp.Email)
	// verifyCode would also check if the returned user id is valid.
	if !verifyCode(u, rp.Code) {
		return false
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(rp.Password), 14)
	if err != nil {
		logger.Err(
			logger.Router, err,
			"Password hashing failed",
		)
		return false
	}

	if !database.UpdatePassword(u.ID, rp.Email, string(hash)) {
		return false
	}
	c.Delete(strconv.Itoa(u.ID))
	return true
}
