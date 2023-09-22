/**
 * @Typeof的使用
 */

// 1. 在js上下文中使用：typeof 运算符返回一个字符串，表示操作数的类型
console.log(typeof "Hello world") // string

// 2. 在ts使用: 可以让我们在类型的上下文中，使用它来: 引用一个变量 或者 属性的类型
let s = "hello"
// 🔥 此时n类型 也是字符串类型
let n: typeof s;
n = 'world'

// 3. 组合其他类型
// 定义函数类型
type Predicate = (x: unknown) => boolean;
// 预定义类型
type K = ReturnType<Predicate>

//=>举个栗子
function f() {
  return {
    x: 10,
    y: 3
  }
}

/**
 * @在函数名上使用ReturnType
 * 
 * ReturnType 返回函数返回值的类型
 * 
 * 记住：值和类型不是一回事，引用函数返回值的类型，需要使用typeof
 */
type PP = ReturnType<typeof f>

/**
 * 4.@局限性 
 *  TypeScript 有意限制可以使用 typeof 的表达式的种类。
    具体来说，只有在标识符(即变量名)或其属性上使用 typeof 才是合法的。
    这有助于避免编写您认为正在执行但实际上并非执行的代码这种令人困惑的陷阱
 */

function msgbox() { };

// 错误写法：不能使用 typeof 标识函数的结果
let shouldContinue: typeof msgbox("Are you sure you want to continue?");


