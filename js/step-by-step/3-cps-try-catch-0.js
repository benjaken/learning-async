#!/usr/bin/env node
"use strict";

function div(dividend, divisor) {
    if (divisor === 0) {
        throw Error("Division by zero");
    } else {
        return dividend / divisor;
    }
}


try {
    console.log(div(1, 0));
} catch (e) {
    console.log(`Catches: ${e}`);
}
