const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);

function getVal (val, mode = "task1") {
	if (val.length == 1)
		return parseInt(val);
    if (mode !== "task2")
        return 0;
	switch (val) {
		case 'one': return 1;
		case 'two': return 2;
		case 'three': return 3;
		case 'four': return 4;
		case 'five': return 5;
		case 'six': return 6;
		case 'seven': return 7;
		case 'eight': return 8;
		case 'nine': return 9;
		case 'zero': return NaN;
		default: return NaN;
	}
}

let task1 = 0;
let task2 = 0;

// This only work for task2 because I've changed the regex for task2 and I'm too tired to retype the regex for task1

console.log(input);

for (let i = 0; i < input.length; i++) {
	let digits = [...input[i].matchAll(/(?:^.*?)((?:\d)|(?:one)|(?:two)|(?:three)|(?:four)|(?:five)|(?:six)|(?:seven)|(?:eight)|(?:nine))(?:.*)((?:\d)|(?:one)|(?:two)|(?:three)|(?:four)|(?:five)|(?:six)|(?:seven)|(?:eight)|(?:nine))(?:.*?$)|((?:\d)|(?:one)|(?:two)|(?:three)|(?:four)|(?:five)|(?:six)|(?:seven)|(?:eight)|(?:nine))/g)][0];
	if (digits === undefined) break;
	if (digits[3] !== undefined) {
		digits[1] = digits[3];
        digits[2] = digits[3];
	}
	digits = [digits[1], digits[2]];
	task1 += getVal(digits[0]) * 10 + getVal(digits[digits.length - 1])
    task2 += getVal(digits[0], "task2") * 10 + getVal(digits[digits.length - 1], "task2")
}

console.log(task1, task2);