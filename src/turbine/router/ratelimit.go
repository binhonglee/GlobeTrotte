package router

import (
	"encoding/json"
	"net/http"
	"strconv"
	"sync"
	"time"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"

	"golang.org/x/time/rate"
)

type visitor struct {
	limiter *rate.Limiter
	created time.Time
	latest  time.Time
	key     string
}

var visitors = make(map[string]*visitor)
var visitorsMutex sync.Mutex
var whitelistURIs = map[string]bool{"/ratelimit": true}

func init() {
	go func() {
		for {
			visitorsMutex.Lock()
			for key, v := range visitors {
				if time.Since(v.latest) >= 6*time.Minute {
					delete(visitors, key)
				} else if time.Since(v.created) >= 30*time.Minute {
					// Not sure what to do with this yet. Just logging this for now.
					logger.Failure(
						logger.Router,
						"Key has been consistently active for 30 mins: "+key,
					)
				}
			}
			visitorsMutex.Unlock()
			time.Sleep(3 * time.Minute)
		}
	}()
}

func getAPIRateLimitStatus(res http.ResponseWriter, req *http.Request) {
	userid := "uid" + strconv.Itoa(getUserID(req))
	allowCORS(&res)
	json.NewEncoder(res).Encode(
		getRateLimitStatus(
			req.Header.Get("X-Real-IP"),
		) || getRateLimitStatus(userid),
	)
}

func getRateLimitStatus(key string) bool {
	v, exists := visitors[key]
	if !exists {
		return false
	}
	return !v.limiter.Allow()
}

func isRateLimited(key string) bool {
	// Ignore uid rate limiting if user is not logged in
	if key == "uid-1" {
		return false
	}

	visitorsMutex.Lock()
	v, exists := visitors[key]
	if !exists {
		v = &visitor{rate.NewLimiter(1, 50), time.Now(), time.Now(), key}
		visitors[key] = v
	} else {
		v.latest = time.Now()
	}
	visitorsMutex.Unlock()

	if !v.limiter.Allow() {
		logger.Print(logger.Router, "Rate limit reached for "+key)
		return true
	}

	return false
}

func limit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if _, exists := whitelistURIs[req.RequestURI]; exists {
			next.ServeHTTP(res, req)
			return
		}

		ip := req.Header.Get("X-Real-IP")
		if ip == "" {
			logger.Failure(logger.Router, "Invalid IP.")
			allowCORS(&res)
			json.NewEncoder(res).Encode("ratelimited")
			return
		}

		userid := "uid" + strconv.Itoa(getUserID(req))

		if isRateLimited(ip) || isRateLimited(userid) {
			allowCORS(&res)
			json.NewEncoder(res).Encode("ratelimited")
			return
		}

		next.ServeHTTP(res, req)
	})
}
