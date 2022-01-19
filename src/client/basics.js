const http = require('http');

/**
 * http.get()
 * http.request()
 *    auth
 *    path
 *    host
 *    headers
 *    method
 *    port
 *    protocol
 *    port
 *
 *
 */

const httpGet = http.get('http://localhost:3200/', (res) => {
  let response = '';
  res.on('data', (chunk) => {
    response += chunk.toString();
  });
  res.on('end', () => {
    console.log('\n\n====http.get(http://localhost:3200/): ', response);
  });
});

httpGet.on('error', (err) => {
  console.log('\n\nError occurred while making http.get() on localhost:3200');
  console.log(err.toString());
});

const requestGet = http.request(
  {
    host: 'localhost',
    path: '/text',
    port: '3200',
    protocol: 'http:',
    method: 'GET',
    headers: {
      test: 'A test header',
    },
  },
  (res) => {
    let response = '';
    res.on('data', (chunk) => {
      response += chunk.toString();
    });
    res.on('end', () => {
      console.log(
        '\n\n====GET with http.request(http://localhost:3200/): ',
        response
      );
    });
  }
);

requestGet.on('error', (err) => {
  console.log(
    '\n\nError occurred while making GET http.request() on localhost:3200'
  );
  console.log(err.toString());
});

requestGet.end(); //Must call to get the response

const requestPost = http.request(
  {
    host: 'localhost',
    path: '/?search=John%20Doe',
    port: '3200',
    protocol: 'http:',
    method: 'POST',
    headers: {
      test: 'A test header',
    },
  },
  (res) => {
    let response = '';
    res.on('data', (chunk) => {
      response += chunk.toString();
    });
    res.on('end', () => {
      console.log(
        '\n\n====POST with http.request(http://localhost:3200/): ',
        response
      );
    });
  }
);

requestPost.on('error', (err) => {
  console.log(
    '\n\nError occurred while making POST http.request() on localhost:3200'
  );
  console.log(err.toString());
});

requestPost.write(
  JSON.stringify({
    id: 1,
    name: 'John Doe',
    profile: 'Developer',
  })
);
requestPost.end(); //Must call to get the response
