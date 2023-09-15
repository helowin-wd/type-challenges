// type MyPick<T, K> = any

/**
 * 解题思路: 对比学习法 先写js -> 转换为Ts
 *  1. 返回一个对象
 *  2. 遍历foreach
 *  3. todo[key] 取值
 *  4. 判断 key 是否在 todo对象里面
 */

function myPick(todo, keys) {
  const obj = {};

  keys.forEach(key => {
    if (key in todo) {
      obj[key] = todo[key]
    }
  });

  return obj;
}

/**
 * 转换为Ts
 *  1. 返回一个对象
 *  2. 遍历foreach
 *     知识点：联合类型遍历：mapped Types
 *     https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content
 *  3. todo[key] 取值
 *     知识点：Indexed Access Types
 *     https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content
 *  4. 判断 key 是否在 todo对象里面
 *     知识点: keyof
 *     https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
 */

type MyPick<T, K extends keyof T> = {
  /**
   * js版：obj[key] = todo[key]
   * 
   * obj[key] -> 联合类型遍历 [P in K]
   *  K: 联合类型，如 'title' | 'completed' | 'invalid'
   *  P: 遍历的值，如 'title' 、 'completed' 、 'invalid'
   * 
   * todo[key] -> T[P]
   *  T: 就是给出的接口todo
   *  P: 遍历的值，如 'title' 、 'completed' 、 'invalid'
   */
  [P in K]: T[P]
}

