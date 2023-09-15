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
    var obj = {};
    array.forEach(function (val) {
        obj[val] = val;
    });
    return obj;
}
