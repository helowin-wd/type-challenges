// type MyPick<T, K> = any
/**
 * 解题思路: 对比学习法 先写js -> 转换为Ts
 *  1. 返回一个对象
 *  2. 遍历foreach
 *  3. todo[key] 取值
 *  4. 判断 key 是否在 todo对象里面
 */
function myPick(todo, keys) {
    var obj = {};
    keys.forEach(function (key) {
        if (key in todo) {
            obj[key] = todo[key];
        }
    });
    return obj;
}
