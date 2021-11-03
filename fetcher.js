const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let file = process.argv.slice(3);
let path = process.argv.slice(2, 3);

request(path[0], (error, response, body) => {
  if (error) {
    console.log('error', error)
  } else {
      fs.access(`${file}`, (error) => {
        if (!error) {
          rl.question("File exists Do you want to overwrite (Y/N)", (answer) => {
            if (answer === "Y") {
              fs.writeFile(`${file}`, body, (error) => {
                if (error) console.log('error', error);
                console.log(`${file} overwritten, Downloaded and saved ${body.length} bytes to ${file}`)
              })
            } else if (answer === "N") {
                process.exit();
            }
            rl.close();
          })
        } else {
              fs.writeFile(`${file}`, body, (error) => {
                if (error) console.log('error', error);
                console.log(`Downloaded and saved ${body.length} bytes to ${file}`)
              })
        }
      })
  }
});