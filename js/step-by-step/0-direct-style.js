#!/usr/bin/env node
"use strict";

function loadProfile(id) {
    require('../lib/sleep')(1000);
    return {id : id, name : `foo${id}`, avatarUrl : `url${id}`};
}


function loadImage(url) {
    require('../lib/sleep')(1000);
    if (url === 'url1') {
        return `[massive of data ${url} ...]`;
    }
    throw Error(`url can not be load: ${url}`);
}


function loadAvatarImage(id) {
    let profile = loadProfile(id);
    return loadImage(profile.avatarUrl);
}


let start = Date.now();
for (let id = 1; id <= 2; id++) {
    try {
        console.log(`got avatar image data: ${loadAvatarImage(id)}`);
    } catch (e) {
        console.log(`something wrong: ${e}`);
    }
}
console.log(`done in time: ${Date.now() - start}`);
