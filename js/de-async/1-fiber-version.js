#!/usr/bin/env node
"use strict";

let Fiber = require('fibers');
let Future = require('fibers/future');
(function () {

    function time() {
        return Date.now() - start;
    }

    let start = Date.now();
    let intervalObj = setInterval(() => console.log(`${time()}: Alive`), 1000);
    setTimeout(() => clearInterval(intervalObj), 5500);

    setTimeout(() => {
        // noinspection JSUnresolvedFunction
        Fiber(() => {
            console.log(`${time()}: Before exec`);
            let result = execFileSync('sh', ['-c', 'echo foo; sleep 2'], {
                stdio : [process.stdin, 'pipe', process.stderr], encoding : 'utf8'
            }).trim();
            console.log(`${time()}: After exec: ${result}`);
        }).run();
    }, 1500);

})();

function execFileSync(command, args, options) {
    let future = new Future;
    // noinspection JSUnusedLocalSymbols
    require('child_process').execFile(command, args, options, (error, stdout, stderr) => {
        future.return(stdout);
    });
    return future.wait();
}
