export const groupAnagrams = (strs: string[]): string[][] => {
  const map = new Map()

  for (const str of strs) {
    const sortedStr = str.split("").sort().join("")
    if (!map.has(sortedStr)) {
      map.set(sortedStr, [str])
    } else {
      map.get(sortedStr).push(str)
    }
  }

  return Array.from(map.values())
}

console.log(
  groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
)
// 期望类似： [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log(groupAnagrams([""]))
// [[""]]

console.log(groupAnagrams(["a"]))
// [["a"]]