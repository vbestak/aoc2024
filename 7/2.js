const fs = require('fs');

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    const lines = data.split('\n');
    const equations = [];

    lines.forEach(line => {
        const [res, numbers] = line.split(':');
        const nums = numbers.split(" ").filter(Boolean).map(Number);
        equations.push({res, nums});
    })


    let res = 0;
    equations.forEach(equation => {
        const correct = checkEquationTruth(equation);
        if (correct) {
            res += +equation.res;
        }
    })

    console.log(`result: ${res}`);
} catch (err) {
    console.error('Error reading file:', err);
}

function checkEquationTruth(equation) {
    const {res, nums} = equation;

    const reversedNums = [...nums].reverse()
    const first = reversedNums.pop();
    return evaluateEquation(+res, reversedNums, first);
}

function evaluateEquation(result, numbers, curr) {
    if (!numbers.length) {
        return result === curr;
    }

    const numbersCopy = [...numbers];
    const temp = numbersCopy.pop();

    return evaluateEquation(result, numbersCopy, curr + temp)
        || evaluateEquation(result, numbersCopy, curr * temp)
        || evaluateEquation(result, numbersCopy, +`${curr}${temp}`);
}