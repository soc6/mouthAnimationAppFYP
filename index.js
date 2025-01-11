import express from 'express';
import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';

const ipaDict = readFileSync('public/txtFiles/ipadict.txt', 'utf8')

let newDict = { };

//process the ipa dictionary into a JSON object
let transalations = ipaDict.split('\n');
transalations.forEach( (line) => {
    let words = line.split('\t');
    newDict[words[0]] = words[words.length-1];
});

const app = express();
app.use(express.static('./public'))

app.get('/', async (request, response) => {
    response.send( await readFile('./fypBasicApp.html', 'utf8'));
})

app.get('/data', (request, response) => {
    response.json(newDict);
})

app.listen(process.env.PORT || 3000, () => console.log('App available at http://localhost:3000'));