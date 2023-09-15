// type MyReadonly<T> = any





/**
 * @解题 接口里的属性前面，都添加readonly，作用：属性不可编辑，形如
 * 
 * interface Todo1 {
    readonly title: string
    readonly description: string
    readonly completed: boolean
    readonly meta: {
      author: string
    }
  }
 */

/**
 * js 观察接口Todo1 该函数需返回对象, 涉及的操作点如下
 *  1.返回一个对象
 *  2.遍历obj （js 对象 -> ts 接口）
 *  3.加上 readonly 关键字
 *  4.通过 key 来获取 obj(接口) 里面的值
 */
function readonly(obj) {
  const result = {};

  for (const key in obj) {
    result["readonly" + key] = obj[key]
  }

  return result;
}

/**
 * 条件：type MyReadonly<T> = any 可对该条件做修改
 * 
 * js: result["readonly" + key] = obj[key]
 * 
 *  1.返回一个对象
 *  2.遍历obj （js 对象 -> ts 接口）
 *    遍历 in -> 搜索关键字：mapped
 *     https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content
 *    循环接口：[P in keyof T]
 *     知识点: keyof
 *     https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
 *  3.加上 readonly 关键字
 *    https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype
 *  4.通过 key 来获取 obj(接口) 里面的值
 *    知识点：Indexed Access Types
 *    https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content
 */
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

