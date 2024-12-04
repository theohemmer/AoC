const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);

let muls = input.flatMap(x => { return x.match(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g) } )

let task1 = 0;
let shouldDo = true;

muls.forEach(x => {
    if (x === "do()")
        shouldDo = true;
    else if (x === "don't()")
        shouldDo = false;
    else if (shouldDo) {
        let mul = x.match(/\d+/g).map(x => parseInt(x))
        task1 += mul[0] * mul[1];
    }
});

console.log(task1)

// Here I had some fun for Part 2 :D

eval((("console.log((" + getInput().match(/mul\(\d+,\d+\)|do(n't)?\(\)/g).map(x => x == "do()" ? ")+(" : x == "don't()" ? ")+0*(" : x.match(/\d+/g).join("*") + "+" ).join("") + "))")).replace(/\+\)/g, ")"));
eval((("console.log((" + getInput().match(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g).map(x => x == "do()" ? ")+(" : x === "don't()" ? ")+0*(" : Math.imul(...x.match(/\d+/g)) + "+" ).join("") + "))")).replace(/\+\)/g, ")"));
console.log(eval("(" + getInput().match(/mul\(\d+,\d+\)|do(n't)?\(\)/g).map(x => x.match(/\d+/g)?.join("*")?.concat("+") ?? `)+${x[2] == "("}*(`).join("").replace(/\+($|\))/g, ")")));
console.log(eval(`(${getInput().match(/mul\(\d+,\d+\)|do(n't)?\(\)/g).map(x => x.match(/\d+/g)?.join("*")?.concat("+") ?? `)+${x[2] == "("}*(`).join("").replace(/\+($|\))/g, ")")}`));


console.log(eval(
    "(" +
        getInput()
            .match(/mul\(\d+,\d+\)|do(n't)?\(\)/g)
            .map(x => x.match(/\d+/g)?.join("*")?.concat("+") ?? `)+${x[2] == "("}*(`)
            //.map(x => x[0] != "d" ? x.match(/\d+/g).join("*") + "+" : `)+${x[2] == "("}*(` )
            //.map(x => x[0] != "d" ? x.match(/\d+/g).join("*") + "+" : `)+${x[2] == "("}*(` )
            //.map(x => x == "do()" ? ")+(" : x == "don't()" ? ")+0*(" : x.match(/\d+/g).join("*") + "+" )
            .join("")
    .replace(/\+($|\))/g, ")"))
);