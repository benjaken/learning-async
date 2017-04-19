
##  循环

<!-- .slide: style="font-size: 65%" -->

```javascript
function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    console.log("### Done");
}
```
```javascript

// 第一步：转换为递归
function logArray(arr) {
    logArrayRec(0, arr);
    console.log("### Done");
}

function logArrayRec(index, arr) {
    if (index < arr.length) {
        console.log(arr[index]);
        logArrayRec(index + 1, arr);
    }
    // else: done
}
```
<!-- .element: class="fragment" data-fragment-index="2" -->

---

<!-- .slide: style="font-size: 65%" -->

```js
// 第二步：CPS 转换，这里我们选择转换为更具备通用性的 forEachCps 
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
```

```js
// 请对比和 Array.prototype.forEach 定义上的差别 
/**
 * @param {function(T=, number=, Array.<T>=)} callback(elem, index, array) 
 * @param {*} [thisArg]
 * @return {void}
*/
Array.prototype.forEach = function(callback, thisArg) { /* ... */ };
```
<!-- .element: class="fragment" data-fragment-index="2" -->

```js
// forEachCps 的 visitor 回掉最后一个参数是一个 continuation, 能够实现控制反转
```
<!-- .element: class="fragment" data-fragment-index="3" -->

---

<!-- .slide: style="font-size: 80%" -->

最后看一下并行版本的 `forEachCps`

```js
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

// 因为 visitor 的第三个参数是 continuation, 并行版本才成为可能
// continuation 的运转的前提, 依赖于 visitor 实现对规则的遵守 
```
