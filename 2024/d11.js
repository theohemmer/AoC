const { getInput, getExample } = require('../utils/get_input.js');
let input = getInput().split(/ /g).map(x => parseInt(x));

let tree = {};

function compute(x, i)
{
    if (i == 0) return 0;
    let local_increases = 0;
    if (tree[x] !== undefined) {
        if (tree[x].leads !== undefined && tree[x].leads[i] !== undefined)
            return tree[x].leads[i];
        local_increases += compute(tree[x].left, i - 1);
        if (tree[x].right !== undefined) {
            local_increases += compute(tree[x].right, i - 1);
            local_increases += 1;
        }
        if (tree[x].leads === undefined) tree[x].leads = {};
        tree[x].leads[i] = local_increases;
        return local_increases;
    }
    const str = x.toString();
    if (x == 0) {
        tree[x] = { left: 1 };
    } else if (str.length % 2 == 0) {
        tree[x] = {
            left: parseInt(str.slice(0, str.length / 2)),
            right: parseInt(str.slice(str.length / 2, str.length))
        }
    } else {
        tree[x] = { left: x * 2024 };
    }
    local_increases += compute(tree[x].left, i - 1);
    if (tree[x].right !== undefined) {
        local_increases += compute(tree[x].right, i - 1);
        local_increases += 1;
    }
    if (tree[x].leads === undefined) tree[x].leads = {};
    tree[x].leads[i] = local_increases;
    return local_increases;
}

let increases = 0;
input.forEach(x => { increases += compute(x, 75); });
console.log(increases)