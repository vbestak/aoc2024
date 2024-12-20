const fs = require('fs');

const MIN_LEVEL_DIFF = 1;
const MAX_LEVEL_DIFF = 3;

function isReportSafe(report) {
    let isIncreasingReport = report[0] > report[1];

    return report.every((level, index) => {
        if (index === report.length - 1) return true;

        const diff = Math.abs(level - report[index + 1]);
        const isSafeDiff = diff >= MIN_LEVEL_DIFF && diff <= MAX_LEVEL_DIFF;

        if (!isSafeDiff) {
            return false;
        }

        if (isIncreasingReport) {
            return level > report[index + 1]
        }

        return level < report[index + 1]
    })
}

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    const lines = data.split('\n').map(line => line.split(" ").map(num => Number(num)));

    let safe = 0;
    lines.forEach(report => {
        if (isReportSafe(report)) {
            safe++;
            return;
        }

        for (let i = 0; i < report.length; i++) {
            const modifiedReport = report.filter((_, index) => index !== i);

            if (isReportSafe(modifiedReport)) {
                safe++;
                break;
            }
        }
    })

    console.log(safe)
} catch (err) {
    console.error('Error reading file:', err);
}