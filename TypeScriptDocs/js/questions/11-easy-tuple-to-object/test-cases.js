"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var tuple = ['tesla', 'model 3', 'model X', 'model Y'];
var tupleNumber = [1, 2, 3, 4];
var sym1 = Symbol(1);
var sym2 = Symbol(2);
var tupleSymbol = [sym1, sym2];
var tupleMix = [1, '2', 3, '4', sym1];
