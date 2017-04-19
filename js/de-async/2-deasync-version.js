#!/usr/bin/env node
"use strict";

(function () {

    function time() {
        return Date.now() - start;
    }

    let start = Date.now();
    let intervalObj = setInterval(() => console.log(`${time()}: Alive`), 1000);
    setTimeout(() => clearInterval(intervalObj), 5500);

    setTimeout(() => {
        console.log(`${time()}: Before exec`);
        let result = execFileSync('sh', ['-c', 'echo foo; sleep 2'], {
            stdio : [process.stdin, 'pipe', process.stderr], encoding : 'utf8'
        }).trim();
        console.log(`${time()}: After exec: ${result}`);
    }, 1500);

})();

let execFileSync = require('deasync')(function (command, args, options, callback) {
    require('child_process').execFile(command, args, options, callback)
});
