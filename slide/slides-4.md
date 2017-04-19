
## Converting to CPS

<!-- .slide: style="font-size: 65%" -->

```javascript
function loadAvatarImage(id, callback) {
    loadProfile(id, loadProfileAvatarImage);  // (*)
    function loadProfileAvatarImage(profile) {
        loadImage(profile.avatarUrl, callback);
    }
}
```

```javascript
let loadAvatarImage = function () {
    let cb;
    function loadAvatarImage(id, callback) {
        cb = callback;
        loadProfile(id, loadProfileAvatarImage);
    }
    function loadProfileAvatarImage(profile) {
        loadImage(profile.avatarUrl, cb);
    }
    return loadAvatarImage;
}();
```
<!-- .element: class="fragment" data-fragment-index="2" -->


```js
function loadProfile(id, callback) {
    setTimeout(() => {
        callback({...});
    }, 1000);
}


function loadImage(url, callback) {
    setTimeout(() => {
        callback(`...`);
    }, 1000);
}

```
<!-- .element: class="fragment" data-fragment-index="3" -->
