// type First<T extends any[]> = any

/**
 * 知识点
 * 1.extends 类型条件判断
 * 2.获取 tuple 的 length 属性 => indexed
 * 3.extends union 判断的规则
 * 4.inter(推断) 和 extends 结合使用 
 */

// js
function test(arr) {
  // arr 是不是一个空数组，如果是的话 返回never
  // => TS 判断条件 使用 extends
  return arr[0]
}

// 解法1: extends 类型条件判断
// type First<T extends any[]> = T extends [] ? never : T[0]

// 解法2: 获取 tuple 的 length 属性  判断是否为0
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0]

// 解法3: extends union 判断的规则
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never

//=>知识点: T[number] 得到union类型
type ages = [1, 2, 3]
type t1 = ages[number] // type t1 = 3 | 1 | 2 得到union类型

type age1 = [] // 空数组
type t11 = age1[number] // type t11 = never 得到never类型

// 看看 某个值是不是在 union里面
type t2 = 1 extends ages[number] ? 'true' : 'false'

// 解法4: inter(推断) 和 extends 结合使用 
// 意思: 判断能否结构出First
type First<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never

// js
const first1 = (arr) => {
  // arr 是不是一个空数组，如果是的话 返回never
  const [first, ...rest] = arr // 结构赋值
  return first ? first : 'never'
}




