import { generateMouthFrames } from '../jsFiles/generateMouthFrames.js'
import { updateWordDisplay, updateMouthDisplay } from '../jsFiles/displayCode.js'
import { getWordFromIndex } from '../jsFiles/helperFunctions.js'

const synth = window.speechSynthesis;
const generateButton = document.getElementById('generateButton');
const micButton = document.getElementById('micButton');
const mouthSpeedItemList = document.getElementById('speeds');
const wordsInput = document.getElementById("wordsInput");

let microphoneEnabled = false;
let wantedVoiceName = 'Microsoft George - English (United Kingdom)';


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
    synth.cancel();

    let voices = window.speechSynthesis.getVoices();
    let theVoice;

    for(let m = 0; m < voices.length; m++){
        if(voices[m].name === wantedVoiceName){
            theVoice = voices[m];
        }
    }

    let input = wordsInput.value;
   
    const utterThis = new SpeechSynthesisUtterance(input);
    utterThis.pitch = 0;
    utterThis.rate = speechRate;

    if(theVoice != null){
        utterThis.voice = theVoice;
    }
    console.log(utterThis.voice)

    //synth.resume();
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
recognition.interimResults = false;

//updates the text area with words spoken into the microphone
function microphoneListen(){
    if(microphoneEnabled){
        recognition.start();
        if (confirm("🎤 Record words for the mouth to say 🎤")) {
            recognition.stop();
                
        } else {
            recognition.abort();
            console.log("You pressed Cancel!")
        }
    } else {
        window.alert("You need to allow access to your microphone to record with voice")
    }
}

recognition.onresult = event => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    document.getElementById("wordsInput").value = transcript;
}

//check if the browser has the microphone enabled
function checkMicrophonePermission() {
    //Check if the Permissions API is supported
    if (navigator.permissions) {
        navigator.permissions.query({ name: 'microphone' })
        .then(function(permissionStatus) {
            //Check the permission status
            if (permissionStatus.state === 'granted') {
                microphoneEnabled = true;
            } else if (permissionStatus.state === 'prompt') {
                microphoneEnabled = false;
            } else {
                microphoneEnabled = false;
            }
  
            //update permission status everytime it gets changed
            permissionStatus.onchange = function() {
                console.log('Microphone permission state has changed to:', permissionStatus.state);
                if(permissionStatus.state === 'granted'){
                    microphoneEnabled = true;
                } else {
                    microphoneEnabled = false;
                }
            };
        })
        .catch(function(error) {
          console.error('Error checking microphone permission:', error);
        });
    } else {
        console.log('Permissions API is not supported in this browser.');
        microphoneEnabled = true;
    }
}
  
//Call the function to check the microphone permission status
checkMicrophonePermission();


//fill the voice select box with all the voices that work with the app
let voicesPopulated = false;
    function populateVoiceList() {
    console.log('POPULATING')

    if(voicesPopulated){
        return; //exit if the voices have already been populated
    }

    const voiceSelect = document.getElementById('voiceSelect');
    const voices = window.speechSynthesis.getVoices();

    //clear the existing options
    voiceSelect.innerHTML = '<option value="">Select a voice</option>';

    //add each voice as an option in the select list
    let microSoftvoiceFound = false;

    voices.forEach(function(voice) {
        let firstWord = voice.name.split(' ')[0]

        if(firstWord === 'Microsoft'){
            //sets the default voice to be one that works
            if(microSoftvoiceFound == false){
                wantedVoiceName = voice.name;
            }

            const option = document.createElement('option');
            
            option.textContent = `${voice.name}`;
            option.value = voice.name;
            voiceSelect.appendChild(option);

            microSoftvoiceFound = true;
        }
    });
    voicesPopulated = true;
    //if no microsoft voices were found, warn the user
    console.log(wantedVoiceName)
    if(microSoftvoiceFound == false){
        alert("Warning: This app needs Microsoft Text-To-Speech voices to work\nIt seems like your browser doesn't support these voices\nPlease trying using a different browser (like firefox or google chrome) to get the most out of this app")
        console.log('no microsoft found')
    }
}

//wait for voices to be loaded
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
} else {
    //if voices are already loaded, populate the list
    populateVoiceList();
}

//event listener for the select element to store the selected voice
document.getElementById('voiceSelect').addEventListener('change', function(event) {
    wantedVoiceName = event.target.value;  // Store the selected voice in the variable
    console.log(`Selected Voice: ${wantedVoiceName}`);
});