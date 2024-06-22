// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req,res) {
  console.log('this is the beginning')
  console.log('req.params ' + req.params);
  console.log('req.params[date] ' + req.params['date']);
  console.log('typeof ' + typeof(req.params['date']))
  console.log('+req.params[date] ' + +req.params['date'])
  console.log('Date.parse(req.params[date]).valueof: ' + Date(req.params['date']).valueof);
  
  //check if parameter is empty
  if (null != req.params['date']) {
    //check if parameter is a string of numbers or date string
    if (isNaN(+req.params['date'])) {
      //if a string that's like a date
      const function_date = new Date(req.params['date']);
      //check if valid
      
      if (isNaN(function_date.valueOf())) {
        //if invalid
        res.json({error: 'Invalid Date'})

      }
      else {
      console.log("function_date: " + function_date)
      res.json({unix: Date.parse(function_date),
      utc: function_date.toUTCString()});
      }
    }
    //if a string that's numbers
    else {
      const function_date = new Date(parseInt(req.params['date']));
      console.log("function_date: " + function_date)
      res.json({unix: Date.parse(function_date),
        utc: function_date.toUTCString()});
    }

    
  }
  //if empty parameter return now()
  else {
    res.json({unix: Date.parse(Date()),
      utc: Date()})

  }


});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
