import { clear } from "console"

/* eslint-disable @typescript-eslint/no-explicit-any */
export type CacheControlOptions = {
  maxAgeSeconds?: number
  noStore?: boolean
  noCache?: boolean
  isPublic?: boolean
  immutable?: boolean
}

export const buildCacheControl = (options: CacheControlOptions): string => {
  const directives: string[] = []

  if (options.noStore) {
    directives.push('no-store')
  } else {
    if (options.noCache) {
      directives.push('no-cache')
    }
    if (options.maxAgeSeconds !== undefined) {
      directives.push(`max-age=${options.maxAgeSeconds}`)
    }
    if (options.isPublic) {
      directives.push('public')
    } else {
      directives.push('private')
    }
    if (options.immutable) {
      directives.push('immutable')
    }
  }

  return directives.join(', ')
}

// src/common/utils.ts
export type AnyFunc = (...args: any[]) => any

export const myCall = (fn: AnyFunc, ctx: any, ...args: any[]): any => {
  const context = ctx ?? globalThis
  const key = Symbol()
  context[key] = fn
  const result = context[key](...args)
  delete context[key]
  return result
}

export const myPromiseAll = <T>(items: Array<Promise<T> | T>): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    if (items.length === 0) {
      resolve([])
      return
    }

    const results: T[] = new Array(items.length)
    let resolvedCount = 0

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value
          resolvedCount++
          if (resolvedCount === items.length) {
            resolve(results)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}

export type PromiseSettledResult<T> =
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: any }

export const myPromiseAllSettled = <T>(
  items: Array<Promise<T> | T>
): Promise<PromiseSettledResult<T>[]> => {

  return Promise.resolve([] as PromiseSettledResult<T>[]).then((items) => {
    if (items.length === 0) {
      return []
    }

    const results: PromiseSettledResult<T>[] = new Array(items.length)
    let resolvedCount = 0

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = { status: "fulfilled", value }
          resolvedCount++
          if (resolvedCount === items.length) {
            return results
          }
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason }
          resolvedCount++
          if (resolvedCount === items.length) {
            return results
          }
        })
    })
  })
}

// type Job = () => void

// export const createMicroTaskScheduler = () => {
//   const queue: Job[] = []
//   let pending = false

//   return (job: Job) => {
//     queue.push(job)
//     if (!pending) {
//       pending = true
//       Promise.resolve().then(() => {
//         pending = false
//         const jobsToRun = queue.splice(0, queue.length)
//         for (const j of jobsToRun) {
//           j()
//         }
//       })
//     }
//   }
// }

// export const debounce = <F extends (...args: any[]) => void>(
//   fn: F,
//   wait: number
// ) => {
//   const timer: ReturnType<typeof setTimeout> | null = null
//   return (...args: Parameters<F>) => {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     setTimeout(() => {
//       fn(...args)
//     }, wait)
//   }
// }

// export const throttle = <F extends (...args: any[]) => void>(
//   fn: F,
//   wait: number
// ) => {
//   let lastTime: number | null = null
//   return (...args: Parameters<F>) => {
//     const now = Date.now()
//     if (lastTime === null || now - lastTime >= wait) {
//       lastTime = now
//       fn(...args)
//     }
//   }
// }

export type AnyFn = (...args: any[]) => any

export interface DebouncedFn<F extends AnyFn> {
  (...args: Parameters<F>): void
  cancel: () => void
}

export const debounce = <F extends AnyFn>(
  fn: F,
  wait: number
): DebouncedFn<F> => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }

  debouncedFn.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debouncedFn
}

export interface ThrottledFn<F extends AnyFn> {
  (...args: Parameters<F>): void
  cancel: () => void
}

export const throttle = <F extends AnyFn>(
  fn: F,
  wait: number
): ThrottledFn<F> => {
  let lastTime: number | null = null
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttledFn = (...args: Parameters<F>) => {
    const now = Date.now()
    if (lastTime === null || now - lastTime >= wait) {
      lastTime = now
      fn(...args)
    } else if (!timer) {
      const remainingTime = wait - (now - lastTime)
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null
        fn(...args)
      }, remainingTime)
    }
  }
  throttledFn.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return throttledFn
}