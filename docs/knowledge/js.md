
# JS 部分
下面是常见的 `JS` 基础问题：

## 1. 深拷贝、浅拷贝 ⭐
- 深浅拷贝是针对 `引用类型` 的，原始类型不存在深浅拷贝。
- 浅拷贝：
  - 原理：复制的是 `对象的引用`
  - 方法：1.Object.assign()  2.展开运算符  3.循环遍历
- 深拷贝：
  - 原理：拷贝了一个完全一样的对象
  - 方法：1.JSON.parse(JSON.stringify(obj))  2. `递归`  3.lodash中的_.defaultsDeep()方法

> **Tips**: `JSON.stringify()` 缺陷，无法拷贝 `Function`、`undefined`、`symbol` 类型。原因是`JSON.stringify()` 在处理这些类型，这些类型会被忽略，不会被处理。并且 `JSON.stringify()` 也解决不了循环引用的问题。

<br />

**深拷贝 `解决循环引用` 的例子**：
```js
const obj = {
    quote: null
}
obj.quote = obj;

function deepCopy(obj, visited = new Map()) {
    // 基础类型或 null，直接返回
    if (!obj || typeof obj !== 'object') {
        return obj
    }
    // 检查是否循环引用
    if (visited.has(obj)) {
        return visited.get(obj)
    }
    // 对于数组或对象，创建一个新的空数组或对象
    const copyObj = Array.isArray(obj) ? [] : {};
    // 将当前正在拷贝的对象加入已访问列表
    visited.set(obj, copyObj);
    // 递归拷贝所有属性
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepCopy(obj[key], visited);
        }
    }
    return copyObj
}

console.log(deepCopy(obj));
```

## 2. 防抖、节流 ⭐
- 作用：优化 `高频率` 触发，提升性能。
- 应用场景：窗口大小调整、滚动、键盘输入、鼠标移动等事件
- 防抖：函数被触发n秒之后再执行，如果在这n秒内函数被再次触发，则 `重新计时`。
```js
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
}
```

- 节流：节流确保一个函数在 `指定` 的 `时间间隔` 内 `只执行一次`，即使在这段时间内触发多次。
```js
function throttle(fn, delay) {
    let lastCall = 0
    return function (...args) {
        const now = new Date().getTime()
        if (now - lastCall >= delay) {
            lastCall = now
            fn.apply(this,args)
        }
    }
}
```

## 3. 原型和原型链 ⭐
- 原型（定义）：`原型` 是一个对象，`对象` 的 `原型` 属性指向一个对象，该对象是 `创建` `对象` 的 `原型对象`。
- 原型链（定义）：当你试图访问一个对象的属性时，JS会首先在对象本身查找，如果没有找到，则会继续在该对象的原型上查找，然后就是原型的原型，以此类推。这样构成的一条链路我们称之为原型链。
- 对象原型：JS中所有对象的原型最终都会指向 `Object.prototype`，而 `Object.prototype` 的原型等于 `null`。
- 函数原型：当函数作为对象时，它的原型是 `__proto__`，最终指向都是 `Function.prototype`。当函数作为构造函数时，它的原型是 `prototype`。


## 4. requestAnimationFrame ⭐
- 定义：`requestAnimationFrame` 告诉浏览器你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
- 用法：`requestAnimationFrame(callback)`，该方法需要传入一个回调函数，该回调函数会在浏览器下一次重绘之前执行。浏览器会根据需要决定在重绘之前调用回调函数的时机。
- 性能：
  - （1）因为 `requestAnimationFrame` 的执行时机是在每次重绘之前，所以会减少不必要的帧和重绘，并且它也会尽量的跟浏览器的刷新率同步，通常是60帧/秒。
  - （2）当页面标签切换后或页面不可见时，`requestAnimationFrame` 会被暂停，以提升性能。
- 应用场景：动画、游戏、性能优化等。

## 5. 闭包 ⭐
- 定义：函数和与其相关的引用环境的组合就是闭包。
- 创建：当一个内部函数在一个外部函数里被定义，并且内部函数引用了外部函数的变量或参数，那么闭包就被创建了。
- `不会被垃圾回收` ：在外部函数执行完毕之后，内部函数中引用的变量或参数不会被回收。
- 作用：
- （1）`数据封装` 和 `私有变量`：闭包可以用来模拟私有变量，提供公开的API而隐藏内部实现细节。
```js
function createCounter() {
  let count = 0; // 私有变量

  return {
    // 公开API
    increment: function() {
      count++; // 内部函数引用了外部函数的变量或参数
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter(); // 内部函数在外部函数被定义
```
> 这种方式提供了一种封装内部实现细节的机制，你可以自由地改变内部的实现而不影响到外部代码，增加了代码的`可维护性` 和 `安全性`。

- （2）动态生成函数：根据不同的参数或条件生成具有特定行为的函数。
```js
function greeting(lang = 'en') {
    return function(name) {
        switch (lang) {
            case 'en':
                return `Hello, ${name}!`;
                break;
            case 'es':
                return `Hola, ${name}!`;
                break;
            case 'cn':
                return `你好, ${name}!`;
                break;
            default:
                return `Sorry, I don't speak ${lang}!`;
        }
    }
}

const greetEnglish = greeting('en');
const greetSpanish = greeting('es');
const greetChinese = greeting('cn');

console.log(greetEnglish('John')); // 输出 "Hello, John!"
console.log(greetSpanish('Juan')); // 输出 "Hola, Juan!"
console.log(greetChinese('张三')); // 输出 "你好, 张三！"
```
> 通过这样的方式，你可以创建一个非常灵活和可配置的函数，用于处理各种不同的场景和需求。

- 注意：
  - 闭包使用不当，会导致内存泄漏，因为闭包会保存引用，导致引用对象无法被回收。
  - 过度使用闭包，会导致性能问题，因为闭包会创建新的作用域，导致函数的调用链过长，影响性能。

## 6. 函数柯里化 ⭐
- 定义：是将一个多参数的函数转换为一系列单参数的函数。
> 也就是将 fn(1,2,3,4) 转换成 fn(1)(2)(3)(4)
```js
function curry(fn) {
    return function curryFn(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...newArgs) {
                return curryFn.apply(this, [...args, ...newArgs])
            }
        }
    }
}
```
作用：1. 延迟执行；2. 参数复用；3. 提前验证参数；4. 提前返回；5. 函数组合。

## 7. for in 和 for of 区别 ⭐
| 方法   | 遍历对象          | 遍历的值 | 一般使用    |
| ------ | ----------------- | -------- | ----------- |
| for in | `普通` 对象       | `key`    | 遍历 `对象` |
| for of | `可迭代类型` 对象 | `value`  | 遍历 `数组` |

> for in迭代对象的顺序是不确定的，遍历对象的时候会遍历对象原型链上面的属性


## 8. 数组去重 ⭐
- 方法一：使用 `Set` 去重。
```js
function unique(arr) {
    return [...new Set(arr)];
}
```
- 方法二：使用 `for循环` 和 `indexOf` 去重。
```js
function unique(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result;
}
```
- 方法三：使用 `filter` 去重。
```js
function unique(arr) {
    return arr.filter((item, index, self) => {
        return self.indexOf(item) === index;
    })
}
```

## 9. 箭头函数与普通函数区别 ⭐
- 1.箭头函数没有自己的this，this来自于执行上下文。
- 2.箭头函数不能用作构造函数，所以它也没有prototype（原型和继承）。
- 3.箭头函数没有arguments，不能使用arguments取函数的参数。

## 10. 设计模式 ⭐
### 一、单例模式
单例模式是指一个类只能被实例化一次，并提供全局访问点。比如，在前端开发中，我们经常需要确保某些资源只被加载一次，而不是每次都重新加载。下面是一个使用单例模式的例子：
```js
class Singleton {
    constructor() {
        if (typeof Singleton.instance === 'object') {
            return Singleton.instance;
        }
        this.name = 'Singleton';
        Singleton.instance = this;
    }

    return this;
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true
```
> 上述代码中，我们创建了一个 `Singleton` 类，该类只能被实例化一次。如果多次尝试实例化该类，将会返回同一个实例。这样就保证了某些资源只会被加载一次，从而提高性能。

### 二、观察者模式
观察者模式是指当一个对象状态改变时，它的所有依赖者都会收到通知并自动更新。这个模式非常适合那些需要实时更新用户界面的场景。下面是一个使用观察者模式的例子：
```js
class Subject {
    constructor() {
        this.obervers = []
    }
    subscribe(obs) {
        this.obervers.push(obs)
    }
    unsubscribe(obs) {
        this.obervers = this.obervers.filter(item => item !== obs)
    }
    nofity(data) {
        this.obervers.forEach(obs => {
            obs.update(data)
        })
    }
}
class Observer {
    constructor(name) {
        this.name = name
    }
    update(data) {
        console.log(`${this.name}收到的数据：${data}`);
    }
}
const sub = new Subject()

const obs1 = new Observer('obs1')
const obs2 = new Observer('obs2')
sub.subscribe(obs1)
sub.subscribe(obs2)
sub.nofity('Hello')
sub.unsubscribe(obs1)
sub.nofity('JS')
```

### 三、发布订阅模式
发布订阅模式是一种消息通信模式，用于在系统的不同部分之间传递特定的事件信息。这种模式类似于广播：一个发布者发送消息，但并不知道谁将接收它；其他订阅者可以订阅这些消息并对它们作出响应，而无需知道是哪个发布者发布了这些消息。
```js
class PubSub {
    constructor() {
        this.subscribers = {}
    }
    // 订阅
    subscribe(topic, callback) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = []
        }
        this.subscribers[topic].push(callback)
        return () => {
            this.unsubscribe(topic, callback)
        }
    }
    // 取消订阅
    unsubscribe(topic, callback) {
        if (this.subscribers[topic]) {
            this.subscribers[topic] = this.subscribers[topic].filter(item => item !== callback)
        }
    }
    // 发布
    publish(topic, data) {
        if (this.subscribers[topic]) {
            this.subscribers[topic].forEach(cb => {
                cb(data)
            })
        }
    }
}
const pubSub = new PubSub()
const subscribe = pubSub.subscribe('news', data => console.log(`收到的信息：${data}`))
pubSub.publish('news', 'hello')
subscribe()
pubSub.publish('news', 'hello')
```
2.`观察者模式` 和 `发布订阅模式` 有什么区别？

（1）观察者模式
  - 直接通信：在观察者模式中，被观察者与观察者直接通信。
  - 依赖关系：观察者与被观察者有明确的依赖关系。观察者需要明确地注册到特定的被观察者身上。
  
（2）发布订阅模式
  - 间接通信：在发布订阅模式中，发布者与订阅者不直接交互。发布者发布消息到一个中间层，订阅者订阅这些通道或主题，而不是订阅发布者。
  - 解耦关系：发布者和订阅者之间耦合度更低，它们不需要知道对方的存在。