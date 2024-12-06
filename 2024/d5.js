const { getInput, getExample } = require('../utils/get_input.js');
const input = getExample().split(/\n\n/g);
let task1 = 0, task2 = 0;

const rules = {}
const updates = input[1].split(/\n/g)
    .map(x => x.split(/,/g).map(x => parseInt(x)));

input[0].split(/\n/g)
    .map(x => [parseInt(x.split('|')[0]), parseInt(x.split('|')[1])])
    .forEach(x => rules[x[0]] = rules[x[0]] ? [...rules[x[0]], x[1]] : [x[1]]);

function fixUpdate(update, rule)
{
    return update.sort((a, b) => {
        if (rules[a] === undefined)
            return 1;
        return rules[a].indexOf(b) === -1 ? 1 : -1;
    });
}

updates.forEach((update) => {
    const fixed = fixUpdate([...update]);
    console.log(fixUpdate(fixed));
    console.log(fixed)
    if (fixed.every((val, idx) => val === update[idx])) {
        task1 += update[Math.floor(update.length / 2)];
    } else {
        task2 += fixed[Math.floor(fixed.length / 2)];
    }
});

console.log(task1, task2);