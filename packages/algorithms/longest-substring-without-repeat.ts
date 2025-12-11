export const lengthOfLongestSubstring = (s: string): number => {
  const lastIndex = new Map<string, number>()
  // 表示当前窗口
  let right = 1
  let left = 1
  let maxlen = 0

  for (const ch of s) {
    if (lastIndex.has(ch)) {
      if (lastIndex.get(ch)! >= left) {
        left = lastIndex.get(ch)! + 1
      }
    }
    lastIndex.set(ch, right)
    right++
    maxlen = Math.max(maxlen, right - left)
  }

  return maxlen
}

console.log(lengthOfLongestSubstring("abcabcbb")) // 3
console.log(lengthOfLongestSubstring("bbbbb"))    // 1
console.log(lengthOfLongestSubstring("pwwkew"))   // 3
console.log(lengthOfLongestSubstring(""))         // 0
console.log(lengthOfLongestSubstring("dvdf"))     // 3  ("vdf")