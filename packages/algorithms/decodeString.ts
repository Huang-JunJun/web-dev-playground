type State = { prev: string; k: number }

export const decodeString = (s: string): string => {
  const stack: State[] = []
  let currentString = ''
  let k = 0

  for (const ch of s) {
    if(ch >= '0' && ch <= '9') {
      k = k * 10 + parseInt(ch)
    } else if (ch === '[') {
      stack.push({ prev: currentString, k: ch.charCodeAt(0) - 48 })
      currentString = ''
      k = 0
    } else if (ch === ']') {
      const top = stack.pop()!
      currentString = top.prev +currentString.repeat(k)
    } else {
      currentString += ch
    }
  }

  return currentString
}