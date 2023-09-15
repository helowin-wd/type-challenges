/**
 * @MappedTypes 映射类型
 * 它是一种泛型类型，可用于把原有的对象类型，映射为新的对象类型
 * 
 * @映射类型的语法 {[P in K]: T}
 *  in 类似于for...in 语句，用于遍历K类型中的所有类型
 *  T  T类型变量用于表示TS中的任意类型
 * 
 *  也可以使用 readonly 和 ？ 这两个额外的修饰符 {readonly[P in K]?: T}
 *    + readonly: 表示添加只读修饰符
 *    - ？: 表示移除可选修饰符
 *  如果没有添加任何修饰符，默认是 +
 * 
 * @总结映射类型语法
 *  { [P in K] : T }
 *  { [P in K] ?: T }
 *  { [P in K] -?: T }
 *  { readonly[P in K]: T }
 *  { readonly[P in K]?: T }
 *  { -readonly[P in K]?: T }
 */

// 映射类型栗子

type Item = { a: string, b: number; c: boolean };
type T1 = { [P in "x" | "y"]: number };
// { x: number, y: number }

type T2 = { [P in "x" | "y"]: P };
// { x: "x", y: "y" }

type T3 = { [P in "a" | "b"]: Item[P] };
// { a: string, b: number }

type T4 = { [P in keyof Item]: Item[P] };
// { a: string, b: number, c: boolean }

/**
 * keyof 用于获取某类型的所有键，返回类型是联合类型
 * 类型变量P 随着遍历改变为不同的类型，
 * T[P] -> 形如 obj[key], 用于获取对象类型某个属性对应值的类型
 */
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

type MyUser = {
  name: string;
  password: string;
  address: string;
  phone: string
}

type UserPartial = MyPartial<MyUser>


    


//=>👇官方文档解读

// 1. 当您不想重复自己时，有时一个类型需要基于另一个类型。
//    映射类型基于索引签名的语法，索引签名用于声明尚未提前声明的属性类型
type Horse = {}
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse; 
}

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false
} 

// 2. 映射类型是泛型类型，它使用 PropertyKeys (通常通过 keyof 创建)的联合来迭代键以创建类型
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
}

// 在此示例中，OptionsFlags 将获取类型 Type 中的所有属性，并将它们的值更改为布尔值
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
}
type FeatureOptions = OptionsFlags<Features>

// 3. 在映射过程中可以应用两个额外的修饰符: readonly 和? ，它们分别影响可变性和可选性
//    您可以用-或 + 作为前缀来删除或添加这些修饰符。如果不添加前缀，则假定为 +

// Removes 'readonly' attributes from a type's properties 从类型的属性中移除“ readonly”属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

type LockedAccount = {
  readonly id: string;
  readonly name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>

// Removes 'optional' attributes from a type's properties 从类型的属性中移除“可选”属性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
}

type User = Concrete<MaybeUser>

// 在 TypeScript 4.1及以后版本中，可以使用as子句对应映射的键进行重新映射        映射类型中的 as 子句重新映射映射类型中的键
// 新的语法as子句: 其中 NewKeyType 的类型必须是 string、number、symbol 联合类型的子类型
type MappedTypeWithNewProperties<T> = {
  [P in keyof T as NewKeyType]: T[P]
}

/**
 * @定义工具类型Getters 用于为对象类型生成Getters类型
 * 您可以利用诸如模板文本类型之类的特性，从以前的属性名中创建新的属性名:
 * 
 * 因为 keyof T 返回的类型可能会包含symbol类型，而 Capitalize工具类型要求处理的类型需要是string类型的子类型
 * 使用交叉运算符进行类型过滤，如 string & K  意思是：过滤非string类型的键
 *  Capitalize工具类型: 单词首字母转大写
 */
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>


/**
 * @键重映射时as子句返回never类型，该键将被删除 
 *  type Exclude<T,U> = T extends U ? never: T;
 * 
 * 您可以通过从不通过条件类型生成来过滤出键
 */

// Remove the 'kind' property
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K]
}
interface Circle {
  kind: "circle";
  radius: number;
}
type KindLessCircle = RemoveKindField<Circle>


// 您可以映射任意的联合，不仅可以映射字符串 | 数字 | 符号的联合，还可以映射任何类型的联合
type EventConfig<Events extends {kind: string}> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = {
  kind: "square",
  x: number;
  y: number;
}
type CircleEvent = {
  kind: "circle";
  radius: number;
}

type Config = EventConfig<SquareEvent | CircleEvent>

// 在这个类型操作小节中，映射类型与其他特性一起工作得很好，
// 例如，这里有一个使用条件类型的映射类型，根据对象是否将属性 pii 设置为文字 true，该类型返回 true 或 false:
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends {pii: true} ? true : false;
}

type DBFields = {
  id: { format: "incrementing"};
  name: { type: string, pii: true}
}

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>