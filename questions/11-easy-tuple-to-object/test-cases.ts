import type { Equal, Expect } from '@type-challenges/utils'


/**
 * @理解 typeof 将js世界的内容 转换为 类型世界的内容
 * https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#handbook-content
 * 假设
 *  const  let     声明 称js世界
 *  type interface 声明 称类型世界
 * 
 * @解析 as const 的作用: 将里面的值变成字面量类型（常量）不允许修改
 * 
 * const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
 *  type r = typeof tuple
 *  此时 r类型 => type r = readonly ["tesla", "model 3", "model X", "model Y"]
 * 
 * 如果 去掉 as const 呢？
 *  const tuple = ['tesla', 'model 3', 'model X', 'model Y']
 *  type r = typeof tuple
 *  此时 r类型 => type r = string[]
 */

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1;[sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4';[sym1]: typeof sym1 }>>,
]

// @ts-expect-error 期望👇报错
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html
// 在该页面搜索：expect-error
// 解析：若遇到数组中的值不能做对象的键，期望报错
type error = TupleToObject<[[1, 2], {}]>