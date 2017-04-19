#!/usr/bin/env node
"use strict";

function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    console.log("### Done");
}

logArray([1, 2, 3]);
