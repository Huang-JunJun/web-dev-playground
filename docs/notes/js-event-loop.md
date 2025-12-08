### js-event-loop

- 一个你自己总结的「事件循环是什么」
  - 事件循环是浏览器或 Node 等宿主环境用来调度 JavaScript 执行的一套机制。JavaScript 本身是单线程的，事件循环负责在「调用栈」和「各类任务队列」之间不断轮询，让同步代码先执行完，再按照既定顺序依次执行排队好的异步任务。

- 宏任务 vs 微任务的区别
  - 宏任务：
    - 常见来源包括：整体脚本执行、setTimeout、setInterval、部分 I/O 操作、UI 渲染等。
    - 每一轮事件循环开始时，从宏任务队列中取出一个任务执行。
  - 微任务：
    - 常见来源包括：Promise.then/catch/finally、queueMicrotask、MutationObserver 等。
    - 每个宏任务执行结束后，事件循环会立刻检查微任务队列，并将当前队列中的所有微任务依次执行完，再进入下一轮宏任务。
  - 因此：
    - 微任务的优先级高于下一轮宏任务。
    - 但微任务不会打断当前正在执行的同步代码，只会在当前宏任务结束之后统一执行。

- 代码示例与执行顺序解释

```js
console.log('start')

setTimeout(() => {
  console.log('timeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise')
})

console.log('end')
```

- 执行顺序分析：
  - 首先执行整体脚本，这是一个宏任务：
    - 输出 `start`
    - 遇到 setTimeout，将回调放入宏任务队列的「下一轮」
    - 遇到 Promise.resolve().then，将回调放入当前轮的微任务队列
    - 输出 `end`
  - 当前宏任务执行完毕后，事件循环检查微任务队列：
    - 执行 Promise 的回调，输出 `promise`
  - 微任务队列清空后，进入下一轮事件循环，从宏任务队列中取出 setTimeout 回调：
    - 输出 `timeout`
  - 所以最终输出顺序是：`start` → `end` → `promise` → `timeout`。