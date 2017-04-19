
##  try-catch

<!-- .slide: style="font-size: 65%" -->

```javascript
function div(dividend, divisor) {
    if (divisor === 0) {
        throw Error("Division by zero");
    }
    return dividend / divisor;
}


try {
    console.log(div(1, 0));
} catch (e) {
    console.log(`Catches: ${e}`);
}
```

---

<!-- .slide: style="font-size: 65%" -->
```js
// 要实现异常处理，需要两个 continuation, 一个对应成功的分支, 另一个对应失败分支
function div(dividend, divisor, success, failure) {
    if (divisor === 0) {
        throwIt(Error("Division by zero"), success, failure);
        // 由于 continuation 回掉结束并不会交换控制权, 须使用 else 避免 continuation 结束后代码被执行
    } else {
        // 对比一下 Direct Style 的差异, return 和 throw 都会结束 sub-routine 的控制权
        success(dividend / divisor);
    }
}

function tryIt(tryBlock, catchBlock, success, failure) {
    tryBlock(success, function (errorMsg) {
        catchBlock(errorMsg, success, failure);
    });
}

function throwIt(error, success, failure) {
    failure(error);
}


tryIt(/* tryBlock= */ function (success, failure) {
    div(1, 0, success, failure);
}, /* catchBlock= */ function (e) {
    console.log(`Catches: ${e}`);
});
 
```

