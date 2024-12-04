const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);
const lines = input.length;
const line_length = input[0].length;

const str = "XMAS.";

function rec(input, y, x, dirY, dirX, nextCharPos = 1)
{
    if (str[nextCharPos] == '.')
        return 1;
    y = y + dirY;
    x = x + dirX;

    if (y < 0 || y >= lines)
        return 0;
    if (x < 0 || x >= line_length)
        return 0;

    if (input[y][x] != str[nextCharPos])
        return 0;

    return rec(input, y, x, dirY, dirX, nextCharPos + 1);
}

function check(input, y, x)
{
    let res = 0;

    if (input[y][x] == 'X') {
        res += rec(input, y, x, -1, -1);
        res += rec(input, y, x, -1,  0);
        res += rec(input, y, x, -1,  1);

        res += rec(input, y, x,  0, -1);
        res += rec(input, y, x,  0,  1);

        res += rec(input, y, x,  1, -1);
        res += rec(input, y, x,  1,  0);
        res += rec(input, y, x,  1,  1);
    }
    return res;
}

function checkCross(input, y, x)
{
    if (input[y][x] != 'A') {
        return 0;
    }

    if ((y - 1 < 0) || (y + 1 >= lines))
        return 0;
    if ((x - 1 < 0) || (x + 1 >= line_length))
        return 0;

    let topLeft = input[y - 1][x - 1];
    let topRight = input[y - 1][x + 1];
    let botLeft = input[y + 1][x - 1];
    let botRight = input[y + 1][x + 1];

    if (topLeft != 'M' && topLeft != 'S')
        return 0;
    if (topRight != 'M' && topRight != 'S')
        return 0;

    if (topLeft == 'M' && botRight != 'S')
        return 0;
    if (topLeft == 'S' && botRight != 'M')
        return 0;
    if (topRight == 'M' && botLeft != 'S')
        return 0;
    if (topRight == 'S' && botLeft != 'M')
        return 0;
    return 1;
}

let task1 = 0;
let task2 = 0;
for (let y = 0; y < lines; y++) {
    for (let x = 0; x < line_length; x++) {
        task1 += check(input, y, x);
        task2 += checkCross(input, y, x);
    }
}

console.log(task1);
console.log(task2);