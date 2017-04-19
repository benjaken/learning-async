#!/usr/bin/env node
"use strict";

function loadProfile(id, callback) {
    setTimeout(() => {
        callback({id : id, name : `foo${id}`, avatarUrl : `url${id}`});
    }, 1000);
}


function loadImage(url, callback) {
    setTimeout(() => {
        callback(`[massive of data ${url} ...]`);
    }, 1000);
}


function loadAvatarImage(id, callback) {
    loadProfile(id, function (profile) {
        loadImage(profile.avatarUrl, callback);
    });
}


loadAvatarImage(1, function (data) {
    console.log(`got avatar image data: ${data}`);
});


loadProfile(2, function (profile) {
    loadImage(profile.avatarUrl, function (data) {
        console.log(`got avatar image data: ${data}`);
    });
});

