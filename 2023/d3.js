const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);

function isDigit(char)
{
    if ("0 1 2 3 4 5 6 7 8 9".split(/ /g).indexOf(char) >= 0) {
        return true;
    }
    return false;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function getSafe(tab, x, y)
{
    if (x < 0 || y < 0)
        return NaN;
    if (y >= tab.length || x >= tab[y].length)
        return NaN;
    let char = tab[y].charAt(x);
    if (isDigit(char)) {
        let starts = x;
        let ends = x;
        for (; starts > 0 && isDigit(tab[y].charAt(starts - 1)); starts--);
        for (; ends < tab[y].length && isDigit(tab[y].charAt(ends)); ends++);
        let number = parseInt(tab[y].substring(starts, ends));
        for (let i = starts; i < ends; i++) {
            tab[y] = tab[y].replaceAt(i, '.');
        }
        return number
    }
    return NaN;
}

function getAdgacentsNumbers(tab, x, y)
{
    let adgacents = [];

    adgacents.push(getSafe(tab, x - 1, y - 1));
    adgacents.push(getSafe(tab, x, y - 1));
    adgacents.push(getSafe(tab, x + 1, y - 1));

    adgacents.push(getSafe(tab, x - 1, y));
    adgacents.push(getSafe(tab, x + 1, y));
    
    adgacents.push(getSafe(tab, x - 1, y + 1));
    adgacents.push(getSafe(tab, x, y + 1));
    adgacents.push(getSafe(tab, x + 1, y + 1));

    adgacents = adgacents.filter(x => !isNaN(x));
    return adgacents;
}

let task1 = 0;
let task2 = 0;

for (let y = 0; y < input.length; y++)
{
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
        if (!isDigit(line.charAt(x)) && line.charAt(x) != ".") {
            let numbers = getAdgacentsNumbers(input, x, y);
            numbers.forEach(x => { task1 += x });
            if (line.charAt(x) == "*" && numbers.length == 2) {
                task2 += numbers[0] * numbers[1];
            }
        }
    }
}

console.log(task2);