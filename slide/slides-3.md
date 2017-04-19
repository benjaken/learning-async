
## Sync / Direct Style

```js
function loadAvatarImage(id) {
    let profile = loadProfile(id);
    return loadImage(profile.avatarUrl);
}
```

```js
function loadProfile(id) {
    sleep(1000);            // (*) busy doing something
    return {...};
}

function loadImage(url) {
    sleep(1000);            // (*) busy doing something
    return `...`;
}
```
<!-- .element: class="fragment" data-fragment-index="2" -->

---

<!-- .slide: style="font-size: 63%" -->

```js
// 完整程序
function loadProfile(id) {
    sleep(1000);
    return {id : id, name : `foo${id}`, avatarUrl : `url${id}`};
}


function loadImage(url) {
    sleep(1000);
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

```

```js
// 运行结果
// got avatar image data: [massive of data url1 ...]
// something wrong: Error: url can not be load: url2
// done in time: 4099
```
<!-- .element: class="fragment" data-fragment-index="2" style="margin-top:0" -->
