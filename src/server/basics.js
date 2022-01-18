const http = require('http');

/**
 * Create a basic server
 *  1. separate request listener
 *  2. auto inserted request listener
 * Listen on a specific port
 * Respond to all request with a String
 */

// 1. separate request listener
const s1 = http.createServer();

s1.on('request', (req, res) => {
  console.log('\n\n====server/basics.js===');
  console.log('Request received on s1');
  res.write('Welcome to s1');
  res.end();
});

s1.listen(3100);

// 2. auto inserted request listener
const s2 = http.createServer((req, res) => {
  console.log('\n\n====server/basics.js===');
  console.log('Request received on s2');
  res.write('Welcome to s2');
  res.end();
});
s2.listen(3101);
