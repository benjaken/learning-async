#!/usr/bin/env node
"use strict";

(function () {

    function time() {
        return Date.now() - start;
    }

    let start = Date.now();
    let intervalObj = setInterval(() => console.log(`${time()}: Alive`), 1000);
    setTimeout(() => clearInterval(intervalObj), 9500);

    let futureValue;
    setTimeout(function () {
        futureValue = 'foo';
    }, 10000);

    while (futureValue === undefined) {
        require('deasync').runLoopOnce();
    }

    // noinspection JSUnusedAssignment
    console.log(`${time()}: got futureValue: ${futureValue}`);
})();
