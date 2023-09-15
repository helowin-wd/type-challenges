//=> keyof 类型操作符

type Point = {
  x: number;
  y: number;
}

/**
 * @keyof的作用
 *  1. keyof运算符接受一个对象类型，它会产生它的key的字符串 或者 是数字字面量的一个结合 或者 是一个联合类型
 * 
 * type P = keyof Point  形如联合类型 type P = "x" | "y"
 * 联想记忆：形如 Object.keys 一次获取对象的key值
 */
type P = keyof Point

const p1: P = 'x'
const p2: P = 'y'

/**
 * @索引签名
 */
type Arrayish = {
  // 索引签名是 number
  [n: number]: unknown
}
type A = keyof Arrayish;
// 这里只能是数字类型
const a: A = 0

type Mapish = {
  // 索引签名是 string，它的类型就是 number 和 string 的联合类型, 原因如下：
  // 可以通过 中括号0 索引这个内容，0可以是数字、字符串，如 obj[0] 或者 obj['0']
  [k: string]: boolean
}
type M = keyof Mapish;

// 可以是数字、字符串
const m1: M = 's'
const m2: M = 100

