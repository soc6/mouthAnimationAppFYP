export function getIPAByRules(word){

    let ipaOutput = "";
    //cycle through the letters of the word
    for(let i = 0; i < word.length; i++){
        switch(word[i]){
            case 'a':
                ipaOutput += 'a';
                break;
            case 'b': 
                //RULE [B] =/b/
                ipaOutput += 'b';
                break;
            case 'c':
                ipaOutput += 'k';
                break;
            case 'd':
                ipaOutput += 'd';
                break;
            case 'e':
                //RULE ^:[E] = / /
                if(word[i-1] != undefined && isConsonant(word[i-1])){
                    //add nothing to ipaOutput
                } else { //default rule
                    ipaOutput += 'e';
                }
                break;
            case 'f':
                ipaOutput += 'f';
                break;
            case 'g':
                ipaOutput += 'g';
                break;
            case 'h':
                ipaOutput += 'h';
                break;
            case 'i':
                ipaOutput += 'ɪ';
                break;
            case 'j':
                ipaOutput += 'j';
                break;
            case 'k':
                ipaOutput += 'k';
                break;
            case 'l':
                ipaOutput += 'l';
                break;
            case 'm':
                ipaOutput += 'm';
                break;
            case 'n':
                ipaOutput += 'ŋ';
                break;
            case 'o':
                ipaOutput += 'oʊ';
                break;
            case 'p':
                ipaOutput += 'p';
                break;
            case 'q':
                ipaOutput += 'q';
                break;
            case 'r':
                ipaOutput += 'ɹ';
                break;
            case 's':
                ipaOutput += 's';
                break;
            case 't':
                //RULE [T] = /t/
                ipaOutput += 't';
                break;
            case 'u':
                //RULE @[U] = /u/
                if (uInfluencingConsonant(word[i-1]) || uInfluencingConsonant2(word[i-2],word[i-1])) {
                    ipaOutput += 'u';
                } else { //default rule
                    ipaOutput += 'ə';
                }
                
                break;
            case 'v':
                ipaOutput += 'v';
                break;
            case 'w':
                ipaOutput += 'w';
                break;
            case 'x':
                ipaOutput += 'ks';
                break;
            case 'y':
                //[YOU] = ju RULE
                if(word[i] == 'y' && word[i+1] == 'o' && word[i+2] == 'u'){
                    ipaOutput += 'ju';
                    i += 2;
                } else { //default rule
                    ipaOutput += 'j';
                }
                
                break;
            case 'z':
                ipaOutput += 'z';
                break;
            default:
                ipaOutput += 'a';
                break;
        }
    }

    return ipaOutput
}

function isConsonant(letter){
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

    for(let i = 0; i < consonants.length; i++){
        if(letter == consonants[i]){
            return true;
        }
    }

    return false;
}

function uInfluencingConsonant(letter){
    const uInfluencingConsonants = ['t', 's', 'r', 'd', 'l', 'z', 'n', 'j'];

    for(let i = 0; i < uInfluencingConsonants.length; i++){
        if(letter == uInfluencingConsonants[i]){
            return true;
        }
    }

    return false;
}

function uInfluencingConsonant2(letter1, letter2){
    const uInfluencingConsonants = ['t', 's', 'c'];

    for(let i = 0; i < uInfluencingConsonants.length; i++){
        if(letter1 == uInfluencingConsonants[i] && letter2 == 'h'){
            return true;
        }
    }

    return false;
}