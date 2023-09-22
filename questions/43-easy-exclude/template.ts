// type MyExclude<T, U> = any

//=> 解读 先循环T 再循环U
type MyExclude<T, U> = T extends U ? never : T

//=> 自定义测试case
type t4 = 'a' | 'b' | 'c'
type t5 = 'a'
type t6 = MyExclude<t4, t5> // type t6 = "b" | "c"

/**
 * 知识点
 *  union类型默认是可以循环的
 */

// js
/**
 * T: ['a', 'b', 'c']
 * U: ['a]
 * 
 * 对比过程如下: 依次进行对比
 * 'a' - 'a' 匹配 - 不希望返回该元素，不返回任何值 never （不做任何操作）
 * 
 * 'b' - 'a' 不匹配的情况 - 返回该元素
 * 'c' - 'a' 不匹配的情况 
 */

function MyExclude(T, U: any[]) {
  const result = []

  for (let i = 0; i < T.length; i++) {
    const t = T[i];

    // let boo = false
    // for (let j = 0; j < U.length; j++) {
    //   const u = U[j];

    //   if (t === u) {
    //     boo = true
    //   }
    // }
    // if (!boo) {
    //   result.push(t)
    // }

    if (!U.includes(t)) {
      result.push(t)
    }
  }

  return result
}