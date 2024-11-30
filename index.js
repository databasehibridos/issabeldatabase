const express = require('express');
// const mysql = require('mysql2');
const db = require('./queries')
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://issabel-hibridos.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', '*')

  next();
})

// Search endpoint
app.get('/search', db.getUsers)
app.get('/range/:start/:finish', db.getRange)

// Start the server
app.listen(port, () => {
    // console.log(`Server is running on 
		// http://localhost:${port}`);
});
