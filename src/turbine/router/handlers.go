package router

import (
    "encoding/json"
    "fmt"
    "io"
    "io/ioutil"
    "net/http"
    "strconv"
    istructs "turbine/structs/istructs"

    "github.com/gorilla/mux"
)

func welcome(res http.ResponseWriter, req *http.Request) {
    fmt.Fprint(res, "Hello World?")
}

func passwd(res http.ResponseWriter, req *http.Request) {
    fmt.Fprint(res, "hunter2")
    response(&res, http.StatusOK)
}

func response(res *http.ResponseWriter, status int) {
    fmt.Println(status)
    (*res).Header().Set("Content-Type", "application/json; charset=UTF-8")
    (*res).WriteHeader(status)
}

func allowCORS(res *http.ResponseWriter) {
    (*res).Header().Set("Access-Control-Allow-Origin", "*")
}

func unpackJSON(res *http.ResponseWriter, req *http.Request, objType interface{}) {
    body, err := ioutil.ReadAll(io.LimitReader(req.Body, 1048576))
    if err != nil {
        fmt.Println(err)
    }

    if err := req.Body.Close(); err != nil {
        fmt.Println(err)
    }

    if err := json.Unmarshal(body, objType); err != nil {
        response(res, http.StatusUnprocessableEntity)
        if err := json.NewEncoder(*res).Encode(err); err != nil {
            fmt.Println(err)
        }
    }
}

func addItem(res *http.ResponseWriter, req *http.Request, addFunc func(istructs.IStructs) int, item istructs.IStructs) {
    if newID := addFunc(item); newID != -1 {
        item.SetID(newID)
        allowCORS(res)
        response(res, http.StatusCreated)
        json.NewEncoder(*res).Encode(item)
    } else {
        response(res, http.StatusNotAcceptable)
    }
}

func getItem(res *http.ResponseWriter, req *http.Request, getFunc func(int) istructs.IStructs) {
    vars := mux.Vars(req)
    var id int
    var error error

    if id, error = strconv.Atoi(vars["id"]); error != nil {
        panic(error)
    }
    allowCORS(res)

    item := getFunc(id)
    if item.GetID() > 0 {
        response(res, http.StatusOK)
        fmt.Println(item)
        json.NewEncoder(*res).Encode(item)
    } else {
        response(res, http.StatusNotFound)
    }
}

func updateItem(res *http.ResponseWriter, req *http.Request, updateFunc func(istructs.IStructs) bool, getFunc func(int) istructs.IStructs, item istructs.IStructs) {
    if id := getFunc(item.GetID()); id.GetID() == -1 {
        response(res, http.StatusNotFound)
        return
    }

    if updated := updateFunc(item); updated {
        allowCORS(res)
        response(res, http.StatusAccepted)
        json.NewEncoder(*res).Encode(true)
    } else {
        response(res, http.StatusNotAcceptable)
    }
}

func deleteItem(res *http.ResponseWriter, req *http.Request, getFunc func(int) istructs.IStructs, deleteFunc func(istructs.IStructs) bool) {
    vars := mux.Vars(req)
    var id int
    var error error

    if id, error = strconv.Atoi(vars["id"]); error != nil {
        panic(error)
    }

    inf := getFunc(id)

    success := deleteFunc(inf)
    if success {
        response(res, http.StatusOK)
        json.NewEncoder(*res).Encode(true)
    } else {
        response(res, http.StatusNotFound)
    }
}
