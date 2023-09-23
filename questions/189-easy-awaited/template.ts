// type MyAwaited<T> = any

/**
 * 题目要求
 *  1.去掉promise，取出里面的类型
 *  2.传入非promise值，抛出错误
 */

/**
 * 涉及知识点 
 *  1. infer 只能在 条件类型里面使用
 *  2. 用于设置未知数 当作数学的变量X
 * 
 * 步骤
 *  1. 检测是否为Promise, 需要传入一个类型，但暂时不知道什么类型 -> infer
 *     type MyAwaited<T> = T extends Promise<infer X> ? X : never
 * 
 *  2. 解出的X可能是一个Promise -> 递归调用当前方法 MyAwaited
 *     type MyAwaited<T> = T extends Promise<infer X> ? MyAwaited<X> : T
 * 
 *  3. 非Promise抛出错误 -> 限制T的类型
 *     传入的X 约束为一个Promise  => X extends Promise<unknown> 
 */

type Thenable<T> = {
  then: (onfulfilled: (arg: T) => unknown) => unknown
}

type MyAwaited<T extends Thenable<unknown> | Promise<unknown>> = T extends Promise<infer X>
  ? X extends Promise<unknown>
  ? MyAwaited<X>
  : X
  : T extends Thenable<infer U> ? U : false


