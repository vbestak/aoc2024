const fs = require('fs');

const TIMER_LABEL = "EXECUTION_TIME";

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

    console.time(TIMER_LABEL);

    const visitedMap = new Set();
    const mapBound = {
        x: {min: 0, max: grid[0].length - 1},
        y: {min: 0, max: grid.length - 1},
    }

    const guardPositionOriginal = {x: 0, y: 0};
    grid.some((row, yIndex) => {
        return row.some((item, xIndex) => {
            if (item === GUARD) {
                guardPositionOriginal.x = xIndex;
                guardPositionOriginal.y = yIndex;
                return true;
            }
        })
    })

    let loopObstacleCount = new Set();
    let guardRotation = 0;
    let guardPosition = {...guardPositionOriginal}
    while (true) {
        visitedMap.add(generatePositionKey(guardPosition))

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


        if (visitedMap.has(generatePositionKey(newGuardPosition))) {
            checkForLoop(0, guardPositionOriginal, mapBound, grid, newGuardPosition) && loopObstacleCount.add(generatePositionKey(newGuardPosition));
        } else if (checkForLoop(guardRotation, guardPosition, mapBound, grid, newGuardPosition)) {
            loopObstacleCount.add(generatePositionKey(newGuardPosition));
        }


        guardPosition.x = newGuardPosition.x;
        guardPosition.y = newGuardPosition.y;
    }

    console.log(`unique loop spots: ${loopObstacleCount.size}`);
} catch (err) {
    console.error('Error reading file:', err);
}

console.timeEnd(TIMER_LABEL);

function checkForLoop(guardRotation, __guardPosition, __mapBound, __grid, __newObstaclePosition) {
    const guardPosition = {...__guardPosition};
    const mapBound = {...__mapBound};
    // dont need hard copy for now
    const grid = __grid;

    const visitedMap = new Set();

    while (true) {
        const key = generatePositionKey(guardPosition, guardRotation);
        if (visitedMap.has(key)) {
            return true;
        }

        visitedMap.add(key);

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
        if (grid[newGuardPosition.y][newGuardPosition.x] === OBSTACLE
            || (newGuardPosition.y === __newObstaclePosition.y && newGuardPosition.x === __newObstaclePosition.x)) {
            guardRotation++;
            continue;
        }

        guardPosition.x = newGuardPosition.x;
        guardPosition.y = newGuardPosition.y;
    }

    return false;
}

function generatePositionKey(position, rotation = 0) {
    return `x:${position.x};y:${position.y};rotation:${rotation % MOVEMENT.length};`;
}