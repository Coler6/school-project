var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
    console.log("home");
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + "\\home.html")
});

app.get('/add', function(req, res) {
    console.log("add");
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + "\\add.html")
});
app.get('/about', function(req, res) {
    console.log("about");
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + "\\about.html")
});
app.post('/send_question', function(req, res) {
    console.log(req.body);
    const body = req.body;
    const data = body['json'];
    const question = body['push'];
    console.log("New Question:\nBy: " + req.socket.remoteAddress + "\nTitle: " + question["title"] + "\nDescription: " + question["description"] + "\nUser: " + question["user"])
    fs.writeFile('data/questions.json', JSON.stringify(data), 'utf8', function (err) {
        if (err) throw err;
    });
    res.redirect("/");
});
app.post('/send_comment', function(req, res) {
    const body = req.body;
    console.log(body);
    const data = body['json'];
    const comment = body['push'];
    const question = body['question'];
    console.log("New Comment:\nBy: " + req.socket.remoteAddress + "\nQuestion title: " + question.title + "\nName: " + comment["name"] + "\nDescription: " + comment["description"])
    fs.writeFile('data/questions.json', JSON.stringify(data), 'utf8', function (err) {
        if (err) throw err;
    }); 
    res.redirect("/");
});
app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + "\\404.html");
  });
app.listen(3000, "10.50.230.95", function() {
  console.log('App listening on port 3000!');
});