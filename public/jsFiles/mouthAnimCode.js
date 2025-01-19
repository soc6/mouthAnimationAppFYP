import { generateMouthFrames } from '../jsFiles/generateMouthFrames.js'
import { updateWordDisplay, updateMouthDisplay } from '../jsFiles/displayCode.js'
import { getWordFromIndex } from '../jsFiles/helperFunctions.js'

const synth = window.speechSynthesis;
const generateButton = document.getElementById('generateButton');
const micButton = document.getElementById('micButton');
const mouthSpeedItemList = document.getElementById('speeds');


let timeForEachFrame = 55;
let speechRate = 1;

//this will be overwritten by the IPA dictionary stored in a file
let IPAConvertionDictionary = {
    hello: 'hʌlowˈ',
    show: 'ʃəʊ',
    think: 'θɪŋk',
    and: 'ænd',
    dog: 'dɒɡ',
    elephant: 'ˈɛlɪfənt',
    member: 'ˈmɛmbə',
    boy: 'bɔɪ',
    alloy: 'ˈælɔɪ',
    here: 'hɪə',
    where: 'weə',
    is: 'ɪz',
    the: 'ðiː',
    intersegment: 'ɪˌntɚsɛˈgmʌnt',
    metabolism: 'mʌtæˈbʌlɪˌzʌm'
}


//gets the IPA dictionary sent by the server
function fetchDict() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            IPAConvertionDictionary = data;
            //console.log(data);
        })
        .catch(error => console.log('Error fetching data: ', error));
}

// Fetch data as soon as the page loads
window.onload = fetchDict;

if(mouthSpeedItemList){
    mouthSpeedItemList.addEventListener('change', updateSpeakSpeed);
} else {
    console.log("mouthSpeedItemList doesn't exist");
}

//update the rate at which the mouth speaks
function updateSpeakSpeed() {
    let selectedSpeed = document.getElementById("speeds").value;
    
    switch(selectedSpeed) {
        case 'verySlow':
            timeForEachFrame = 110;
            speechRate = 0.1;
            break;
        case 'slow':
            timeForEachFrame = 70;
            speechRate = 0.4;
            break;
        case 'medium':
            timeForEachFrame = 55;
            speechRate = 1;
            break;
        case 'fast':
            timeForEachFrame = 35;
            speechRate = 2;
            break;
        default:
            timeForEachFrame = 55;
            speechRate = 1;
            break;
    }

    console.log(timeForEachFrame+' & '+speechRate);
}

if(generateButton){
    generateButton.addEventListener('click', processInput);
} else {
    console.log('doenst exist');
}

//process the words given in the text area
async function processInput(){

    let voices = window.speechSynthesis.getVoices();
    let theVoice;
    for(let m = 0; m < voices.length; m++){
        
        
        //APP CAN RUN THESE VOICES
        let wantedVoiceName = 'Microsoft George - English (United Kingdom)';
        //let wantedVoiceName = 'Microsoft Hazel - English (United Kingdom)';
        //let wantedVoiceName = 'Microsoft Susan - English (United Kingdom)';

        //CAUSE APP TO NOT WORK
        //let wantedVoiceName = 'Google US English'
        //let wantedVoiceName = 'Google UK English Female';
        //let wantedVoiceName = 'Google UK English Male';

        if(voices[m].name === wantedVoiceName){
            theVoice = voices[m];
            //console.log(theVoice);
        }
    }
    

    synth.cancel();    
    let input = document.getElementById("wordsInput").value;

    const words = input.split(" ");

    console.log(words)
   
    const utterThis = new SpeechSynthesisUtterance(input);
    utterThis.pitch =0;
    utterThis.rate = speechRate;

    if(theVoice != null){
        utterThis.voice = theVoice;
    }


    synth.resume();
    utterThis.addEventListener("boundary", async (event) => {
        utterThis.rate = speechRate;
        if(event.name == 'word'){
            console.log('new word ');
            let startIndex = event.charIndex;

            console.log(input[startIndex]);

            let result = getWordFromIndex(input,startIndex);
            let curWord = result.word;
            console.log(curWord);

            updateWordDisplay(input,startIndex,result.end);

            await lipSyncWord(curWord);
        }
    });

    utterThis.addEventListener("end", (event) => {
        document.getElementById('wordDisplay').innerHTML = input.replace(/(\r\n|\n)/g, '<br>');;
    });

    synth.speak(utterThis);
    console.log("is it speaking? "+synth.speaking);
    
}

//update the mouth display to lip sync the 'input' word
async function lipSyncWord(input){
    //process the word so it can be used as a key for the dictionary
    input = input.toLowerCase();
    input = input.trim();
    input = input.replace(/[.,\/#!$?%\^\*;":{}=\_`~()]/g,"");
    input = input.replace(/[\r\n]+/g, ''); 
    //console.log('The inputted word is "'+input+'"');

    let output = IPAConvertionDictionary[input];

    let sentence;

    if(output == undefined){
        sentence = "No IPA spelling for the current input";
        document.getElementById('phoneticVersion').innerText = sentence;
    }
    else {
        sentence = "The entered input '"+input+"' has the IPA spelling '"+ output+"'";
        document.getElementById('phoneticVersion').innerText = sentence;
        let animFrames = generateMouthFrames(output);

        await updateMouthDisplay(animFrames, timeForEachFrame);
        
    }
}

if(micButton){
    micButton.addEventListener('click', microphoneListen);
} else {
    console.log('micButton doenst exist');
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);

recognition.continuous = true;
recognition.interimResults = true;

let listening = false;

//updates the text area with words spoken into the microphone
function microphoneListen(){
    const micButton = document.getElementById("micButton");
    if(!listening){
        micButton.textContent = " Stop recording words for the mouth to say "
        recognition.start();
    } else {
        micButton.textContent = " Record words for the mouth to say "
        recognition.stop();
    }
    listening = !listening;
}

recognition.onresult = event => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    document.getElementById("wordsInput").value = transcript;
}