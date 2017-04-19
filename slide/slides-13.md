

<!-- .slide: style="font-size: 60%" -->

## Kotlin 的 coroutine

@since 1.1

experimental

已完整实现, API 可能还会有调整

---

### Suspending functions
 

新关键字: suspend (异步函数声明)
<!-- .element: style="font-size: 60%" -->

- 异步函数可以调用普通函数
- 普通函数不可以调用异步函数


也就是说，所有需要调用异步函数的函数，都必须为异步函数<br>
这个传染性规则和 CPS 完全一致<br>
这也充分展示了 kotlin DSL 的强大能力
<!-- .element: class="fragment" data-fragment-index="2" -->
<!-- .element: style="font-size: 50%; text-align: left; margin-left: 11em" --> 

---

 

- Kotlin 的 suspend 关键字和 ES7 的 async 作用类似<br>
但 ES7 没有传染性约定, 因为一定会返回 Promise<br>
<br>
- 虽然如此, 但假如一个 ES7 非 async 方法调用了 async 方法, 并且希望使用 
await, 那么就必须也声明为 async 从而也产生了传染性, 这是间接的传染性<br> 
<br>
- ES7 不会阻止程序直接拿 async function 的返回值当 Promise 使用<br>

<!-- .element: style="width: 50%; margin:auto; font-size: 50%; text-align: left;" --> 


---

### loadAvatarImage 的 kotlin 版本

<!-- .slide: style="font-size: 60%" -->


```kotlin
suspend fun loadProfile(id: Int): Map<String, Any> {
    delay(1000L)
    return mapOf("id" to id, "name" to "foo$id", "avatarUrl" to "url$id")
}


suspend fun loadImage(url: String): String {
    delay(1000L)
    if (url == "url1") {
        return "[massive of data $url ...]"
    } else {
        throw Exception("url can not be load: $url")
    }
}


suspend fun loadAvatarImage(id: Int): String {
    val profile = loadProfile(id)
    return loadImage(profile["avatarUrl"] as String)
}
```

对比 ES7 async / await 版本, 除了关键字，其它都完全一样

---

<!-- .slide: style="font-size: 60%" -->


```kotlin
// 串行版本遍历
fun main(args: Array<String>) = runBlocking {
    val start = System.currentTimeMillis()
    for (id in 1..2) {
        try {
            println("got avatar image data: ${loadAvatarImage(id)}")
        } catch (e: Exception) {
            println("something wrong: $e")
        }
    }
    println("done sequentially in time: ${System.currentTimeMillis() - start}")
}    
```


```kotlin
// 并行版本遍历
fun main(args: Array<String>) = runBlocking {
    val start = System.currentTimeMillis()
    val jobs = (1..2).map { id ->
        launch(context) { // 这里可以尝试各种 context (对应不同的线程组)
                          // 会发现, 即使从头到尾都是单一线程, 执行结果都是 2 秒附近, 并行 
            try {
                println("got avatar image data: ${loadAvatarImage(id)}")
            } catch (e: Exception) {
                println("something wrong: $e")
            }
        }
    }
    jobs.forEach { it.join() }
    println("done parallelly in time: ${System.currentTimeMillis() - start}")
}    
```
<!-- .element: class="fragment" data-fragment-index="2" -->


