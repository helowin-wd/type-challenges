/**
 * 函数中的泛型类型的约束
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * 泛型T作为函数的泛型参数的类型范围大了
 * 某些数据类型上没有length属性，导致无法进行length访问
 * @param value
 * @returns
 */
// function getLength<T>(value: T): number {
//   // 类型“T”上不存在属性“length”
//   return value.length
// }
//=> 解决方案: 缩小类型T的范围，保证类型T上存在属性“length”
// T的类型缩小范围：把泛型可以代表的数据类型限制到一定的范围
// 将T代表的数据类型范围约束到有length属性的数据类型范围内
//=>泛型代表的数据类型的值对象必须含有length属性，并且数据类型是number
function getLength(value) {
    return value.length;
}
var len1 = getLength('ab');
var len2 = getLength([1, 2, 3]);
//------------------------
/**
 * 约束是为了什么？
 *  约束是为了让范围的可代表类型的范围缩小，
 *  并不是给泛型指定类型，如test1 🙅
 */
function test1(arr) { } // 【不推荐🙅】
function test2(arr) { } // 【推荐】
//-----------------------
/**
 * 泛型的联合类型
 *  E 形式泛型参数
 */
function mergeArr(arr1, arr2) {
    return __spreadArray(__spreadArray([], arr1, true), arr2, true);
}
var arr = mergeArr([1, 2, 3], [4, 5, 6]);
// 类型推断: 根据第一个数组的元素类型推断E的数据类型为number
var arr1 = mergeArr([1, 2, 3], ['a', 'b']);
function createObject(value) {
    return __spreadArray([], value, true).reduce(function (prev, current, index) {
        prev[index] = current;
        return prev;
    }, {});
}
var obj1 = createObject([1, 2, 3]);
var obj2 = createObject(['a', 'b', 'c']);
// 为啥写number也是可以的呢？
// 
var obj3 = createObject('abc');
console.log(obj1); // { "0": 1, "1": 2, "2": 3 } 
console.log(obj2); // { "0": "a", "1": "b", "2": 3 } 
