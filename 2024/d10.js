const { getInput, getExample } = require('../utils/get_input.js');
const input = getExample().split(/\n/g);
const input_str = input.join("");
const line_length = input[0].length;

let nines = [];

function check_trail(x, y, prev)
{
    if (x < 0 || x >= line_length) return 0;
    if (y < 0 || y >= input.length) return 0;
    let step = parseInt(input_str.charAt(y * line_length + x));
    if (step != prev + 1) {
        return 0;
    }
    // Uncomment the next two line for p1
    //if (nines.find(pos => pos[0] == x && pos[1] == y) != undefined)
    //    return 0;
    if (step == 9) {
        nines.push([x, y]);
        return 1;
    }
    return (check_trail(x + 1, y, step)
          + check_trail(x - 1, y, step)
          + check_trail(x, y + 1, step)
          + check_trail(x, y - 1, step))
}

let task1 = 0;

input_str.split("").forEach((_, i) => {
    nines = [];
    task1 += check_trail(i % line_length, Math.floor(i / line_length), -1);
});

console.log(task1);