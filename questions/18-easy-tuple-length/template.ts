// type Length<T> = any

// 解题
type Length<T extends readonly any[]> = T["length"]

/**
 * 知识点
 * 1.什么是tuple类型 -> 理解为：定死定长的一个数组类型
 *  https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
 *  元组类型是另一种 Array 类型，它确切地知道 它包含多少元素，以及在特定位置确切地知道 它包含哪些类型
 *  type StringNumberPair = [string, number];
 * 
 * tuple和普通的数组有什么区别
 */

//=> Study

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
type ts = typeof tesla // type ts = readonly ["tesla", "model 3", "model X", "model Y"]

const tesla1 = ['tesla', 'model 3', 'model X', 'model Y']
type tss = typeof tesla1 // type ts = string []

// Tuple Types 元祖类型，数组的length 是具体的值🔥 -> 因为元祖是定死定长的一个数组
type StringNumberPair = [string, number];
type m = StringNumberPair["length"] // type m = 2

// Array Types 数组类型, 数组的length 是number类型🔥
type stringArr = string[]
type t3 = stringArr["length"] // type t3 = number

// js
function getLength(arr) {
  if (!Array.isArray(arr)) return;
  return arr.length
}