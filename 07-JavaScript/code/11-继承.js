// /**
//  * 
//  * 1. 原型继承 
//  * 
//  */

// // 定义一个动物类
// function Animal(name) {
//   this.name = name;
//   this.sleep = function () {
//     console.log(this.name + '正在睡觉！');
//   }
// }

// // 原型方法
// Animal.prototype.eat = function (food) {
//   console.log(this.name + '正在吃：' + food);
// };
// // 子类
// function Cat() { }

// Cat.prototype = new Animal('Animal');
// Cat.prototype.name = 'cat';

// var cat = new Cat();
// console.log(cat.name);//cat
// console.log(cat.eat('fish'));//cat正在吃：fish  undefined
// console.log(cat.sleep());//cat正在睡觉！ undefined
// console.log(cat instanceof Animal); //true 
// console.log(cat instanceof Cat); //true

function Parent() {
	this.x = 100;
}
Parent.prototype.getX = function getX() {
	return this.x;
};

function Child() {
	this.y = 200;
}
//=> 让子类的原型等于父类的实例
Child.prototype = new Parent(); //=>原型继承

Child.prototype.getY = function getY() {
	return this.y;
};

let c1 = new Child();
console.log(c1); 