const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const commentsRoute = require("./routes/comments");

require("dotenv/config");

// Middlewares in express

// Allow all
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use("/comments", commentsRoute);
const server = http.createServer(app);

// ROUTES

app.get("/", (req, res) => {
  res.send("We are on home");
})

// Connect to db 
mongoose.connect("mongodb+srv://alban:alban@cluster0-4qujn.mongodb.net/portfolio?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

var db = mongoose.connection;
db.once('open', function () {
  console.log("Connected to portfoliov");
})
db.on('error', err => {
  throw err;
});

// How to listen on the server
server.listen(process.env.PORT, () => {
  console.log('Listen PORT', process.env.PORT);
});