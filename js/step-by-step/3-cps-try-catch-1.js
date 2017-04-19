#!/usr/bin/env node
"use strict";

function div(dividend, divisor, success, failure) {
    if (divisor === 0) {
        throwIt(Error("Division by zero"), success, failure);
    } else {
        success(dividend / divisor);
    }
}

function tryIt(tryBlock, catchBlock, success, failure) {
    tryBlock(success, function (errorMsg) {
        catchBlock(errorMsg, success, failure);
    });
}

// noinspection JSUnusedLocalSymbols
function throwIt(error, success, failure) {
    failure(error);
}


tryIt(/* tryBlock= */ function (success, failure) {
    div(1, 0, success, failure);
}, /* catchBlock= */ function (e) {
    console.log(`Catches: ${e}`);
});

