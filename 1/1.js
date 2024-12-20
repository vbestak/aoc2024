const fs = require('fs');

const NUMBER_REGEX = /\d+/g;

try {
    const listA = [];
    const listB = [];

    const data = fs.readFileSync('data.txt', 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== "");
    lines.forEach(line => {
        const [numA, numB] = line.match(NUMBER_REGEX);
        listA.push(+numA);
        listB.push(+numB);
    })

    listA.sort((a, b) => a - b);
    listB.sort((a, b) => a - b);

    let totalDistance = 0;
    listA.forEach((item, index) => {
       totalDistance += Math.abs(item - listB[index]);
    })

    console.log(totalDistance);
} catch (err) {
    console.error('Error reading file:', err);
}