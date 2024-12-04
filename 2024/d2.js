const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);

let arrays = input.map(x => x.split(/\s+/g).map(y => parseInt(y)));

Array.prototype.dropAt = function (idx) {
    return this.filter((_, i) => i !== idx);
}

function isOrdered(arr, i, j) {
    return (arr[0] > arr[1]) == (arr[i] > arr[j])
}

function check(x, allowError = false) {
    for (let i = 1; i < x.length; i++) {
        let abs = Math.abs(x[i] - x[i - 1]);
        if (abs < 1 || abs > 3 || !isOrdered(x, i - 1, i)) {
            if (allowError === false)
                return false;
            return check(x.dropAt(i)) || check(x.dropAt(i - 1));
        }
    }
    return true;
}

let task1 = arrays.filter(x => check(x)).length;
let task2 = arrays.filter(x => check(x, true)).length;

console.log(task1, task2);