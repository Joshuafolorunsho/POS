const removeLetter = (word: string, letter: string = 's') => {
    const lastLetter = word[word.length - 1];

    // check if word already end with letter
    if (lastLetter.toLowerCase() === letter.toLowerCase()) {
        return word.substring(0, word.length - 1);
    }

    return word;
}


export default removeLetter;