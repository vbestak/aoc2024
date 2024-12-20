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
        const updateValues = update.split(',').map(Number);
        const aTemp = sideA.map(item => ({val: item, seen: false}));
        const bTemp = sideB.map(item => ({val: item, seen: false}));

        let isValid = updateValues.every(updateVal => {
            const aIndexes = [];
            const bIndexes = [];
            aTemp.forEach((item, index) => {
                const match = item.val === updateVal;
                if (match) {
                    item.seen = true;
                    aIndexes.push(index);
                }
            });
            bTemp.forEach((item, index) => {
                const match = item.val === updateVal;
                if (match) {
                    item.seen = true;
                    bIndexes.push(index);
                }
            })

            return aIndexes.every(item => {
                return !bTemp[item].seen
            })
        })

        if (isValid) {
            const midIndex = Math.round(Math.floor(updateValues.length / 2));
            res += updateValues[midIndex];
        }
    })


    console.log(`res: ${res}`);
} catch (err) {
    console.error('Error reading file:', err);
}