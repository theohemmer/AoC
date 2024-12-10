const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput().split(/\n/g);

const lines = input.length;
const line_length = input[0].length;
const joined = input.join("");
const initial_guard = joined.match(/\^|<|>|v/g);
const dirs = [[0, 1], [-1, 0], [0, -1], [1, 0]];
const dirs_c = "v<^>";
let dir = initial_guard == "<" ? 1 : initial_guard == ">" ? 3 : initial_guard == "v" ? 0 : 2;
let pos = [
    joined.indexOf(initial_guard) % line_length,
    Math.floor(joined.indexOf(initial_guard) / line_length)
];

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function check(input, joined, dir, pos)
{
    let it  = 0;
    let successive_full_turn = 0;
    while (true)
    {
        it++;
        const next_x = pos[0] + dirs[dir][0];
        const next_y = pos[1] + dirs[dir][1];
    
        if (next_x < 0 || next_x >= line_length || next_y < 0 || next_y >= lines) {
            break;
        }
        if (joined.charAt(next_y * line_length + next_x) === "#") {
            successive_full_turn++;
            dir = (dir + 1) % 4;
            continue;
        } else {
            if (successive_full_turn % 2 == 1)
                successive_full_turn = 0;
            else if (successive_full_turn == 6) {
                return {
                    completable: false,
                    end_input: input
                };
            }
        }
        if (joined.charAt(next_y * line_length + next_x) === dirs_c.charAt(dir)) {
            return {
                completable: false,
                end_input: input
            };
        }
        input[pos[1]] = input[pos[1]].replaceAt(pos[0], dirs_c.charAt(dir));
        pos[0] = next_x;
        pos[1] = next_y;
        input[pos[1]] = input[pos[1]].replaceAt(pos[0], dirs_c.charAt(dir));
        joined = input.join("");
    }
    return {
        completable: true,
        end_input: input
    };
}

function prepare(input, joined, dir, pos, block_x, block_y)
{
    let joined_2 = joined;
    let input_2 = input.join("\n").split(/\n/g);
    let pos_2 = [pos[0], pos[1]];
    input_2[block_y] = input_2[block_y].replaceAt(block_x, "#");
    return check(input_2, joined_2, dir, pos_2);
}

let resolved = [];
for (let i = 0; i < joined.length; i++) {
    console.log(i + " / " + joined.length);
    resolved.push(prepare(input, joined, dir, pos, i % line_length, Math.floor(i / line_length)));
}

let res = check(input, joined, dir, pos);

console.log(res.end_input.join("").split("").filter(x => "><^v".indexOf(x) !== -1).length);
console.log(resolved.filter(x => x.completable === false).length);