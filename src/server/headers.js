const http = require('http');

/**
 * Extract headers from request
 *    headers
 *    rawHeaders
 * Set headers on response
 *    res.setHeader(): Add single header to implicit header
 *    res.writeHead(): Send custom headers. Do not send implicit headers
 * Remove headers
 * Send statusCode
 * server maxHeaderCount
 */

const server = http.createServer((req, res) => {
  const headerType = req.headers['header-type'];

  if (headerType === 'Implicit') {
    res.removeHeader('header-type');

    // setHeader adds single entry to the implicit headers
    // setHeader is case-insesitive so only last entry will be sent
    res.setHeader('Test', 'Test from setHeader');
    res.setHeader('test', 'Implicit header added with setHeader');

    res.statusCode = 201;
  } else if (headerType === 'Explicit') {
    // writeHead overrides this statusCode.
    res.statusCode = 201;
    // writeHead appends explicit headers (specified by 2nd argument) to the implicit headers.
    res.writeHead(200, {
      'Content-Type': 'application/json',
      test: 'Explicit headers added with writeHead',
    });
  } else {
    // setHeader is case-insensitive for header keys.
    res.setHeader('a', 'a from setHeader');
    res.setHeader('A', 'A from setHeader');

    res.setHeader('b', 'a from setHeader');

    // headers from setHeader are merged with writeHead. But writeHead overrides conflicting headers.
    res.writeHead(200, {
      B: 'B from writeHead',
    });
  }

  res.end(
    JSON.stringify({
      headers: req.headers,
      rawHeaders: req.rawHeaders,
    })
  );
});

server.listen(3300, () => {
  console.log('Server connected on port 3300');
});

server.maxHeadersCount = 2;
