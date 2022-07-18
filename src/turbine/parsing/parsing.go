package parsing

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/dyatlov/go-opengraph/opengraph"
)

func DummyURLData(err ParsedURLError) ParsedURLData {
	return ParsedURLData{
		URL:         "",
		Title:       "",
		Description: "",
		SiteName:    "",
		Error:       err,
	}
}

func Parse(link string) ParsedURLData {
	link = strings.TrimPrefix(link, "http://")
	if !strings.HasPrefix(link, "https://") {
		link = "https://" + link
	}

	_, err := url.ParseRequestURI(link)
	if err != nil {
		logger.Err(logger.Parsing, err, "")
		return DummyURLData(URLInvalid)
	}

	resp, err := http.Get(link)
	if err != nil {
		logger.Err(logger.Parsing, err, "")
		return DummyURLData(URLNotFound)
	}
	og := opengraph.NewOpenGraph()
	err = og.ProcessHTML(resp.Body)
	if err != nil {
		logger.Err(logger.Parsing, err, "")
		return DummyURLData(URLProcessingFailed)
	}

	urlData := ParsedURLData{
		URL:         link,
		Title:       og.Title,
		Description: og.Description,
		SiteName:    og.SiteName,
		Error:       None,
	}

	return urlData
}
