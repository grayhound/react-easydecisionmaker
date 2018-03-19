class GetAlphabetLetter {
    constructor() {
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    }

    getLetterById(letterId) {
        return this.alphabet[letterId].toUpperCase();
    }
}

export default GetAlphabetLetter;