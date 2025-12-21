export const maxProfit = (prices: number[]): number => {
  let minPrice = Number.MAX_SAFE_INTEGER
  let maxProfit = 0

  // 一次遍历
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price
    }
    maxProfit = Math.max(maxProfit, price - minPrice)
  }

  return maxProfit
}

// 示例 1：题目给的
console.log(maxProfit([7, 1, 5, 3, 6, 4])) // 5
// 解释：1 买 6 卖，6 - 1 = 5

// 示例 2：始终下跌
console.log(maxProfit([7, 6, 4, 3, 1])) // 0
// 最低点不在开头
console.log(maxProfit([5, 4, 3, 2, 10])) // 8
// 解释：2 买 10 卖

// 最低点在后面，需要更新 minPrice
console.log(maxProfit([9, 8, 7, 1, 6])) // 5
// 解释：1 买 6 卖
