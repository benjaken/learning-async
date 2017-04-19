
## Sync / CPS / Async

什么是 CPS?

Continuation-passing style


---

<!-- .slide: style="font-size: 0.7em" -->

### Functional Programing ?

- first class function
  函数第一公民  
- pure function
  纯函数, 无副作用 
  <!-- .element: class="fragment" data-fragment-index="2" -->
- high order function
  高阶函数
  <!-- .element: class="fragment" data-fragment-index="3" -->
- 尾递归优化
  <!-- .element: class="fragment" data-fragment-index="4" -->
- Curry 柯里化
  <!-- .element: class="fragment" data-fragment-index="4" -->
- map / flatMap / reduce
  <!-- .element: class="fragment" data-fragment-index="4" -->

---

<!-- .slide: style="font-size: 0.7em" -->

### Continuation-passing style

- 控制流反转

  inversion of control flow
- 方法调用不允许有返回值, 只允许使用回掉函数 

  so called 'continuation'


---

最简单的例子: Identity function

```js
function id(x) {
  return x ;
}
```
```js
// and then in continuation-passing style:
function id(x, cc) {
  cc(x) ;
}
```


---

<!-- .slide: style="font-size: 70%" -->

```js
function get(url, callback) {
    http.get(url, callback); // async client
}


get('/foo', function (data1, error) {
    get(data1.url, function (data2, error) {
        get(data2.url, function (data3, error) {
            get(data3.url, function (data4, error) {
                console.log(data4);
            });
        });
    });
});
```

![Callback Hell](images/callback_hell.gif)
<!-- .element: class="fragment current-visible" data-fragment-index="2" style="position: absolute; top: 7em; left: 14em" -->

```js
// 舒服点? 
get('/foo',    function (data1, error) {
get(data1.url, function (data2, error) {
get(data2.url, function (data3, error) {
get(data3.url, function (data4, error) {
console.log(data4);
}); }); }); }); // (*) ...........
```
<!-- .element: class="fragment current-visible" data-fragment-index="3" style="position: absolute; top: 20em; left: 8em" -->

```js
// Promise
get('/foo')
    .then(function (data1) { return get(data1); })
    .then(function (data2) { return get(data2); })
    .then(function (data3) { return get(data3); })
    .then(function (data4) { console.log(data4); })
    .catch(function (error) { /* deal with error */ });
```
<!-- .element: class="fragment current-visible" data-fragment-index="4" style="position: absolute; top: 20em; left: 8em" -->


```js
// Async-await
async function doWork() {
    try {
        let data1 = await get('/foo');
        let data2 = await get(data1);
        let data3 = await get(data2);
        let data4 = await get(data3);
        console.log(data4);
    } catch (error) {
        // deal with error
    }
}
```
<!-- .element: class="fragment current-visible" data-fragment-index="5" style="position: absolute; top: 20em; left: 8em" -->
