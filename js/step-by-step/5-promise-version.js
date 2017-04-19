#!/usr/bin/env node
"use strict";

function loadProfile(id) {
    // noinspection JSUnusedLocalSymbols
    return new Promise((success, failure) => {
        setTimeout(() => {
            success({id : id, name : `foo${id}`, avatarUrl : `url${id}`});
        }, 1000);
    })
}


function loadImage(url) {
    return new Promise((success, failure) => {
        setTimeout(() => {
            if (url === 'url1') {
                success(`[massive of data ${url} ...]`);
            } else {
                failure(Error(`url can not be load: ${url}`));
            }
        }, 1000);
    })
}


function loadAvatarImage(id) {
    return loadProfile(id).then((profile) => loadImage(profile.avatarUrl));
}


setTimeout(() => {
    let start = Date.now();
    let promise = Promise.resolve();
    for (let id = 1; id <= 2; id++) {
        promise = promise.then(() => loadAvatarImage(id))
            .then(data => console.log(`got avatar image data: ${data}`))
            .catch(e => console.log(`something wrong: ${e}`));
    }
    promise.then(() => {
        console.log(`done sequentially in time: ${Date.now() - start}`);
    });
}, 0);


setTimeout(() => {
    console.log('');
    let start = Date.now();
    let jobs = [];
    for (let id = 1; id <= 2; id++) {
        jobs.push(loadAvatarImage(1)
            .then(data => console.log(`got avatar image data: ${data}`))
            .catch(e => console.log(`something wrong: ${e}`))
        )
    }
    Promise.all(jobs).then(() => {
        console.log(`done parallelly in time: ${Date.now() - start}`);
    });
}, 4500);
