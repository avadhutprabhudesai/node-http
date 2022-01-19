const http = require('http');

/**
 *    Creation
 *      Auto inserted in requestListener
 *    Methods
 *      getHeader()
 *      getHeaderNames()
 *      getHeaders()
 *      hasHeader()
 *      setHeader()
 *      removeHeader()
 *      @TODO: setTimeout()
 *      write()
 *      writeHead()
 *      end()
 *    Properties
 *      headersSent
 *      req
 *      statusCode
 */

const server = http.createServer((req, res) => {
  res.setHeader('Accept-Encoding', 'gzip, deflate, br');
  res.setHeader('Custom-Header', 'A custom header');
  res.setHeader('Custom-Header2', 'A custom header 2');

  res.removeHeader('Custom-Header2');

  console.log('\n\n====ServerResponse methods====');
  console.log(
    'getHeader("accept-encoding"): ',
    res.getHeader('accept-encoding')
  );
  console.log(
    'hasHeader("accept-encoding"): ',
    res.hasHeader('accept-encoding')
  );
  console.log('hasHeader("Custom-Header2"): ', res.hasHeader('Custom-Header2'));
  console.log('getHeaders(): ', res.getHeaders());
  console.log('getHeaderNames(): ', res.getHeaderNames());
  console.log('==================================\n\n');

  console.log('\n\n====ServerResponse properties====');
  console.log('\nheaderSent: ', res.headersSent);
  console.log('\nreq: ', Object.keys(res.req));
  console.log('\nstatusCode: ', res.statusCode);
  console.log('==================================\n\n');

  if (!res.headersSent) {
    res.writeHead(200, {
      test: 'Test header',
    });
  }

  console.log();

  res.write('\nStep 1');
  res.write('\nStep 2');
  res.write('\nStep 3');

  res.end('\n\nWelcome to the server connected on 3402');
});

server.listen(3402);
