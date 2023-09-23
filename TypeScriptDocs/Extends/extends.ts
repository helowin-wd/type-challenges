/**
 * 函数中的泛型类型的约束
 */

/**
 * 泛型T作为函数的泛型参数的类型范围大了
 * 某些数据类型上没有length属性，导致无法进行length访问
 * @param value 
 * @returns 
 */
// function getLength<T>(value: T): number {
//   // 类型“T”上不存在属性“length”
//   return value.length
// }

//=> 解决方案: 缩小类型T的范围，保证类型T上存在属性“length”
// T的类型缩小范围：把泛型可以代表的数据类型限制到一定的范围
// 将T代表的数据类型范围约束到有length属性的数据类型范围内

//=>泛型代表的数据类型的值对象必须含有length属性，并且数据类型是number
function getLength<T extends { length: number }>(value: T): number {
  return value.length
}
const len1 = getLength<string>('ab')
const len2 = getLength<number[]>([1, 2, 3])

//------------------------

/**
 * 约束是为了什么？
 *  约束是为了让范围的可代表类型的范围缩小，
 *  并不是给泛型指定类型，如test1 🙅 
 */
function test1<T extends any[]>(arr: T) { } // 【不推荐🙅】
function test2<T>(arr: T[]) { } // 【推荐】

//-----------------------

/**
 * 泛型的联合类型
 *  E 形式泛型参数
 */
function mergeArr<E>(arr1: E[], arr2: E[]): E[] {
  return [...arr1, ...arr2]
}
const arr = mergeArr<number>([1, 2, 3], [4, 5, 6])
// 类型推断: 根据第一个数组的元素类型推断E的数据类型为number
const arr1 = mergeArr<string | number>([1, 2, 3], ['a', 'b'])

//-------------------

/**
 * 约束T必须是可迭代的对像
 * 数组 -> 转对象 --> 想到reduce方法
 * @param value [1, 2, 3]
 * @returns {0: 1, 1: 2, 2: 3}
 */


interface Iprev<U> {
  [key: number]: U
}
function createObject<T extends Iterable<any>, U>(value: T) {
  return [...value].reduce((prev: Iprev<U>, current: U, index: number) => {
    prev[index] = current
    return prev
  }, {})
}
const obj1 = createObject<number[], number>([1, 2, 3])
const obj2 = createObject<string[], string>(['a', 'b', 'c'])

// 为啥写number也是可以的呢？
// 
const obj3 = createObject<string, number>('abc')
console.log(obj1) // { "0": 1, "1": 2, "2": 3 } 
console.log(obj2) // { "0": "a", "1": "b", "2": 3 } 