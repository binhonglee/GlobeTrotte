package router

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"

	structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"
)

func TestPasswd(t *testing.T) {
	request, _ := http.NewRequest("GET", api_prefix+"/passwd", nil)

	response := httptest.NewRecorder()
	NewRouter().ServeHTTP(response, request)
	if response.Code != http.StatusOK {
		t.Errorf("/passwd, expected code 200 but received " + strconv.Itoa(response.Code) + " instead.")
		return
	}
}

func addTest(
	path string,
	t *testing.T,
	toAdd structs.IStructs,
	objType interface{},
	unmarshalBody bool,
) {
	res := httptest.NewRecorder()
	data, _ := json.Marshal(toAdd)
	req, _ := http.NewRequest(
		"POST", api_prefix+path, bytes.NewBuffer(data))
	if cookies != nil {
		req.AddCookie(cookies)
	}
	NewRouter().ServeHTTP(res, req)

	if unmarshalBody {
		bodyData, err := io.ReadAll(res.Body)
		if err != nil {
			t.Errorf("Adding failed.")
		}
		objType = json.Unmarshal(bodyData, objType)
	}
}

func get(path string, t *testing.T, expectedCode int) *httptest.ResponseRecorder {
	res := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", api_prefix+path, nil)
	if cookies != nil {
		req.AddCookie(cookies)
	}
	NewRouter().ServeHTTP(res, req)
	if res.Code != expectedCode {
		t.Errorf("getTest(), expected code " +
			strconv.Itoa(expectedCode) + " but received " +
			strconv.Itoa(res.Code) + " instead.")

		return res
	}

	return res
}

func loginTest(
	t *testing.T,
	toAdd structs.IStructs,
	expectedCode int,
) *httptest.ResponseRecorder {
	res := httptest.NewRecorder()
	data, _ := json.Marshal(toAdd)
	req, _ := http.NewRequest(
		"POST",
		api_prefix+"/login",
		bytes.NewBuffer(data),
	)
	NewRouter().ServeHTTP(res, req)
	if len(res.Result().Cookies()) > 0 {
		cookies = res.Result().Cookies()[0]
	}
	return res
}

func getTest(path string, t *testing.T, objType interface{}, expectedCode int) {
	res := get(path, t, expectedCode)

	if expectedCode == http.StatusOK {
		data, err := io.ReadAll(res.Body)
		if err != nil {
			t.Errorf("Adding failed.")
		}
		json.Unmarshal(data, objType)
	}
}

func updateTest(
	path string,
	t *testing.T,
	toAdd structs.IStructs,
	objType interface{},
	expectedCode int,
) {
	res := httptest.NewRecorder()
	data, _ := json.Marshal(toAdd)
	req, _ := http.NewRequest(
		"POST",
		api_prefix+path+strconv.Itoa(toAdd.GetID()),
		bytes.NewBuffer(data),
	)
	if cookies != nil {
		req.AddCookie(cookies)
	}
	NewRouter().ServeHTTP(res, req)
	data, _ = io.ReadAll(res.Body)
	json.Unmarshal(data, objType)

	if res.Code != expectedCode {
		t.Errorf("updateTest(), expected code " +
			strconv.Itoa(expectedCode) + " but received " +
			strconv.Itoa(res.Code) + " instead.")
		return
	}
}

func deleteTest(path string, t *testing.T, toDelete interface{}) bool {
	res := httptest.NewRecorder()
	data, _ := json.Marshal(toDelete)
	req, _ := http.NewRequest("POST", api_prefix+"/del"+path, bytes.NewBuffer(data))
	if cookies != nil {
		req.AddCookie(cookies)
	}
	NewRouter().ServeHTTP(res, req)

	var success bool
	data, _ = io.ReadAll(res.Body)
	json.Unmarshal(data, &success)
	if res.Code != http.StatusOK {
		t.Errorf(
			"deleteTest(), expected code " + strconv.Itoa(http.StatusOK) +
				" but received " + strconv.Itoa(res.Code) + " instead.",
		)
	}
	return success
}
