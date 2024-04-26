
# JS

下面是常见的 `JS` 知识点：

## 1. 深拷贝、浅拷贝 ⭐

- 深浅拷贝是针对 `引用类型` 的，原始类型不存在深浅拷贝。
- 浅拷贝：
  - 原理：复制的是 `对象的引用`
  - 方法：1.Object.assign()  2.展开运算符  3.循环遍历
- 深拷贝：
  - 原理：拷贝了一个完全一样的对象
  - 方法：1.JSON.parse(JSON.stringify(obj))  2. `递归`  3.lodash中的_.defaultsDeep()方法

> **Tips**: `JSON.stringify()` 缺陷，无法拷贝 `Function`、`undefined`、`symbol` 类型。
> 原因是 `JSON.stringify()` 在处理这些类型，这些类型会被忽略，不会被处理。并且 `JSON.stringify()` 也解决不了循环引用的问题。

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
            this.subscribers[topic] = 
            this.subscribers[topic].filter(item => item !== callback)
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
-（1）观察者模式
  - 直接通信：在观察者模式中，被观察者与观察者直接通信。
  - 依赖关系：观察者与被观察者有明确的依赖关系。观察者需要明确地注册到特定的被观察者身上。
-（2）发布订阅模式
  - 间接通信：在发布订阅模式中，发布者与订阅者不直接交互。发布者发布消息到一个中间层，订阅者订阅这些通道或主题，而不是订阅发布者。
  - 解耦关系：发布者和订阅者之间耦合度更低，它们不需要知道对方的存在。

## 11. JS 数据类型 ⭐

基本数据类型：`Number`、 `String`、 `Boolean`、 `BigInt`、 `Symbol`、 `Undefined`、 `Null`

引用数据类型：`Object`（`Object` 原生对象，`Array` 数组对象，`Function` 函数对象，`Date` 日期对象，`RegExp` 正则对象，
`Map` 集合对象，`Set` 集合对象，`Promise` 异步操作对象）


## 12. 事件循环（Event Loop）⭐

- 定义：主线程从"任务队列"中读取执行事件，这个过程是循环不断的，这个机制被称为事件循环。（**JS的运行机制就是事件循环!**）
- 执行步骤：主线程任务——>微任务——>宏任务
> 同步的任务没有优先级之分，异步执行有优先级，先执行微任务（Microtask 队列），再执行宏任务（Macrotask 队列），同级别按顺序（先微任务后宏任务）

### 主线程

所有的同步任务都是在主线程里执行的，异步任务可能会在 Microtask 或者 Macrotask 里面

### 微任务（Microtask）

- promise
- async
- await
- process.nextTick(node)
- mutationObserver(html5 新特性)

### 宏任务（Macrotask）

- script（标签里面的代码）
- setTimeout
- setInterval
- setImmediate
- I/O 操作（输入输出）
- UI render（ui渲染）

## 13. Promise ⭐

- 定义：是一种用于处理 `异步操作` 的机制，可以更好的处理回调地狱问题（ `提升维护性` ）。
> 回调地狱：实际上就是多层嵌套，嵌套太多，会导致代码难以阅读和维护。
- 3种状态：`pending`（等待态）、`fulfilled`（完成态）、`rejected`（拒绝态）
- 3个实例方法：
  - `then`：成功时回调的函数
  - `catch`：失败时回调的函数
  - `finally`：不管成功 or 失败回调的函数
- 6个静态方法 ⭐

| 方法                 | 解释                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Promise.resolve()    | 创建一个 `成功` 的 Promise 对象，返回结果就是传入的参数                                                          |
| Promise.reject()     | 创建一个 `失败` 的 Promise 对象，返回结果就是传入的参数                                                          |
| Promise.all()        | 接收 Promise `对象数组`，等数组中所有的 Promise 对象 `都成功` 时，才返回成功的结果数组                           |
| Promise.race()       | 接收 Promise `对象数组`，立即返回 `第一个解决` 的结果，`不论结果` 是成功还是失败。                               |
| Promise.allSettled() | 接收 Promise `对象数组`，等数组中所有的 Promise 对象 `都解决` 后，`不论结果` 是成功还是失败，返回结果数组        |
| Promise.any()        | 接收 Promise `对象数组`，立即返回 `第一个成功解决` 的结果，如果 `全部失败`，返回一个被拒绝的带有拒绝原因的数组。 |

### 手搓 Promise.all ⭐

```js
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(data => {
                result[i] = data;
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        }
    })
}
```

### 手搓 Promise.race ⭐

```js
function promiseRace(promises) {
    return new Promise((resovle, reject) => {
        const len = promises.length
        if (len === 0) return;
        for (let promise of promises) {
            Promise.resolve(promise).then(resovle, reject)
        }
    })
}
```

### 手搓 Promise.any ⭐

```js
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
        const errors = [], len = promises.length
        let count = 0;
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(val => {
                resolve(val)
            }).catch(err => {
                errors[i] = err
                count++
                if (count === len) {
                    reject(new AggregateError(errors, '所有的Promise都被拒绝'))
                }
            })
        }
    })
}
```

## 14. async/await ⭐

- 定义：`async` 函数是 `Generator` 函数的语法糖，它返回一个 `Promise` 对象，可以使用 `await` 关键字等待异步操作完成。
- 用法：
  - `async` 关键字用于声明一个 `async` 函数，`await` 关键字用于等待一个 `Promise` 对象解决。
  - `async` 函数返回一个 `Promise` 对象，可以使用 `await` 关键字等待异步操作完成。
  - `async` 函数内部可以使用 `try-catch` 语句捕获异步操作中的错误。
  - `async` 函数内部可以使用 `return` 语句返回一个值。
- 优点：
  - **代码可读性**，结构清晰，使用 `async` 和 `await` 关键字可以更清晰地表达代码逻辑。
  - **错误处理更加方便**，使用 `try-catch` 语句可以捕获 `async` 函数中的错误。
  - **减少回调函数**，避免了 `Promise` 链中嵌套 `.then()` 和 `.catch()` 方法的需要。
- 缺点：
  - 滥用 `await` 可能会**导致性能问题**，因为 `await` 会阻塞代码的执行，导致其他任务无法执行。
  - 滥用 `async` 可能会**导致代码逻辑混乱**，因为 `async` 函数会自动将同步代码转换为异步代码，这可能会导致代码难以阅读和维护。

## 15. ES6有哪些新属性？

- 变量声明：`let`、`const`、`import`、`class`
- 字符串：`includes`、`startsWith`、`endsWith`、`repeat`、`padStart`、`padEnd`
- 数值：`Number.isInteger`、`Number.isNaN`、`Number.parseInt`、`Number.parseFloat`、`Number.isFinite`、`Number.isSafeInteger`
- 数组：`Array.from`、`Array.of`、`Array.copyWithin`、`Array.find`、`Array.findIndex`、`Array.fill`、`Array.entries`、`Array.keys`、`Array.values`、`Array.includes`
- 循环：`for of`、`forEach`、`some`、`every`、`filter`、`reduce`
- 函数：`Function.name`、`Function.length`、`Function.bind`、`Function.call`、`Function.apply`
- 对象：`Object.is`、`Object.assign`、`Object.getOwnPropertyNames`、`Object.getOwnPropertySymbols`、`Object.keys`、`Object.values`、`Object.entries`、`Object.freeze`、`Object.seal`、`Object.preventExtensions`
- 模块：`export`、`import`、`export default`、`import()`
- 异步：`Promise`、`async`、`await`
- 对象拦截：`Proxy`、`Reflect`
- 字符串模板：`${}`
- 箭头函数：`=>`
- 解构赋值：`{}[]`
- 对象属性简写：`{name}`
- 对象方法简写：`name(){}`
- 对象属性名表达式：`{[name]:''}`
- 对象方法名表达式：`{[name + ''](){}}`

## 16. let、const、var区别

| 特性                         | var                                                | let                                                        | const                                                                                 |
| ---------------------------- | -------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ES版本                       | `ES5` 及更早                                       | `ES6`                                                      | `ES6`                                                                                 |
| 作用域                       | 函数作用域或全局作用域                             | 块级作用域                                                 | 块级作用域                                                                            |
| 变量提升                     | <font color='green'>是</font>                      | <font color='red'>否</font>（存在暂时性死区）              | <font color='red'>否</font>（存在暂时性死区）                                         |
| 重复声明                     | <font color='green'>允许</font> （在同一作用域内） | <font color='red'>不允许</font>                            | <font color='red'>不允许</font>                                                       |
| 修改值                       | <font color='green'>可以</font> 重新赋值           | <font color='green'>可以</font> 重新赋值（针对非冻结对象） | <font color='red'>不可以</font>（对于基本类型为常量，对于对象/数组，其属性/元素可变） |
| 初始化要求                   | 可选（默认值为undefined）                          | 可选（默认值为undefined）                                  | 必须立即赋值                                                                          |
| 挂载到window（全局作用域下） | <font color='green'>是</font>                      | <font color='red'>否</font>                                | <font color='red'>否</font>                                                           |

## 17. 事件委托、事件冒泡、事件捕获

**事件委托**：

- 定义：是一种常见的事件处理模式，即给一个父元素绑定事件，然后利用冒泡原理，事件会从内部元素传播到父元素，从而实现对内部元素的事件处理。
- 优点：
  - **减少事件处理程序的数量**：使用事件委托可以减少需要绑定事件处理程序的元素数量。相对于为每个子元素绑定事件处理程序，只需在父元素上绑定一个事件处理程序即可。
  - **动态绑定和增加灵活性**：当新的子元素被添加到父元素中时，它们会自动继承来自父元素的事件处理程序，无需再次手动绑定事件。
  - **节省内存消耗**：由于事件委托采用冒泡机制，它只需绑定一个事件处理程序

**事件冒泡**：

- 定义：是DOM中事件传播的一种方式。当一个元素被点击时，会触发该元素的click事件，然后会向上冒泡到其父元素，再逐级向上传播，直到document。


**事件捕获**：

- 定义：是指在事件冒泡机制的基础上，在捕获阶段先触发事件处理程序，然后再触发冒泡阶段。

## 18. map 和 forEach 的区别

map 会返回一个新的数组，forEach 不会返回任何东西。
