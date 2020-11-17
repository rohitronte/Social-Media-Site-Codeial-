//For logging purppose
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream');
const fs = require("fs");

var logDirectory = path.join(__dirname, "..",'production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  })


const development = {
    name : "development",
    assets_path : "/assets",
    session_cookie_key : "somethingsomething",
    db : "codeial_development",
    smtp : {
            service : "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "ronterohit36", 
            pass: "Rohit@0123456789" 
            }
      },
    google_client_id: "357065288392-vflncj9fvp3fk19bj241a5gi89ifg08a.apps.googleusercontent.com",
    google_client_secret: "GBjD7G-mOteE4AiuD5ihx6ve",
    google_callback_url: "http://localhost:8000/users/auth/google/callback" ,
    morgan : {
      mode : "dev",
      options : {stream: accessLogStream}
    }
}

const production = {
    name : "production",
    assets_path : process.env.ASSETS_PATH,
    session_cookie_key : process.env.SESSION_COOKIE_KEY,
    db : process.env.DB,
    smtp : {
            service : "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, 
            pass: process.env.CODEIAL_GMAIL_PASSWORD 
            }
      },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    morgan : {
      mode : "combined",
      options : {stream: accessLogStream}
    }
}


//module.exports = development
module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);