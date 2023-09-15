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
    var result = {};
    for (var key in obj) {
        result["readonly" + key] = obj[key];
    }
    return result;
}
