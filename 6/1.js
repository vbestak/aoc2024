const fs = require('fs');

const GUARD = "^"
const OBSTACLE = "#"
const MOVEMENT = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
];

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    const grid = data.split('\n')
                            .map((row) => row.split(""));

    const visitedMap = new Set();
    const mapBound = {
        x: {min: 0, max: grid[0].length - 1},
        y: {min: 0, max: grid.length - 1},
    }

    const guardPosition = {x: 0, y: 0};
    grid.some((row, yIndex) => {
        return row.some((item, xIndex) => {
            if (item === GUARD) {
                guardPosition.x = xIndex;
                guardPosition.y = yIndex;
                return true;
            }
        })
    })


    let guardRotation = 0;
    while (true) {
        visitedMap.add(`x:${guardPosition.x};y:${guardPosition.y};`)

        const move = MOVEMENT[guardRotation % MOVEMENT.length];
        const newGuardPosition = {
            x: guardPosition.x + move.x,
            y: guardPosition.y + move.y,
        }

        // is outside map bounds
        // x bound check
        if (newGuardPosition.x < mapBound.x.min) break;
        if (newGuardPosition.x > mapBound.x.max) break;

        // y bound check
        if (newGuardPosition.y < mapBound.y.min) break;
        if (newGuardPosition.y > mapBound.y.max) break;

        // check for obstacle
        if (grid[newGuardPosition.y][newGuardPosition.x] === OBSTACLE) {
            guardRotation++;
            continue;
        }

        guardPosition.x = newGuardPosition.x;
        guardPosition.y = newGuardPosition.y;
    }

    console.log(`unique spots visited: ${visitedMap.size}`);
} catch (err) {
    console.error('Error reading file:', err);
}