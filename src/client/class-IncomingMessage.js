const http = require('http');

/**
 *    Creation
 *      Created by ClientRequest and passed into the on('response') event handler callback
 *    Properties
 *      complete
 *      headers
 *      statusCode
 */

const req = http.request('http://localhost:3200/text');

req.on('response', (res) => {
  let response = '';
  res.setEncoding('utf-8');
  res.on('data', (chunk) => {
    response += chunk;
  });

  res.on('end', () => {
    console.log('\n\n==== client/class-IncomingMessage.js====');
    console.log('response: ', response);
    console.log('res.complete: ', res.complete);
    console.log('res.headers: ', res.headers);
    console.log('res.statusCode: ', res.statusCode);
    console.log('========================================\n\n');
  });
});

req.end();
