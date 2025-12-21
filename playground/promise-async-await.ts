console.log("A")

setTimeout(() => {
  console.log("timeout")
}, 0)

Promise.resolve().then(() => {
  console.log("promise then 1")
}).then(() => {
  console.log("promise then 2")
})

console.log("B")

async function test() {
  console.log("1")
  await Promise.resolve()
  console.log("2")
}

console.log("start")
test()
console.log("end")

Promise.resolve()
  .then(() => {
    throw new Error("err in then")
  })
  .catch((err) => {
    console.log("caught in catch:", err.message)
    return 123
  })
  .then((value) => {
    console.log("after catch then:", value)
  })

const foo = async () => {
  try {
    await Promise.reject(new Error("err in async"))
    console.log("never here")
  } catch (e: any) {
    console.log("caught in try/catch:", e.message)
  }
}

foo()