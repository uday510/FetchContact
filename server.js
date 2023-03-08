const express = require('express');
const serverConfig = require('./server.config');

const app = express(); // Initialize express instance

// intialize the route/s
require('./routes/contact.routes')(app);

console.clear();

// intialize the server
module.exports = app.listen((serverConfig.HOST, serverConfig.PORT), () => {
    console.log(`FetchContact Application Running on ${serverConfig.HOST}:${serverConfig.PORT}`);
});



