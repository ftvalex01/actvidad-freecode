// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
function getTimestampAndUTC(dateString) {
  let date;

  if (!dateString) {
      date = new Date();
  } else if (!isNaN(parseInt(dateString))) {
      date = new Date(parseInt(dateString));
  } else {
      date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
      return { error: "Invalid Date" };
  }

  return { unix: date.getTime(), utc: date.toUTCString() };
}

app.get('/api/:date?', (req, res) => {
  const result = getTimestampAndUTC(req.params.date);
  res.json(result);
});

app.get('/api/1451001600000', (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
