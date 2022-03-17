//setup code (importing)

const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 4050;
console.log(port)

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
rollbar.log("Tester!");



// setup code
app.get('/test', (req, res) => {
    console.log("serverhit")
    try { 
        nonExistentFunction();
        
    } catch (error) {
        rollbar.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
    
});
app.listen(port, () => {
    console.log(`we are in port ${port}`);
})
 console.log(__dirname);


 app.get('/test/tester', (req, res) => {
     let num = 2
    try {
     if (num <= 1) {
         rollbar.log("number is equal to one")
         res.status(200).send("all good")
        }
     if (num === 2) { 
         rollbar.warning("two is equal to two")
         res.status(400).send("there's not really any issue here but we are pretending there is")
    } else {
        rollbar.critical("num is not equal to two!")  
        res.status(400).send("there's an issue here")
        }
    } catch (err) {
    console.log(err)
    }
})
