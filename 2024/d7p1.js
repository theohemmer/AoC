const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);
let task1 = 0;

const numbers = input.map(x => x.split(/:| /g).map(x => parseInt(x)));
const valids = numbers.map(x => {
    const to_validate = x.shift();
    const size = x.length - 2;
    const pos = Array(Math.pow(2, size));
    for (let i = 0; i < Math.pow(2, size); i++) {
        pos[i] = i.toString(2).padStart(size, "0");
    }
    const eqs = pos.map((v, i) => {
        const rep = v.replace(/0/g, "*").replace(/1/g, "+").split("");
        return Array(size + 1).fill('(').join("") + ([].concat(...x.map((n, idx) => [n, rep[idx - 1]])).slice(2, -1).map((x, idx) => idx % 2 == 0 ? x + ')' : x )).join("");
    });
    for (const eq of eqs) {
        if (eval(eq) == to_validate) {
            task1 += to_validate;
            break;
        }
    }
});

console.log(task1);