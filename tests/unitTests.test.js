import { describe, it, expect } from "vitest";
import { generateMouthFrames } from '../public/jsFiles/generateMouthFrames.js';
import { getWordFromIndex } from '../public/jsFiles/helperFunctions.js';
import { getIPAByRules } from "../public/jsFiles/getIPAByRules.js";

describe('generateMouthFrames', () => {
    it('Testing that hello returns the expected frame numbers', () => {
        const expectedFrameArray = [1, 11, 3, 4, 4];
        const expectedIPALetterArray = ['h','ʌ','l','o','w'];
        const IPAHello = 'hʌlowˈ';

        let received = generateMouthFrames(IPAHello);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "Oval mouth" frame number', () => {
        const expectedFrameArray = [1, 1, 1, 1];
        const expectedIPALetterArray = ['h','ɪ','e','ɛ'];
        const ovalMouthLetters = 'hɪeɛ';

        let received = generateMouthFrames(ovalMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "Oval mouth" frame number', () => {
        const expectedFrameArray = [2, 2, 2, 2];
        const expectedIPALetterArray = ['ə','ɜ','r','ʊ'];
        const ghostMouthLetters = 'əɜrʊ';

        let received = generateMouthFrames(ghostMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "tongue teeth mouth" frame number', () => {
        const expectedFrameArray = [3, 3, 3];
        const expectedIPALetterArray = ['ð','l','θ'];
        const tongueTeethMouthLetters = 'ðlθ';

        let received = generateMouthFrames(tongueTeethMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "circle mouth" frame number', () => {
        const expectedFrameArray = [4, 4, 4, 4, 4, 4];
        const expectedIPALetterArray = ['əʊ','u','w','oʊ','aʊ','ɔɪ'];
        const circleMouthLetters = 'əʊuwoʊaʊɔɪ';

        let received = generateMouthFrames(circleMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "bite lip mouth" frame number', () => {
        const expectedFrameArray = [5, 5];
        const expectedIPALetterArray = ['f','v'];
        const lipBiteMouthLetters = 'fv';

        let received = generateMouthFrames(lipBiteMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "hmm mouth" frame number', () => {
        const expectedFrameArray = [6, 6, 6];
        const expectedIPALetterArray = ['b','p','m'];
        const hmmMouthLetters = 'bpm';

        let received = generateMouthFrames(hmmMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "top teeth mouth" frame number', () => {
        const expectedFrameArray = [7, 7, 7, 7, 7, 7];
        const expectedIPALetterArray = ['d','g','ʤ','k','n','ŋ'];
        const topTeethMouthLetters = 'dgʤknŋ';

        let received = generateMouthFrames(topTeethMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "teeth down mouth" frame number', () => {
        const expectedFrameArray = [8, 8];
        const expectedIPALetterArray = ['t','ʧ'];
        const teethdownMouthLetters = 'tʧ';

        let received = generateMouthFrames(teethdownMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "teeth up mouth" frame number', () => {
        const expectedFrameArray = [9, 9, 9, 9, 9, 9];
        const expectedIPALetterArray = ['i','j','s','ʃ','z','ʒ'];
        const teethdownMouthLetters = 'ijsʃzʒ';

        let received = generateMouthFrames(teethdownMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "wide mouth" frame number', () => {
        const expectedFrameArray = [10, 10, 10];
        const expectedIPALetterArray = ['æ','eɪ','ɪə'];
        const wideMouthLetters = 'æeɪɪə';

        let received = generateMouthFrames(wideMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });

    it('Testing all the letters that should return the "blob mouth" frame number', () => {
        const expectedFrameArray = [11, 11, 11, 11, 11];
        const expectedIPALetterArray = ['a','ɒ','ʌ','aɪ','eə'];
        const blobMouthLetters = 'aɒʌaɪeə';

        let received = generateMouthFrames(blobMouthLetters);

        expect(received.frames).toStrictEqual(expectedFrameArray);
        expect(received.ipaLetters).toStrictEqual(expectedIPALetterArray);
    });
});

describe('getWordFromIndex', () => {
    it('Testing that getWordFromIndex can get a word in the middle of a string', () => {
        const exampleStringMiddle = "Hello this is a test string";
        const expectedWord1 = "test";
        const expectedWord2 = "is"

        const expectedWord1Index = 16;
        const expectedWord2Index = 11;

        const expectedWord1EndIndex = 20;
        const expectedWord2EndIndex = 13;

        let word1 = getWordFromIndex(exampleStringMiddle, expectedWord1Index);
        let word2 = getWordFromIndex(exampleStringMiddle, expectedWord2Index);

        expect(word1.word).toStrictEqual(expectedWord1);
        expect(word2.word).toStrictEqual(expectedWord2);

        expect(word1.end).toStrictEqual(expectedWord1EndIndex);
        expect(word2.end).toStrictEqual(expectedWord2EndIndex);
    });

    it('Testing that getWordFromIndex can get a word at the end of a string', () => {
        const exampleStringEnd = "This is another test string where we need the last word";
        const expectedWordEnd = "word";

        const expectedWordIndexEnd = 51;

        const expectedWordEndIndexEnd = 55;

        let word = getWordFromIndex(exampleStringEnd, expectedWordIndexEnd);

        expect(word.word).toStrictEqual(expectedWordEnd);

        expect(word.end).toStrictEqual(expectedWordEndIndexEnd);
    });

    it('Testing that getWordFromIndex can get a word at the start of a string', () => {
        const exampleStringStart = "This string will get the word at the start";
        const expectedWordStart = "This";

        const expectedWordIndexStart = 0;

        const expectedWordEndIndex = 4;

        let word = getWordFromIndex(exampleStringStart, expectedWordIndexStart);

        expect(word.word).toStrictEqual(expectedWordStart);

        expect(word.end).toStrictEqual(expectedWordEndIndex);
    });
});

describe('getIPAByRules', () => {
    it('Testing that getIPAByRules can get the IPA for the word "Youtube"', () => {
        const inputWord = 'youtube';
        const expectedIPA = 'jutub';

        let wordIPARepresentation = getIPAByRules(inputWord);

        expect(wordIPARepresentation).toStrictEqual(expectedIPA);
    });

    it('Testing the default rules returned by getIPAByRules ', () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const expectedDefaultRules = 'abkdfghɪjklmŋoʊpqɹstuvwksjz';

        let alphabetIPARepresentation = getIPAByRules(alphabet);

        expect(alphabetIPARepresentation).toStrictEqual(expectedDefaultRules);

        //testing u and e seperatly because they don't use the default when followed by 't' and 'd' respectively
        const e = 'e';
        const u = 'u';

        const defaultERule = 'e';
        const defaultURule = 'ə';

        let eIPA = getIPAByRules(e);
        let uIPA = getIPAByRules(u);

        expect(eIPA).toStrictEqual(defaultERule);
        expect(uIPA).toStrictEqual(defaultURule);
    });
});
