const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);
let task1 = 0;

const numbers = input.map(x => x.split(/: |:| /g).map(x => parseInt(x)));
function validate(arr, act, to_validate) {
    if (act == to_validate && arr.length == 0)
        return true;
    if (arr.length == 0)
        return false;

    return validate(arr.slice(1), arr[0] + act, to_validate) || validate(arr.slice(1), arr[0] * act, to_validate) || validate(arr.slice(1), parseInt(act + "" + arr[0]), to_validate);
}
numbers.forEach(x => {
    const to_validate = x.shift();
    if (validate(x, 0, to_validate))
        task1 += to_validate;
});

console.log(task1);


