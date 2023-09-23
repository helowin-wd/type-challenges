
/**
 * Ts中的extends关键字
 * https://blog.csdn.net/m0_60882142/article/details/128538236
 * 不同场景下代表的含义不一样
 *  1.表示继承/拓展的含义
 *  2.表示约束的含义
 *  3.表示分配的含义
 */

/**
 * 场景一: 表示继承/拓展的含义
 */
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

// 1.可以通过 extends 继承 重复的类型
interface AddressWithUnit extends BasicAddress {
  unit: string
}

// 1.1 interface 使用 extends 继承多个类型
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}
interface ColorfulCircle extends Colorful, Circle { }

const cc: ColorfulCircle = {
  color: "red",
  radius: 42
};


// 2.type 如何像 interface来使用extends（继承） -> type 则需要使用 &
interface A {
  a: number
}

interface B {
  a: number
}

type AddressWithUnitCopy = A & B & BasicAddress & {
  unit: string
}

//=> 栗子
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
// okay
draw({ color: "blue", radius: 42 });

/**
 * 场景二: 表示约束的含义
 */
const entities = [
  {
    price: 123,
    name: '水果',
  },
  {
    price: 456,
    name: '蔬菜'
  }
]
interface T {
  price: number,
  name: string
}

// ReturnType 返回函数返回值的类型
type P = ReturnType<typeof getGoodNames>

// 泛型约束: 传入的参数都有 name 属性的数组对象
function getGoodNames<T extends { name: string }>(entities: T[]): string[] {
  return entities.map(item => item.name)
}
const res = getGoodNames(entities)
console.log(res) // [ '水果', '蔬菜' ]

/**
 * 场景三: 表示分配的含义: 判断一个类型是不是可以分配给另一个类型
 */
type Human = {
  name: string,
  age: 18
}
type Duck = {
  name: string
}
type Bool = Duck extends Human ? 'true' : 'false' // false

type A1 = 'x' extends 'x' ? string : number // string
type A2 = 'x' | 'y' extends 'x' ? string : number // number 🤔️？

/**
 * 分配条件类型
 *  1.参数是泛型类型
 *  2.带入参数是泛型类型
 * 
 * 如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。
 * 分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果
 * 
 *  extends的前参为T，T是一个泛型参数，给T传入的是'x'和'y'的联合类型'x' | 'y'，满足分配律，
 *  于是'x'和'y'被拆开，分别代入P<T>
 *    'x' extends 'x' ? string : number => string
 *    'y' extends 'x' ? string : number => number
 *    将每一项代入得到的结果联合起来，得到string | number
 */
type P1<T> = T extends 'x' ? string : number
type A3 = P1<'x' | 'y'> // type A3 =  string | number 🤔️？

/**
 * 特殊的never
 */
type A4 = never extends 'x' ? string : number // string

/**
 * never被认为是空的联合类型，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以P<T>的表达式其实根本就没有执行，
 * 所以A21的定义也就类似于永远没有返回的函数一样，是never类型的
 */
type P2<T> = T extends 'x' ? string : number;
type A21 = P2<never> // never

/**
 * 防止条件判断中的分配
 *   在条件判断类型的定义中，将泛型参数使用[]括起来，即可阻断条件判断类型的分配，
 *   此时，传入参数T的类型将被当做一个整体，不再分配
 */
type P3<T> = [T] extends ['x'] ? string : number;
type A1a = P3<'x' | 'y'> // number
type A2a = P3<never> // string

