const fs = require('fs');

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    const updates = data.split('\n');

    const rulesData = fs.readFileSync('rules.txt', 'utf8');
    const rule = rulesData.split('\n');

    const sideA = [];
    const sideB = [];

    rule.forEach(rule => {
        const [a, b] = rule.split('|');
        sideA.push(Number(a));
        sideB.push(Number(b));
    })


    let res = 0;
    updates.forEach(update => {
        res += getInvalidUpdateRes(update, sideA, sideB);
    })


    console.log(`res: ${res}`);
} catch (err) {
    console.error('Error reading file:', err);
}


function getInvalidUpdateRes(update, sideA, sideB, isInvalid) {
    const updateValues = update.split(',').map(Number);
    const aTemp = sideA.map(item => ({val: item, seen: false}));
    const bTemp = sideB.map(item => ({val: item, seen: false}));

    for (let i = 0; i < updateValues.length; i++) {
        const updateValue = updateValues[i];

        const aIndexes = [];
        const bIndexes = [];
        aTemp.forEach((item, index) => {
            const match = item.val === updateValue;
            if (match) {
                item.seen = true;
                aIndexes.push(index);
            }
        });
        bTemp.forEach((item, index) => {
            const match = item.val === updateValue;
            if (match) {
                item.seen = true;
                bIndexes.push(index);
            }
        })

        // check if update follows rules
        let invalidRuleNumberIndex;
        aIndexes.every(item => {
            const isValidRule = !bTemp[item].seen;
            if (!isValidRule) {
                invalidRuleNumberIndex = item;
            }
            return isValidRule;
        })

        if (invalidRuleNumberIndex !== undefined) {
            const updateAIndex = updateValues.findIndex(val => val === sideA[invalidRuleNumberIndex]);
            const updateBIndex = updateValues.findIndex(val => val === sideB[invalidRuleNumberIndex]);
            const newUpdate = [...updateValues];
            const [element] = newUpdate.splice(updateAIndex, 1);
            newUpdate.splice(updateBIndex, 0, element);
            return getInvalidUpdateRes(newUpdate.join(","), sideA, sideB, true);
        }
    }

    if(isInvalid) {
        const midIndex = Math.round(Math.floor(updateValues.length / 2));
        return updateValues[midIndex];
    }

    return 0;
}