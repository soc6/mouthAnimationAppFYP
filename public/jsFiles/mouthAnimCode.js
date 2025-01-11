const mouths = [
    'closedMouth.png', //0     
    'ovalMouth.png', //1
    'ghostMouth.png', //2
    'tongeTopTeethMouth.png', //3
    'circleMouth.png', //4
    'biteLipMouth.png', //5
    'hmmMouth.png', //6
    'topTeethMouth.png', //7
    'teethDownMouth.png', //8
    'teethUpMouth.png', //9
    'wideMouth.png', //10
    'blobMouth.png', //11
]

const mouthEnum = {
    closedMouth: 0,
    ovalMouth: 1,
    ghostMouth: 2,
    tongeTopTeethMouth: 3,
    circleMouth: 4,
    biteLipMouth: 5,
    hmmMouth: 6,
    topTeethMouth: 7,
    teethDownMouth: 8,
    teethUpMouth: 9,
    wideMouth: 10,
    blobMouth: 11
}


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
            console.log(data);
        })
        .catch(error => console.log('Error fetching data: ', error));
}

// Fetch data as soon as the page loads
window.onload = fetchDict;

async function sleep(miliSeconds){
    return new Promise((resolve) => setTimeout(resolve, miliSeconds));
}

//process the words given in the text area
async function processInput(){
    let button = document.getElementById('generateButton')
    
    let input = document.getElementById("wordsInput").value;

    const words = input.split(" ");

    console.log(words)

    button.disabled = true;

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(input);

    synth.speak(utterThis);

    for(let i = 0; i < words.length; i++){
        if (words[i] != '') {

            //Highlight the current word in the word display
            let paragraph = ""

            for(let k = 0; k<i;k++){
                paragraph += words[k]+ " ";
            }
            paragraph += '<span style="color:#7CB9E8">'+ words[i] +'</span> ';
            for(let j = i+1; j<words.length; j++){
                paragraph += words[j]+ " ";
            }
            document.getElementById('wordDisplay').innerHTML = paragraph;

            await lipSyncWord(words[i]);
            //await sleep(1000);
        }
            
    }
    document.getElementById('wordDisplay').innerHTML = input;
    button.disabled = false;
}

//update the mouth display to lip sync the 'input' word
async function lipSyncWord(input){
    //process the word so it can be used as a key for the dictionary
    input = input.toLowerCase();
    input = input.trim();
    input = input.replace(/[.,\/#!$?%\^\*;":{}=\_`~()]/g,"");

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

        /*
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(input);

        synth.speak(utterThis);
        */
        await updateMouthDisplay(animFrames);
        
    }
}

//converts the IPA letters into numbers that represent the mouth shape that is needed to make the sound
function generateMouthFrames(ipaText){
    var animaFrameArray = [];

    // could make an Enum for the mouth shapes
    for (let i = 0; i < ipaText.length; i++) {
        let currentIPAletter = '';

        //finds any two character symbols
        if(ipaText.charAt(i) == 'ə' && ipaText.charAt(i+1) == 'ʊ'){
            currentIPAletter = 'əʊ'
            i++; //skip the next character as 'ʊ' is being used here
        }
        else if(ipaText.charAt(i) == 'a' && ipaText.charAt(i+1) == 'ʊ'){
            currentIPAletter = 'aʊ';
            i++; //skip the next character as 'ʊ' is being used here
        }
        else if(ipaText.charAt(i) == 'o' && ipaText.charAt(i+1) == 'ʊ'){
            currentIPAletter = 'oʊ';
            i++; //skip the next character as 'ʊ' is being used here
        }
        else if(ipaText.charAt(i) == 'e' && ipaText.charAt(i+1) == 'ɪ'){
            currentIPAletter = 'eɪ';
            i++; //skip the next character as 'ɪ' is being used here
        }
        else if(ipaText.charAt(i) == 'a' && ipaText.charAt(i+1) == 'ɪ'){
            currentIPAletter = 'aɪ';
            i++; //skip the next character as 'ɪ' is being used here
        }
        else if(ipaText.charAt(i) == 'ɔ' && ipaText.charAt(i+1) == 'ɪ'){
            currentIPAletter = 'ɔɪ';
            i++; //skip the next character as 'ɪ' is being used here
        }
        else if(ipaText.charAt(i) == 'ɪ' && ipaText.charAt(i+1) == 'ə'){
            currentIPAletter = 'ɪə';
            i++; //skip the next character as 'ə' is being used here
        }
        else if(ipaText.charAt(i) == 'e' && ipaText.charAt(i+1) == 'ə'){ //FIT
            currentIPAletter = 'eə';
            i++; //skip the next character as 'ə' is being used here
        }
        else {
            currentIPAletter = ipaText.charAt(i);
        }
        console.log(currentIPAletter);
        switch(currentIPAletter) {
            //if a 'oval mouth' sound
            case 'h':
            case 'e':
            case 'ɪ':
            case 'ɛ':
                //console.log('h');
                animaFrameArray.push(mouthEnum.ovalMouth);
                break;

            //if a 'ghost mouth' sound
            case 'ə':
            case 'ʊ':
            case 'ɜ':
            case 'r':
                //console.log('e');
                animaFrameArray.push(mouthEnum.ghostMouth);
                break;

            //if a 'tongue teeth mouth' sound
            case 'l':
            case 'ð':
            case 'θ':
                //console.log('l');
                animaFrameArray.push(mouthEnum.tongeTopTeethMouth);
                break;

            //if a 'circle mouth' sound
            case 'əʊ':
            case 'u':
            case 'w':
            case 'oʊ':
            case 'aʊ':
            case 'ɔɪ':
                //console.log('eu'); 
                animaFrameArray.push(mouthEnum.circleMouth);
                break;

            //if a 'bite lip mouth' sound
            case 'f':
            case 'v':
                animaFrameArray.push(mouthEnum.biteLipMouth);
                break;
            
            //if a 'hmm mouth' sound
            case 'b':
            case 'm':
            case 'p':
                animaFrameArray.push(mouthEnum.hmmMouth);
                break;
            
            //if a 'top teeth mouth' sound
            case 'd':
            case 'g':
            case 'ʤ':
            case 'k':
            case 'n':
            case 'ŋ':
                animaFrameArray.push(mouthEnum.topTeethMouth);
                break;

            //if a 'teeth down mouth' sound
            case 'ʧ':
            case 't':
                animaFrameArray.push(mouthEnum.teethDownMouth);
                break;

            //if a 'teeth up mouth' sound
            case 'i':
            case 'j':
            case 's':
            case 'ʃ':
            case 'z':
            case 'ʒ':
                animaFrameArray.push(mouthEnum.teethUpMouth);
                break;
            
            //if a 'wide mouth' sound
            case 'æ':
            case 'eɪ':
            case 'ɪə':
                animaFrameArray.push(mouthEnum.wideMouth);
                break;

            //if a 'blob' sound
            case 'a':
            case 'ɒ':
            case 'ʌ':
            case 'aɪ':
            case 'eə':
                animaFrameArray.push(mouthEnum.blobMouth);
                break;

            default:
                //console.log('default');
                break;
        }           
    }
    console.log(animaFrameArray);
    return animaFrameArray;
}

//using frames as an input, updates the mouth display with the appropriate mouth shape images
async function updateMouthDisplay(inputFrames){
    const timeForEachFrame = 70;
    for (let i = 0; i < inputFrames.length; i++){
        document.getElementById('mouthDisplay').src = "../mouths/"+mouths[inputFrames[i]];
        await sleep(timeForEachFrame);
    }
    document.getElementById('mouthDisplay').src = "mouths/closedMouth.png";
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

    // Mimics what the user is saying (currently repeats it a few times)
    //lipSyncWord(transcript)

    document.getElementById("wordsInput").value = transcript;
}