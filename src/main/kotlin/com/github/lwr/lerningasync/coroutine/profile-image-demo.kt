package com.github.lwr.lerningasync.coroutine

import kotlinx.coroutines.experimental.delay
import kotlinx.coroutines.experimental.launch
import kotlinx.coroutines.experimental.runBlocking

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


fun main(args: Array<String>) = runBlocking {
    run {
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

    run {
        println()
        val start = System.currentTimeMillis()
        val jobs = (1..2).map { id ->
            launch(context) {
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
}

