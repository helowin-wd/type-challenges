// type If<C, T, F> = any


//=> 需要在 tsconfig中配置
//   "strict": true  严格模式

type If<C extends Boolean, T, F> = C extends true ? T : F

/**
 * @null严格模式和非严格模式的区别
 * tsconfig中配置
 *  "strict": true  严格模式 ->  type K1 = "false"
 *  "strict": false 非严格模式 -> type K1 = "true"
 */
type K1 = null extends true ? "true" : "false";

//js
// function If(C, T, F) {
//   return C ? T : F
// }

/**
 * 知识点
 *  类型兼容性｜分配规则
 *  null 严格模式和非严格模式的区别
 *  https://www.typescriptlang.org/docs/handbook/type-compatibility.html
 */