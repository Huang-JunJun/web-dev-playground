export const minSubArrayLen = (target: number, nums: number[]): number => {
  let left = 0
  let right = 0
  let sum = 0
  const n = nums.length
  let minLen = n + 1

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    right++

    while (sum >= target) {
      const len = right - left
      if (len < minLen) {
        minLen = len
      }
      left++
      sum = sum - nums[left - 1]
    }
  }

  return minLen === n + 1 ? 0 : minLen
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])) // 2
console.log(minSubArrayLen(4, [1, 4, 4])) // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1])) // 0