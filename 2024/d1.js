const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);

arrays = [[], []];
for (let i = 0; i < input.length; i++) {
    arrays[0].push(parseInt(input[i].split(/\s+/g)[0]));
    arrays[1].push(parseInt(input[i].split(/\s+/g)[1]));
}

arrays[0] = arrays[0].sort((a, b) => a - b);
arrays[1] = arrays[1].sort((a, b) => a - b);

console.log(arrays[1])

let task1 = 0;
let task2 = 0;

for (let i = 0; i < arrays[0].length; i++) {
    let max = 0;
    let min = 0;

    if (arrays[0][i] > arrays[1][i]) {
        max = arrays[0][i];
        min = arrays[1][i];
    } else {
        max = arrays[1][i];
        min = arrays[0][i];
    }

    task1 += max - min;
    task2 += arrays[0][i] * arrays[1].filter(x => x == arrays[0][i]).length;
}

console.log(task1, task2);