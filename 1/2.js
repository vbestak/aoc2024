const fs = require('fs');

const NUMBER_REGEX = /\d+/g;

try {
    const listA = [];
    const mapB = new Map();

    const data = fs.readFileSync('data.txt', 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== "");
    lines.forEach(line => {
        const [numA, numB] = line.match(NUMBER_REGEX);
        listA.push(+numA);
        mapB.set(+numB, (mapB.get(+numB) + 1) || 1);
    })

    let similarityScore = 0;
    listA.forEach((item) => {
        similarityScore += item * (mapB.get(item) || 0);
    })

    console.log(similarityScore);
} catch (err) {
    console.error('Error reading file:', err);
}