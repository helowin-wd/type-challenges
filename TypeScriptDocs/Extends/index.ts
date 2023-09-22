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
