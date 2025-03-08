package agent

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/trip"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

// AgentRequest - Expected requent format from client
type AgentRequest struct {
	City  wings.ParsedCity `json:"city"`
	Query string           `json:"query"`
}

// AgentResponse - Expected response format from AI Agent
type AgentResponse struct {
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Days        []AgentResponseDay `json:"days"`
}

// AgentResponseDay - Details of a day
type AgentResponseDay struct {
	Places []AgentResponsePlace `json:"places"`
}

// AgentResponsePlace - Details of a place
type AgentResponsePlace struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	URL         string `json:"url"`
}

func GetAgentResult(query AgentRequest) wings.TripBasic {
	url := "http://localhost:8000"

	reqQuery, err := json.Marshal(query.Query + " at " + query.City.Display + ", " + query.City.Iso2)
	if err != nil {
		logger.Err(logger.Agent, err, "")
		return trip.DummyTripObj().Details
	}

	var res *http.Response
	res, err = http.Post(url, "application/json", bytes.NewReader(reqQuery))
	if err != nil {
		logger.Err(logger.Agent, err, "")
		return trip.DummyTripObj().Details
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		logger.Failure(logger.Agent, "Response status not OK")
		return trip.DummyTripObj().Details
	}

	body, err := io.ReadAll(
		io.LimitReader(res.Body, 1048576),
	)
	logger.Err(logger.Router, err, "")
	logger.Err(logger.Router, res.Body.Close(), "")

	var agentResponse AgentResponse
	if err := json.Unmarshal(body, &agentResponse); err != nil {
		logger.Err(
			logger.Router,
			err,
			"",
		)
		return trip.DummyTripObj().Details
	}

	var days = []wings.Day{}
	for index, day := range agentResponse.Days {
		var places = []wings.Place{}
		for _, place := range day.Places {
			places = append(places, wings.Place{
				Label:       place.Name,
				URL:         place.URL,
				Description: place.Description,
			})
		}

		days = append(days, wings.Day{
			DayOf:  index + 1,
			Places: places,
		})
	}

	return wings.TripBasic{
		Name:        agentResponse.Name,
		Description: agentResponse.Description,
		Cities:      []wings.ParsedCity{query.City},
		Private:     true,
		Days:        days,
		SharedWith:  []wings.UserAccessLevel{},
		Photos:      []int{},
	}
}
