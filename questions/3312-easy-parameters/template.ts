// type MyParameters<T extends (...args: any[]) => any> = any

/**
 * 知识点
 *  1.infer 和 extends 集合使用
 *  参考资料
 *  https://github.com/Microsoft/TypeScript/pull/24897
 */


/**
 * @题目要求：获取函数的参数
 *  1.函数的参数未知 -> infer X 设置未知数
 *  2.传递的泛型参数 必须是函数类型
 */
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer X
) => any
  ? X
  : never;


