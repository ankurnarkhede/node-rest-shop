/**
 * Created by smartankur4u on 29/6/18.
 */

const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);


