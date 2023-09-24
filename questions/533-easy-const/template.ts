// type Concat<T, U> = any

type Tuple = readonly any[];
type Concat<T extends Tuple, U extends Tuple> = [...T, ...U]


//js
// function Concat(arrA, arrB) {
//   return [...arrA, ...arrB]
// }