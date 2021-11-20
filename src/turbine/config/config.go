package config

import (
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"

	kdl "github.com/binhonglee/kdlgo"
)

const configFile = "config/config.kdl"

var config map[string]kdl.KDLValue

func init() {
	config = make(map[string]kdl.KDLValue)
	objs, err := kdl.ParseFile(configFile)
	logger.PanicErr(logger.Config, err, "")

	for _, obj := range objs.GetValue().Objects {
		config[obj.GetKey()] = obj.GetValue()
	}
}

func GetConfig(key string) kdl.KDLValue {
	return config[key]
}

func GetConfigStringMap(key string) map[string]string {
	ret := make(map[string]string)
	objs, success := config[key]

	if !success {
		return ret
	}

	for _, obj := range objs.Objects {
		s, err := obj.GetValue().ToString()
		logger.PanicErr(logger.Database, err, "")
		ret[obj.GetKey()] = s
	}

	return ret
}
