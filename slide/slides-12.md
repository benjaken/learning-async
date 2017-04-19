

<!-- .slide: style="font-size: 60%" -->

## Javascript Async-await


```js
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
```

还是那个例子，改写为 Async-await, 请对比最初的 Direct Style 版本

几乎完全相同, 仅仅是在几个地方多了 `async` 和 `await` 关键字

---

<!-- .slide: style="font-size: 60%" -->

### Javascript async-await 的规则及分析

- async 是关键字, 只能用来修饰 function
- async function 的返回值总是一个 `Promise`, **并且总是立刻返回**<br>
  不管你是否在 async function 内调用
- async function 与任何一个返回 `Promise` 的 function 是等价的
- 只有 async function 的 *直接* 内部才能使用 await 关键字<br>
  比如说, 嵌套函数, 也必须声明为 async 才能在内部 await
- await 操作符会自动展开 `Promise` object 到任意层  （*）              
- `thenable`

```text
除了唯一一点 (Promise 的展开) 必须在语言层面提供机制（比如，event loop 的暴露）
其它所有行为, 实质是语法糖

fiber js 和 async-await 其实语意上很接近
而 deasync 甚至不需要和 async 关键字等价的包装，就利用 event loop 实现了 await   

```
<!-- .element: style="width: 68%" -->

---

<!-- .slide: style="font-size: 60%" -->

### 解决了 Promise 的几个痛点

- 无 callback, 代码容易阅读
- 无需显式处理 future object 状态
- 看起来和同步代码类似，便于人类理解逻辑


---

<!-- .slide: style="font-size: 60%" -->


```js
// 继续完成那个例子 - 串行版本
(async () => {
    let start = Date.now();
    for (let id = 1; id <= 2; id++) {
        try {
            console.log(`got avatar image data: ${await loadAvatarImage(id)}`);
        } catch (e) {
            console.log(`something wrong: ${e}`);
        }
    }
    console.log(`done sequentially in time: ${Date.now() - start}`);
})();
```


```js
// 并行版本: 还是依赖 Promise.all
(async () => {
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
})()

```
<!-- .element: class="fragment" data-fragment-index="2" -->


```js
// 运行结果和 CPS 版本一致
// 除了必须在外面套一个匿名 async 方法以外, 流程上和 Direct Style 几乎完全相同
```
<!-- .element: class="fragment" data-fragment-index="3" -->
