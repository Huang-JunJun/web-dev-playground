export const isValid = (s: string): boolean => {
  // const map = new Map<string, string>()
  // map.set(')', '(')
  // map.set('}', '{')
  // map.set(']', '[')
  // const stack: string[] = s.split('')
  // for (const char of stack) {
  //   if (map.has(char)) { }
  // }
  const stack: string[] = []
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{"
  }

  for (const ch of s) {
    // 左括号统统入栈
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch)
    } else {
      // ch 是右括号，先看栈里有没有东西
      const top = stack.pop()
      // 如果没有栈顶，或者类型不匹配，直接 false
      if (!top || top !== pairs[ch]) {
        return false
      }
      // top !== pairs[ch] 时也 false
    }
  }

  return stack.length === 0
}

console.log(isValid("()"))         // true
console.log(isValid("()[]{}"))     // true
console.log(isValid("(]"))         // false
console.log(isValid("([)]"))       // false
console.log(isValid("{[]}"))       // true
console.log(isValid("["))          // false
console.log(isValid(""))         // true