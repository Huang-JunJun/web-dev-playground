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