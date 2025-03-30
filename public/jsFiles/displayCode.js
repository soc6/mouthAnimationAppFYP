import { sleep } from "../jsFiles/helperFunctions.js";

//const mouthDisplay = document.getElementById('mouthDisplay');
const mouthCanvas = document.getElementById("mouthCanvas");
const ctx = mouthCanvas.getContext("2d");

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

//Highlight the current word in the word display
export function updateWordDisplay(text, start, end){
    let paragraph = ""

    for(let k = 0; k<start;k++){
        paragraph += text[k];
    }
    paragraph += '<span style="color:#7CB9E8">'
    for(let p = start; p < end; p++){
        paragraph += text[p];
    }
    paragraph +='</span>';

    for(let j = end; j<text.length; j++){
         paragraph += text[j];
    }
    paragraph = paragraph.replace(/(\r\n|\n)/g, '<br>');
    document.getElementById('wordDisplay').innerHTML = paragraph;
}

//using frames as an input, updates the mouth display with the appropriate mouth shape images
export async function updateMouthDisplay(inputFrames, frameTime, backgroundColour){
    for (let i = 0; i < inputFrames.length; i++){
        let img = new Image();
        img.src = "../mouths/"+mouths[inputFrames[i]];
        
        img.onload = function() {
            // Draw a background colour rectangle to cover the background
            ctx.fillStyle = backgroundColour;
            ctx.fillRect(0, 0, mouthCanvas.width, mouthCanvas.height);
            ctx.drawImage(img, 0, 0, mouthCanvas.width, mouthCanvas.height);
        }

        await sleep(frameTime);
    }
    let img = new Image();
    img.src = "mouths/closedMouth.png";
    img.onload = function() {
        // Draw a white rectangle to cover the background
        ctx.fillStyle = backgroundColour;
        ctx.fillRect(0, 0, mouthCanvas.width, mouthCanvas.height);
        ctx.drawImage(img, 0, 0, mouthCanvas.width, mouthCanvas.height);
    }
}