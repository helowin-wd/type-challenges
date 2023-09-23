/**
 * Ts中的extends关键字
 * https://blog.csdn.net/m0_60882142/article/details/128538236
 * 不同场景下代表的含义不一样
 *  1.表示继承/拓展的含义
 *  2.表示约束的含义
 *  3.表示分配的含义
 */
var cc = {
  color: 'red',
  radius: 42
}
//=> 栗子
function draw(circle) {
  console.log('Color was ' + circle.color)
  console.log('Radius was ' + circle.radius)
}
// okay
draw({ color: 'blue', radius: 42 })
/**
 * 场景二: 表示约束的含义
 */
var entities = [
  {
    price: 123,
    goodsName: '水果'
  },
  {
    price: 456,
    goodsName: '蔬菜'
  }
]
function getGoodNames(entities) {
  return entities.map(function (item) {
    return item.goodsName
  })
}
var res = getGoodNames(entities)
console.log(res)
