import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 题目要求
 *  true 返回 a
 *  false 返回 2
 *  非布尔值 返回 error
 */
type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>