package main

import (
	"fmt"
	"strings"
	"html/template"
    "net/http"
    "github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("nightdev"))

type TemplateData struct {
    Usernames []string
}


const SESSION_NAME = "devnight"
var indexView, _ = template.ParseFiles("index.html")

func main() {
	http.Handle("/css", http.FileServer(http.Dir("./static/css")))
    http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
        session, _ := store.Get(r, SESSION_NAME)

		usernames := session.Values["users"]
		if usernames == nil {
			usernames = []string{}
		} else {
			usernames = strings.Split(usernames.(string), ",")
		}

        data := &TemplateData{Usernames: usernames.([]string) }

        indexView.Execute(w, data)
    })
	http.HandleFunc("/save", func (w http.ResponseWriter, r *http.Request) {
		r.ParseForm()
		newUsername := r.Form.Get("name")

		session, _ := store.Get(r, SESSION_NAME)
		usernames := session.Values["users"]
		if usernames == nil {
			usernames = newUsername
		} else {
			usernames = usernames.(string) + "," + newUsername
		}
		session.Values["users"] = usernames

		session.Save(r, w)
		http.Redirect(w, r, "/", 302)
	})
    http.ListenAndServe(":8080", nil)
	fmt.Print("Listening on 8080")
}
