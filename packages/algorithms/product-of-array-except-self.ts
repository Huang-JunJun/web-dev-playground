export const productExceptSelf = (nums: number[]): number[] => {
  const n = nums.length
  const answer = new Array<number>(n)

  // 先存左边乘积
  answer[0] = 1
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1]
  }

  // 再乘上右边乘积
  let rightProd = 1
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * rightProd
    rightProd *= nums[i]
  }

  return answer
}