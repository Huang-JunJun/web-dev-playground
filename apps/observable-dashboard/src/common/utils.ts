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