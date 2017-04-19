

<!-- .slide: style="font-size: 60%" -->

## Javascript Promise


```js
function loadProfile(id) {
    return new Promise((success, failure) => {
        setTimeout(() => {
            success({id : id, name : `foo${id}`, avatarUrl : `url${id}`});
        }, 1000);
    })
}


function loadImage(url) {
    return new Promise((success, failure) => {
        setTimeout(() => {
            if (url === 'url1') {
                success(`[massive of data ${url} ...]`);
            } else {
                failure(Error(`url can not be load: ${url}`));
            }
        }, 1000);
    })
}


function loadAvatarImage(id) {
    return loadProfile(id).then((profile) => loadImage(profile.avatarUrl));
}
```

我们继续修改之前那个例子，使用 `Promise` 重写

---

### `Promise` 的特点

- 单向状态机
- 消费者和生产者隔离<br>
  从外部只能观察状态而无法改变状态
- 链式传导
- 仍然存在的问题
  - 错误处理
  - 流程控制不直观，代码不容易阅读
  - 学习成本偏高

---

<!-- .slide: style="font-size: 60%" -->


```js
// 继续完成那个例子 - 串行版本
let start = Date.now();
let promise = Promise.resolve();
for (let id = 1; id <= 2; id++) {
    promise = promise.then(() => loadAvatarImage(id))
        .then(data => console.log(`got avatar image data: ${data}`))
        .catch(e => console.log(`something wrong: ${e}`));
}
promise.then(() => {
    console.log(`done sequentially in time: ${Date.now() - start}`);
});
```


```js
// 并行版本: Promise.all
console.log('');
let start = Date.now();
let jobs = [];
for (let id = 1; id <= 2; id++) {
    jobs.push(loadAvatarImage(1)
        .then(data => console.log(`got avatar image data: ${data}`))
        .catch(e => console.log(`something wrong: ${e}`))
    )
}
Promise.all(jobs).then(() => {
    console.log(`done parallelly in time: ${Date.now() - start}`);
});

```
<!-- .element: class="fragment" data-fragment-index="2" -->


```js
// 运行结果和 CPS 版本一致
```
<!-- .element: class="fragment" data-fragment-index="3" -->
