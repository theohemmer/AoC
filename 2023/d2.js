const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput();

// Inset task code here

let arr = input.split(/\n/g);

function getColorMax(arr)
{
    let max = 0;

    arr = arr.map(x => parseInt(x.split(/ /g)[0]))
    arr.forEach(x => { max = x > max ? x : max });
    return max;
}

function getAllInfos(game)
{
    id = parseInt(game.match(/\d+/g)[0]);
    redMax = getColorMax(game.match(/\d+ red/g));
    blueMax = getColorMax(game.match(/\d+ blue/g));
    greenMax = getColorMax(game.match(/\d+ green/g));

    return {
        id: id,
        red: redMax,
        blue: blueMax,
        green: greenMax
    }
}

arr = arr.map(x => getAllInfos(x));

let task2 = 0;
arr.forEach(x => { task2 += x.red * x.green * x.blue });

arr = arr.filter(x => {
    if (x.red <= 12 && x.green <= 13 && x.blue <= 14)
        return true;
    return false;
});

let task1 = 0;
arr.forEach(x => { task1 += x.id });

console.log(task1, task2);