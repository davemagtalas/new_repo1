import generateStupidName from 'sillyname';
import { randomSuperhero } from 'superheroes';
import inquirer from 'inquirer';
import sillyName from 'sillyname';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([{
    message: 'What is your name?',
    name: "userName"
  }])
  .then((answers) => {
    var randomVillainName = generateStupidName();
    var randomHeroName = randomSuperhero();
    var qr_png_userName = qr.image(answers.userName, { type: 'png' });
    var qr_png_heroName = qr.image(randomHeroName, { type: 'png' });
    var qr_png_villainName = qr.image(randomVillainName, { type: 'png' });

    const content = `${answers.userName} ${randomVillainName} ${randomHeroName}`;

    console.log("Your name is", answers.userName);
    console.log("Your villain name is", randomVillainName);
    console.log("Your superhero name is", randomHeroName);

    qr_png_userName.pipe(fs.createWriteStream("name.png"));
    qr_png_heroName.pipe(fs.createWriteStream("superheroname.png"));
    qr_png_villainName.pipe(fs.createWriteStream("villainname.png"));

    fs.writeFile('myhero.txt', content, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File has been written successfully');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
