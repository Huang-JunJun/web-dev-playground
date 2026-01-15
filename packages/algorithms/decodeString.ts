type State = { prev: string; k: number }

export const decodeString = (s: string): string => {
  const stack: State[] = []
  let currentString = ''
  let k = 0

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      k = k * 10 + parseInt(ch, 10)
    } else if (ch === '[') {
      stack.push({ prev: currentString, k })
      currentString = ''
      k = 0
    } else if (ch === ']') {
      const top = stack.pop()!
      currentString = top.prev + currentString.repeat(top.k)
    } else {
      currentString += ch
    }
  }

  return currentString
}