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

//converts the IPA letters into numbers that represent the mouth shape that is needed to make the sound
export function generateMouthFrames(ipaText){
    var animaFrameArray = [];
    var correspondingIPALetters = [];

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
        switch(currentIPAletter) {
            //if a 'oval mouth' sound
            case 'h':
            case 'e':
            case 'ɪ':
            case 'ɛ':
                animaFrameArray.push(mouthEnum.ovalMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'ghost mouth' sound
            case 'ə':
            case 'ʊ':
            case 'ɜ':
            case 'r':
            case 'ɹ':
            case 'ɚ':
                animaFrameArray.push(mouthEnum.ghostMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'tongue teeth mouth' sound
            case 'l':
            case 'ð':
            case 'θ':
                animaFrameArray.push(mouthEnum.tongeTopTeethMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'circle mouth' sound
            case 'əʊ':
            case 'u':
            case 'w':
            case 'oʊ':
            case 'aʊ':
            case 'ɔɪ':
            case 'ɔ':
            case 'o':
                animaFrameArray.push(mouthEnum.circleMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'bite lip mouth' sound
            case 'f':
            case 'v':
                animaFrameArray.push(mouthEnum.biteLipMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;
            
            //if a 'hmm mouth' sound
            case 'b':
            case 'm':
            case 'p':
                animaFrameArray.push(mouthEnum.hmmMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;
            
            //if a 'top teeth mouth' sound
            case 'd':
            case 'g':
            case 'ʤ':
            case 'k':
            case 'n':
            case 'ŋ':
                animaFrameArray.push(mouthEnum.topTeethMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'teeth down mouth' sound
            case 'ʧ':
            case 't':
                animaFrameArray.push(mouthEnum.teethDownMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'teeth up mouth' sound
            case 'i':
            case 'j':
            case 's':
            case 'ʃ':
            case 'z':
            case 'ʒ':
                animaFrameArray.push(mouthEnum.teethUpMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;
            
            //if a 'wide mouth' sound
            case 'æ':
            case 'eɪ':
            case 'ɪə':
            case 'ɑ':
                animaFrameArray.push(mouthEnum.wideMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            //if a 'blob' sound
            case 'a':
            case 'ɒ':
            case 'ʌ':
            case 'aɪ':
            case 'eə':
                animaFrameArray.push(mouthEnum.blobMouth);
                correspondingIPALetters.push(currentIPAletter);
                break;

            default:
                console.log('default :'+currentIPAletter);
                break;
        }           
    }
    return {
        frames: animaFrameArray,
        ipaLetters: correspondingIPALetters
    };
}