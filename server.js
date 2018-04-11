const https = require('https');
const fs = require('fs');
var express = require('express');
var path = require('path');

var app = express();
var privateKey  = fs.readFileSync('cert/ca.key');
var certificate = fs.readFileSync('cert/ca.crt');

var credentials = {key: privateKey, cert: certificate};

app.use(express.static(path.join(__dirname,'/public')));

console.log('server is running');

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8080);



















