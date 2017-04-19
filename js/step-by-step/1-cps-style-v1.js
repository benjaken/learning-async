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


let loadAvatarImage = function () {
    let cb; // 显式 closure 创建

    function loadAvatarImage(id, callback) {
        cb = callback;
        loadProfile(id, loadProfileAvatarImage);
    }

    function loadProfileAvatarImage(profile) {
        loadImage(profile.avatarUrl, cb);
    }

    return loadAvatarImage;
}();


loadAvatarImage(1, function (data) {
    console.log(`got avatar image data: ${data}`);
});

