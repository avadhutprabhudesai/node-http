const http = require('http');

/**
 *    Creation
 *      return value of http.request()
 *    Methods
 *      setHeader()
 *      getHeader()
 *      removeHeader()
 *      write()
 *      end()
 *    Properties
 *      path
 *      method
 *      host
 *      protocol
 *    Events
 *      response
 */

const req = http.request('http://localhost:3200/', {
  method: 'POST',
});

console.log(
  '\n\n====client/class-ClientRequest.js -> ClientRequest properties===='
);
console.log('path: ', req.path);
console.log('path: ', req.method);
console.log('path: ', req.host);
console.log('path: ', req.protocol);
console.log('=====================================\n\n');

req.setHeader('custom-header', 'A custom value');
req.setHeader('data-type', 'string');
req.setHeader('custom-header2', 'A custom value');

req.removeHeader('custom-header2');

req.write('\nData packet 1');
req.write('\nData packet 2');
req.write('\nData packet 3');

req.end('\nData packet last');
console.log(
  '\n\n====client/class-ClientRequest.js -> ClientRequest headers===='
);
console.log('header: ', req.getHeader('custom-header'));
console.log('=====================================\n\n');

req.on('response', (res) => {
  let response = '';
  res.on('data', (chunk) => {
    response += chunk.toString();
  });

  res.on('end', () => {
    console.log(
      '\n\n====client/class-ClientRequest.js -> ClientRequest POST response===='
    );
    console.log(response);
  });
});
