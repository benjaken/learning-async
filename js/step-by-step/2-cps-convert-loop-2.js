#!/usr/bin/env node
"use strict";

function logArray(arr) {
    forEachCps(arr, function (elem, index, next) {  // (*)
        console.log(elem);
        next();
    }, function () {
        console.log("### Done");
    });
}

function forEachCps(arr, visitor, done) {  // (**)
    forEachCpsRec(0, arr, visitor, done)
}

function forEachCpsRec(index, arr, visitor, done) {
    if (index < arr.length) {
        visitor(arr[index], index, function () {
            forEachCpsRec(index + 1, arr, visitor, done);
        });
    } else {
        done();
    }
}

logArray([1, 2, 3]);
