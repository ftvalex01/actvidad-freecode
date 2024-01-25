var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

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
  } else {
    // Comprobamos si dateString es un número (timestamp)
    if (!isNaN(dateString) && !isNaN(parseFloat(dateString))) {
      date = new Date(parseInt(dateString));
    } else {
      // Si no es un número, tratamos de parsearlo como una fecha
      date = new Date(dateString);
    }
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

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
