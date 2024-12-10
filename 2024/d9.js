const { getInput, getExample } = require('../utils/get_input.js');
const input = getInput();

const memory = input.split("").map((v, i) => {
    let datas = [];
    if (i % 2 == 0) {
        datas = Array(parseInt(v)).fill(parseInt(Math.floor(i / 2)));
    }
    return {
        free: i % 2 == 1 ? parseInt(v) : 0,
        size: i % 2 == 0 ? parseInt(v) : 0,
        datas: datas,
    }
}).filter(x => x.size !== 0 || x.free !== 0);

for (let i = memory.length - 1; i >= 0; i--) {
    if (memory[i].size == 0) continue;
    for (let f = 1; f < memory.length; f++) {
        if (memory[f].free == 0) continue;
        if (memory[i].size == 0) break;
        if (i <= f) continue;
        // Comment next condition for p1
        if (memory[f].free < memory[i].size) continue;
        let move = Math.min(memory[f].free, memory[i].size);
        memory[f].datas = memory[f].datas.concat(...memory[i].datas.slice(0, move));
        memory[i].datas = memory[i].datas.slice(move, memory[i].datas.length);
        memory[i].size -= move;
        memory[i].free += move;
        memory[f].size += move;
        memory[f].free -= move;
    }
}

let res_data = [];

for (let i = 0; i < memory.length; i++) {
    res_data.push(...memory[i].datas)
    if (memory[i].free > 0) {
        res_data.push(...Array(memory[i].free).fill(0))
    }
}

console.log(task1);