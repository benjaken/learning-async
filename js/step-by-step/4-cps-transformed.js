#!/usr/bin/env node
"use strict";

// noinspection JSUnusedLocalSymbols
function loadProfile(id, success, failure) {
    setTimeout(() => {
        success({id : id, name : `foo${id}`, avatarUrl : `url${id}`});
    }, 1000);
}


// noinspection JSUnusedLocalSymbols
function loadImage(url, success, failure) {
    setTimeout(() => {
        if (url === 'url1') {
            success(`[massive of data ${url} ...]`);
        } else {
            failure(Error(`url can not be load: ${url}`));
        }
    }, 1000);
}


function loadAvatarImage(id, success, failure) {
    loadProfile(id, function (profile) {
        loadImage(profile.avatarUrl, success, failure);
    }, failure);
}


function forEachCps(arr, visitor, done) {
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

let start = Date.now();
forEachCps([1, 2], function (id, index, next) {
    loadAvatarImage(id,
        /* success */ function (data) {
            console.log(`got avatar image data: ${data}`);
            next();
        },
        /* failure */ function (e) {
            console.log(`something wrong: ${e}`);
            next();
        }
    );
}, function () {
    console.log(`done sequentially in time: ${Date.now() - start}`);
});


function parallelForEachCps(arrayLike, visitor, done) {
    let doneCount = 0;
    for (let i = 0; i < arrayLike.length; i++) {
        visitor(arrayLike[i], i, function () {
            doneCount++;
            if (doneCount === arrayLike.length) {
                done();
            }
        });
    }
}

setTimeout(function () {
    console.log('');
    start = Date.now();
    parallelForEachCps([1, 2], function (id, index, next) {
        loadAvatarImage(id,
            /* success */ function (data) {
                console.log(`got avatar image data: ${data}`);
                next();
            },
            /* failure */ function (e) {
                console.log(`something wrong: ${e}`);
                next();
            }
        );
    }, function () {
        console.log(`done parallelly in time: ${Date.now() - start}`);
    });
}, 4500);
