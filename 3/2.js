const fs = require('fs');

const MUL_REGEX = /mul\((\d+),(\d+)\)|(do\(\))|(don't\(\))/g;

try {
    const data = fs.readFileSync('data.txt', 'utf8');

    let active = true;
    let res = 0;
    for (const match of data.matchAll(MUL_REGEX)) {
        const [full, num1, num2] = match;

        if (full === "do()") {
            active = true;
        } else if (full === "don't()") {
            active = false;
        } else if (active) {
            res += +num1 * +num2
        }
    }

    console.log(res);
} catch (err) {
    console.error('Error reading file:', err);
}