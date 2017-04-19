

## 异步的使用场景

- UI
- Backend

---

### Browser / UI

- 单线程
- 同步阻塞将导致不响应交互 Freeze


---

### 后端

- 满足高并发
- long polling
- 大量线程消耗了太多的资源

---

在现有操作系统架构前提下

一个线程对应一个用户

一个线程对应一次请求

都显得不经济

---

[![](http://ithare.com/wp-content/uploads/part101_infographics_v08.png)
<!-- .element: width="720" height="600" -->
](http://ithare.com/infographics-operation-costs-in-cpu-clock-cycles/)
<!-- .element: target="_blank" -->

<hr section-separator>

## Coroutines

- Lua (2003)
- Ruby (2010)
- C#
- Golang (goroutine)
- <span style="color:lightgray">Python (generators)</span>
- <del style="color:lightgray">ECMA 2015 (ES6, generators)</del>
- ECMA 2016 (ES7)
- Kotlin 1.1 (2017, experimental feature)
- 其它 ... (包括不少其它面向 JVM 的语言)

---

### What is coroutine

- 中文翻译: 协程
- 可以理解为: 程序态流水线



|         | Process        | Thread          | Coroutine |
| ------- | -------------- | --------------- | ------------- |
| 文字描述 | 资源分配最小单位 | Worker / 生产线 | 协同程序
| 开销     | 重             | 一般            | 非常小，几乎可忽略
| 占用资源  | fd / mem      | stack           | closure
| 运行于    | -             | CPU core / HT   | Thread / 其他机器 (分布式计算)
| 切换成本  | -             | 高, 操作系统内核  | 低, 接近无, 应用程序完全控制
| 多任务    | -            | 抢占式多任务      | 协作式多任务
| 等待      | -            | block / wakeup  | suspend / resume

<!-- .element: style="font-size: 50%; margin-top: 3em;" -->

---

### Pro / Cons


|                | Multi-Thread    | Coroutine     |
| -------------  | --------------- | ------------- |
| 有状态网络长连接 | Worst           | Pro
| 持续网络数据传输 | Cons            | Pro
| 高并发，低吞吐量 | Cons            | Pro
| 高并发，高吞吐量 | Good            | Maybe Better
| 运算密集        | Pro             | Cons

<!-- .element: style="font-size: 70%; margin-bottom: 1em;" -->

- 多线程可以复用 CPU 的空闲资源, 代价是 Context Switch
- 协程通过协作式多任务复用线程的空闲资源, 减少阻塞, 代价几乎没有

<!-- .element: style="font-size: 50%" -->
