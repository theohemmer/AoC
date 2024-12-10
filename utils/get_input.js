const fs = require('fs');

function getInput() {
    try {
        const data = fs.readFileSync('./input', 'utf-8');
        let sanitized = data;
        if (data.endsWith("\n"))
            sanitized = data.substring(0, data.lastIndexOf("\n"));
        sanitized = data.replace(/\r/g, "");
        return sanitized;
    } catch (e) {
        console.error(e);
        process.exit(0);
    }
}

function getExample()
{
    try {
        const data = fs.readFileSync('./example', 'utf-8');
        let sanitized = data;
        if (data.endsWith("\n"))
            sanitized = data.substring(0, data.lastIndexOf("\n"));
        sanitized = data.replace(/\r/g, "");
        return sanitized;
    } catch (e) {
        console.error(e);
        process.exit(0);
    }
}

module.exports = { getInput, getExample };