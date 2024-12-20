const fs = require('fs');

const SEARCH_WORD = "XMAS";
const DIRECTIONS = {
    N: {x: -1, y: 0},
    E: {x: 0, y: +1},
    S: {x: +1, y: 0},
    W: {x: 0, y: -1},
    NE: {x: -1, y: +1},
    NW: {x: -1, y: -1},
    SE: {x: +1, y: +1},
    SW: {x: +1, y: -1},
}

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    const matrix = data.split('\n').map(line => line.split(""));

    const resCoordinates = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const res = checkForSearchWord(matrix, SEARCH_WORD, {
                x: rowIndex,
                y: columnIndex
            }, Object.values(DIRECTIONS));
            resCoordinates.push(...res);
        })
    })

    console.log(`${SEARCH_WORD} result count: ${resCoordinates.length}`);
} catch (err) {
    console.error('Error reading file:', err);
}


function checkForSearchWord(matrix, searchWord, initPosition, directions) {
    const yLength = matrix[0].length - 1;
    const xLength = matrix.length - 1;

    const foundWords = [];

    directions.forEach((direction) => {
        const totalX = initPosition.x + direction.x * (searchWord.length - 1);
        const totalY = initPosition.y + direction.y * (searchWord.length - 1);

        if (totalX < 0) return;
        if (totalX > xLength) return;
        if (totalY < 0) return;
        if (totalY > yLength) return;

        let resWord = "";
        const resLetterCoordinates = [];
        for (let i = 0; i < searchWord.length; i++) {
            const newX = initPosition.x + direction.x * i
            const newY = initPosition.y + direction.y * i

            if (!matrix[newX]) {
                const a = 5;
                const b = a;
            }
            if (!matrix[newX][newY]) {
                const a = 5;
                const b = a;
            }
            resWord += matrix[newX][newY];
            resLetterCoordinates.push({x: newX, y: newY});
        }

        if (resWord === searchWord) {
            foundWords.push(resLetterCoordinates);
        }
    })

    return foundWords;
}