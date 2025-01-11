import { describe, it, expect } from "vitest";
import { generateMouthFrames } from '../public/jsFiles/generateMouthFrames.js'

describe('generateMouthFrames', () => {
    it('Testing that hello returns the expected frame numbers', () => {
        const expectedArray = [1, 11, 3, 4];
        const IPAHello = 'hʌlowˈ';

        let receivedArray = generateMouthFrames(IPAHello);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "Oval mouth" frame number', () => {
        const expectedArray = [1, 1, 1, 1];
        const ovalMouthLetters = 'hɪeɛ';

        let receivedArray = generateMouthFrames(ovalMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "Oval mouth" frame number', () => {
        const expectedArray = [2, 2, 2, 2];
        const ghostMouthLetters = 'əɜrʊ';

        let receivedArray = generateMouthFrames(ghostMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "tongue teeth mouth" frame number', () => {
        const expectedArray = [3, 3, 3];
        const tongueTeethMouthLetters = 'ðlθ';

        let receivedArray = generateMouthFrames(tongueTeethMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "circle mouth" frame number', () => {
        const expectedArray = [4, 4, 4, 4, 4, 4];
        const circleMouthLetters = 'əʊuwoʊaʊɔɪ';

        let receivedArray = generateMouthFrames(circleMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "bite lip mouth" frame number', () => {
        const expectedArray = [5, 5];
        const lipBiteMouthLetters = 'fv';

        let receivedArray = generateMouthFrames(lipBiteMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "hmm mouth" frame number', () => {
        const expectedArray = [6, 6, 6];
        const hmmMouthLetters = 'bpm';

        let receivedArray = generateMouthFrames(hmmMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "top teeth mouth" frame number', () => {
        const expectedArray = [7, 7, 7, 7, 7, 7];
        const topTeethMouthLetters = 'dgʤknŋ';

        let receivedArray = generateMouthFrames(topTeethMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "teeth down mouth" frame number', () => {
        const expectedArray = [8, 8];
        const teethdownMouthLetters = 'tʧ';

        let receivedArray = generateMouthFrames(teethdownMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "teeth up mouth" frame number', () => {
        const expectedArray = [9, 9, 9, 9, 9, 9];
        const teethdownMouthLetters = 'ijsʃzʒ';

        let receivedArray = generateMouthFrames(teethdownMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "wide mouth" frame number', () => {
        const expectedArray = [10, 10, 10];
        const wideMouthLetters = 'æeɪɪə';

        let receivedArray = generateMouthFrames(wideMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });

    it('Testing all the letters that should return the "blob mouth" frame number', () => {
        const expectedArray = [11, 11, 11, 11, 11];
        const blobMouthLetters = 'aɒʌaɪeə';

        let receivedArray = generateMouthFrames(blobMouthLetters);

        expect(receivedArray).toStrictEqual(expectedArray);
    });
})