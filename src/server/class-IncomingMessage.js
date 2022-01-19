const http = require('http');

/**
 *    Creation
 *      Auto inserted in requestListener
 *    Methods
 *      setTimeout()
 *    Properties
 *      headers
 *      method
 *      url
 */

const server = http.createServer((req, res) => {
  console.log('\n\n====IncomingMessage properties====');
  console.log('headers: ', req.headers);
  console.log('method: ', req.method);
  console.log('url: ', req.url);
  console.log('==================================\n\n');

  res.end('Welcome to the server connected on 3401');
});

server.listen(3401);
