#!/usr/bin/env node
"use strict";

async function delay(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

async function loadProfile(id) {
    await delay(1000);
    return {id : id, name : `foo${id}`, avatarUrl : `url${id}`};
}


async function loadImage(url) {
    await delay(1000);
    if (url === 'url1') {
        return `[massive of data ${url} ...]`;
    }
    throw Error(`url can not be load: ${url}`);
}


async function loadAvatarImage(id) {
    let profile = await loadProfile(id);
    return loadImage(profile.avatarUrl);
}


setTimeout(async () => {
    let start = Date.now();
    for (let id = 1; id <= 2; id++) {
        try {
            console.log(`got avatar image data: ${await loadAvatarImage(id)}`);
        } catch (e) {
            console.log(`something wrong: ${e}`);
        }
    }
    console.log(`done sequentially in time: ${Date.now() - start}`);
}, 0);


setTimeout(async () => {
    console.log('');
    let start = Date.now();
    let jobs = [1, 2].map(id => {
        return (async () => {
            try {
                console.log(`got avatar image data: ${await loadAvatarImage(id)}`);
            } catch (e) {
                console.log(`something wrong: ${e}`);
            }
        })();
    });
    await Promise.all(jobs);
    console.log(`done parallelly in time: ${Date.now() - start}`);
}, 4500);
