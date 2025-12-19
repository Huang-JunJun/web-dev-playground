function foo(this: any, label: string) {
  console.log(label, this.value)
}

const obj = { value: 42 }

foo("default")                    // this 是什么？
foo.call(obj, "call")             //  this是obj
foo.apply(obj, ["apply"])         // this是obj
const bound = foo.bind(obj, "bind")
bound()                           //