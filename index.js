var server = require('diet')
var fs = require('fs')
var mime = require('mime')
var path = require('path')

var websoc = require('./websockets-server');
var app = server()
app.listen('http://localhost:8000')

var fileName = require("diet-static")({
  path: app.path + "/app/"
})

app.view("file", fileName)

app.error(function($) {
  $.end($.statusCode + "\n" + $.statusMessage + "\n" + $.fail.error.message)
})

app.get("/", function($) {
  $.redirect("index.html")
})

app.missing(function($) {
  $.header("Content-Type", "text/html")
  $.status("404")
  fs.readFile(__dirname + "/app/error.html", function(error, content) {
    if (error) throw error;
    $.end(content.toString())
  })

})
