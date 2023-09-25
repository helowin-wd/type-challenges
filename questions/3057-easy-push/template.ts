// type Push<T, U> = any

type Push<T extends unknown[], U> = [...T, U]

//js
// function Push(T, U) {
//   return [...T, U]
// }
