

## 把所有轮子装在一起

<!-- .slide: style="font-size: 60%" -->

```javascript
function loadAvatarImage(id, success, failure) { /* ... */ }

// ... ...

let start = Date.now();
forEachCps([1, 2], function (id, index, next) {
    loadAvatarImage(id,
        /* success */ function (data) {
            console.log(`got avatar image data: ${data}`);
            next(); // (*) 回顾点: forEachCps 的实现依赖 visitor 的回掉
        },
        /* failure */ function (e) {
            console.log(`something wrong: ${e}`);
            next(); // (*) 回顾点: forEachCps 的实现依赖 visitor 的回掉
        }
    );
}, function () {
    console.log(`done sequentially in time: ${Date.now() - start}`);
});

```

```js

// 执行结果
// got avatar image data: [massive of data url1 ...]
// something wrong: Error: url can not be load: url2
// done sequentially in time: 4041
```
<!-- .element: class="fragment" data-fragment-index="2" -->

---

<!-- .slide: style="font-size: 60%" -->

```js



// ... ...

let start = Date.now();
parallelForEachCps([1, 2], function (id, index, next) {
    loadAvatarImage(id,
        /* success */ function (data) {
            console.log(`got avatar image data: ${data}`);
            next(); // (*) 回顾点: forEachCps 的实现依赖 visitor 的回掉
        },
        /* failure */ function (e) {
            console.log(`something wrong: ${e}`);
            next(); // (*) 回顾点: forEachCps 的实现依赖 visitor 的回掉
        }
    );
}, function () {
    console.log(`done parallelly in time: ${Date.now() - start}`);
});

```

```js

// got avatar image data: [massive of data url1 ...]
// something wrong: Error: url can not be load: url2
// done parallelly in time: 2010
```
<!-- .element: class="fragment" data-fragment-index="2" -->

```text


forEachCps 执行结果是 4 秒, 而 parallelForEachCps 执行结果快了一倍.
在 javascript 单线程执行的基础上, 实现了并发
```
<!-- .element: class="fragment" data-fragment-index="3" -->
