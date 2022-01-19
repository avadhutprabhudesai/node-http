const http = require('http');
/**
 *    Creation
 *      http.createServer()
 *    Methods
 *      listen()
 *      setTimeout(): wait before timing out the sockets used for a particular request
 *    Properties
 *      listening
 *      maxHeadersCount
 *      requestTimeout
 *
 *    Events
 *      timeout
 *      clientError
 *      connection
 */

const server = http.createServer((req, res) => {
  res.end('Welcome to the server on 3400');
});

server.setTimeout(2);

server.on('timeout', () => {
  console.log('\n\nServer timed out');
});

server.on('clientError', (err, socket) => {
  console.log('\n\nClientError occurred');
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('connection', () => {
  console.log('\n\nNew connection established');
});

server.listen(3400, () => {
  console.log('\nServer connected on port 3400');
});

server.maxHeadersCount = 100;
server.keepAliveTimeout = 2;

console.log('\n\n====Server class properties====');
console.log('server.listening: ', server.listening);
console.log('server.maxHeadersCount: ', server.maxHeadersCount);
console.log('===============================\n\n');
