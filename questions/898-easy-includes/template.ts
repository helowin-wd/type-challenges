// type Includes<T extends readonly any[], U> = any

import { Equal } from "@type-challenges/utils";

/**
 * 将递归的实现思路 -> 转换为Ts
 *  1.取数组第一个元素 
 *    T extends [infer First, ...infer Rest]
 * 
 *  2.if判断 First === key     【if判断 -> extends约束】
 *    Equal<First, U> extends true
 *    成立 返回 true
 *    不成立 接着递归调用 Includes<Rest, U>
 * 
 *  3.其他情况，返回false
 * 
 * 还有一个逻辑：ts的模块规范 --> 模块需要引入导包
 */

export type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
  ? true
  : Includes<Rest, U>
  : false


/**
 * 知识点
 *  1.用递归实现遍历数组
 *  2.ts的模块规范
 *    - 如果有 export/import 的话，就是模块
 *    - 没有的话，就是全局的，可以直接在别的模块引用
 */

// js
// function Includes(list, key) {
//   for (let index = 0; index < list.length; index++) {
//     const element = list[index];
//     if (element === key) {
//       return true
//     }
//   }
//   return false
// }

/**
 * 递归实现方式 ->转化为 TS 🔥
 * @param list
 * @param key
 * @returns
 * 假如 list [1, 2, 3, 4] key 4 ；每次判断：取数组的第一个元素 === key
 * [1, 2, 3, 4] 1 === key
 * [2, 3, 4]    2 === key
 * [3, 4]       3 === key
 * [4]          4 === key
 * [] 数组长度为0 结束返回false
 */
// function Includes(list, key) {
//   function _(list, key) {
//     // 递归结束条件
//     if (list.length === 0) return false;
//     const [First, ...rest] = list;

//     // 获取第一值和key进行比较
//     if (First === key) {
//       return true;
//     } else {
//       return _(rest, key)
//     }
//   }
//   return _(list, key)
// }


