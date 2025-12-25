const log = (tag: string) => {
  console.log(tag, Date.now())
}

let count = 0
let lastTime: any = null
const timer = setInterval(() => {
  count++
  const now = Date.now()
  if (lastTime === null || now - lastTime >= 1000) {
    lastTime = now
    log(`throttle: ${count}`)
  }

  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  const debounce = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      log(`raw: ${count}`)
    }, 1000)
  }
  debounce()
}, 100)