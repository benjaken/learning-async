#!/usr/bin/env node
"use strict";

(function () {

    function time() {
        return Date.now() - start;
    }

    let start = Date.now();
    let intervalObj = setInterval(() => console.log(`${time()}: Alive`), 1000);
    setTimeout(() => clearInterval(intervalObj), 5500);

    setTimeout(async function () {
        console.log(`${time()}: Before exec`);
        let result = (await execFileAsync('sh', ['-c', 'echo foo; sleep 2'], {
            stdio : [process.stdin, 'pipe', process.stderr], encoding : 'utf8'
        })).trim();
        console.log(`${time()}: After exec: ${result}`);
    }, 1500);

})();


async function execFileAsync(command, args, options) {
    return new Promise((resolve, reject) => {
        // noinspection JSUnusedLocalSymbols
        require('child_process').execFile(command, args, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}
