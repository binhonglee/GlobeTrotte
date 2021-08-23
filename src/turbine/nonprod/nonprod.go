// This package is for non-prod caller functions accessing DB directly that
// will be disabled in prod
package nonprod

import (
	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
)

func GetConfirmEmailCode(email string, userid int) string {
	if flags.ProdServer() {
		logger.Failure(logger.NonProd, "Get confirm email code attempted on prod.")
		return ""
	}

	return database.GetEmailConfirmCodeDB(email, userid)
}

func ForceConfirm(id int) bool {
	if flags.ProdServer() {
		logger.Failure(logger.NonProd, "Force confirm email attempted on prod.")
		return false
	}

	return database.ForceConfirm(id)
}
