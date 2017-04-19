#!/usr/bin/env node
"use strict";

function logArray(arr) {
    logArrayRec(0, arr);
    console.log("### Done");
}

function logArrayRec(index, arr) {
    if (index < arr.length) {
        console.log(arr[index]);
        logArrayRec(index + 1, arr);
    }
    // else: done
}

logArray([1, 2, 3]);
