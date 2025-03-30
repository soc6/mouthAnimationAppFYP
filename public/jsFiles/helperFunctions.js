//causes the app to pause for a specific amount of time
export async function sleep(miliSeconds){
    return new Promise((resolve) => setTimeout(resolve, miliSeconds));
}

//Gets the word from a string when given the index of the first letter of the word
export function getWordFromIndex(str, index) {
    let start = index;
    let end = start;
  
    // Loop to find the end of the word (until space is encountered)
    while (end < str.length && str[end] !== ' ' && str[end] !== '\n') {
      end++;
    }
  
    // Slice the string to get the word
    let word = str.slice(start, end);

    return { word , end };
}