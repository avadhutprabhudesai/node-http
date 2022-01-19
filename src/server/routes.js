const http = require('http');
const fs = require('fs');
/**
 *  Extract pathname
 *  Extract method
 *  Extract queryParams
 *  Based on the method and pathname send different responses
 *
 *  Send different types of responses
 *   text
 *   json
 *   html string
 *   html file
 *   text file
 *   csv file
 *  Streaming file contents to the response
 *
 *
 */

const server = http.createServer((req, res) => {
  console.log('\n\n====server/routes.js====');

  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  const { method } = req;

  if (method === 'GET') {
    let csvFile, htmlFile;
    switch (pathname) {
      case '/':
        res.end('Welcome to the server on 3200');
        break;
      case '/text':
        res.setHeader('Content-Type', 'text/html');
        res.end('A text response');
        break;
      case '/htmlString':
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>An html string</h1>');
        break;
      case '/json':
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            id: 1,
            name: 'John Doe',
          })
        );
        break;
      case '/csv':
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          'attachment;filename=oceanpals.csv'
        );
        csvFile = fs.createReadStream('src/server/addresses.csv');
        csvFile.pipe(res);
        csvFile.on('end', () => {
          console.log('CSV streamed');
          res.end();
        });
        break;
      case '/html':
        res.setHeader('Content-Type', 'text/html');
        htmlFile = fs.createReadStream('src/server/hello.html');
        htmlFile.pipe(res);
        htmlFile.on('end', () => {
          console.log('html streamed');
          res.end();
        });
        break;

      default:
        res.writeHead(404);
        res.end(
          JSON.stringify({
            error: 'No matching route found',
          })
        );
        break;
    }
  } else if (method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      body = JSON.parse(body);
      let queryParams = {};
      for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      switch (pathname) {
        case '/':
          res.end(
            JSON.stringify({
              body,
              queryParams,
            })
          );
          break;

        default:
          break;
      }
    });
  }
});

server.listen(3200);
