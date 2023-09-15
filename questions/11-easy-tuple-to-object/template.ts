// type TupleToObject<T extends readonly any[]> = any

/**
 * js
 * 
 * @思路
 *  1.返回一个对象
 *  2.遍历数组
 * 
 * @param array 
 * @returns 
 */
function tupleToObject(array) {
  const obj = {};

  array.forEach((val) => {
    obj[val] = val;
  })

  return obj;
}

/**
 * ts
 * @思路
 *  1.返回一个对象
 *  2.遍历数组
 *    T[number]
 * 
 * 对象的key只有三种类型：string | number | symbol
 */
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P;
}

