require("dotenv").config();
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3600;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use('/api/users', require('./routes/api/users'))
app.use('/exercises/playlist', require('./routes/exercises/playlist'))
app.use('/exercises/exercise', require('./routes/exercises/exercise'))
app.use('/exercises/playlistExercises', require('./routes/exercises/playlistExercises'))

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});

app.get('/test', (req, res) => {
    res.json({ msg: 'User endpoint OK'});
  });


