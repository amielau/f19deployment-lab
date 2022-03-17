//setup code (importing)

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../Front_End")));

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '71720ab53bdf4fd78a223a19b260ec5a',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const port = process.env.PORT || 4050;

app.listen(port, () => {
    console.log(`we are in port ${port}`);
})
 console.log(__dirname);

// setup code
app.get('/', (req, res) => {
try { 
    nonExistentFunction();

  } catch (error) {
    rollbar.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }

});
