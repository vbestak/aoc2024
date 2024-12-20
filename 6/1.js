const fs = require('fs');

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    const lines = data.split('\n');
    console.log("res");
} catch (err) {
    console.error('Error reading file:', err);
}