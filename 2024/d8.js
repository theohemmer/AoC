const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);
const line_length = input[0].length;
let task1 = 0;

let antennas = {}
input.join("").split("").forEach((v, i) => {
    if (v === ".") return;
    if (antennas[v] == undefined)
        antennas[v] = [];
    antennas[v].push([i % line_length, Math.floor(i / line_length)]);
});

let positions = [];

function check(x, y, dx, dy)
{
    if (x < 0 || x >= line_length)
        return false;
    if (y < 0 || y >= input.length)
        return false;
    // Comment next two lines for p1
    if (dx != 0 || dy != 0)
        check(x + dx, y + dy, dx, dy);
    if (positions.find(pos => pos[0] === x && pos[1] === y ) !== undefined)
        return false;
    positions.push([x, y]);
    return true;
}

for (k in antennas) {
    for (let i = 0; i < antennas[k].length; i++) {
        const [x1, y1] = antennas[k][i];
        for (let o = i + 1; o < antennas[k].length; o++) {
            const [x2, y2] = antennas[k][o];
            const [dx, dy] = [x2 - x1, y2 - y1];
            check(x1, y1, 0, 0);
            check(x2, y2, 0, 0);
            check(x1 - dx, y1 - dy, -dx, -dy);
            check(x2, y2, dx, dy);
        }
    }
}
console.log(positions);
console.log(positions.length);