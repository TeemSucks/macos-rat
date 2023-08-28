const net = require('net');
const readline = require('readline');

const host = 'HOST_IP_ADDRESS';
const port = 12345;

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(port, host, () => {
  console.log('Connected to', host, 'port', port);
  rl.prompt();
});

client.on('data', data => {
  console.log('Response:');
  console.log(data.toString());
  rl.prompt();
});

client.on('close', () => {
  console.log('Connection closed');
  rl.close();
});

rl.on('line', line => {
  if (line === 'exit') {
    client.end();
  } else {
    client.write(line);
  }
});
