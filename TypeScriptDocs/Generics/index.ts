// Generics 泛型

/**
 * 解析 identity<T>
 *  T 指泛型变量，它是传递给函数identity的类型占位符，就像传递参数一样
 *  把用户指定的实际类型，链式传递给参数类型和返回值类型
 */
function identity<T, U>(value: T, message: U): T {
  console.log(message)
  return value;
}

// 调用函数时：显式指定泛型变量的实际类型
console.log(identity<number, string>(18, '小红'))

// 也可以不指定泛型变量的实际类型，让TypeScript自动完成类型推导
console.log(identity(18, '小红'))