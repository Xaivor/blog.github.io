# Vue

下面是常见的 `Vue` 知识点：

## 1. vue 中的 MVVM 模式 ⭐

MVVM 模式是一种设计思想。`Model` 代表数据模型，`View` 代表 UI 组件，`ViewModel` 监听模型数据的改变和控制视图行为、处理用户交互，将数据同步到 `Model` 中。

## 2. vue 中的 Virtual DOM ⭐

虚拟 DOM 本质上是一个 JS 对象，它反映了真实 DOM 的结构和内容。

- 1.提供一个中间缓存，使得直接操作实际的 DOM（这通常是昂贵的操作）不再那么频繁。
- 2.通过对比新旧虚拟 DOM 来计算出最小的变动，从而优化实际 DOM 的更新。

### 优缺点

- **优点**：
  - `保证性能下限`：普调一些 DOM 操作的实现，提供还不错的性能。
  - `无需手动操作 DOM`：只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定更新视图（View），极大提高我们的开发效率；
  - `跨平台`：虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，可以在任意平台实现，包括服务器端渲染、微信小程序等。
- **缺点**：
  - `无法进行极致优化`： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

### 实现原理

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- `diff 算法` — 比较两棵虚拟 DOM 树的差异；
- `pach 算法` — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。


## 3. vue 中的 生命周期 ⭐

总共分为 8 个阶段，具体为：`创建前/后`，`载入前/后`，`更新前/后`，`销毁前/后`。

- 创建前/后：
  - 在  `beforeCreated` 阶段：vue 实例的挂载元素 $el 和数据对象 data 都为 undefined，还未初始化；
  - 在 `created` 阶段，vue 实例的数据对象 data 有了，$el 还没有。
- 载入前/后：
  - 在 `beforeMount` 阶段，vue 实例的 $el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换；
  - 在 `mounted` 阶段，vue 实例挂载完成，data.message 成功渲染。
- 更新前/后：当 data 变化时，会触发 `beforeUpdate` 和 `updated` 方法。
- 销毁前/后：在执行 `destroy` 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在。

## 4. vue 中的 Diff 算法 ⭐

- 作用：修改 dom 的一小段，不引起 dom 树的重绘
- 实现原理：diff 算法将 `virtual dom` 的某个节点数据改变后生成的新的 vnode 与旧节点进行比较，并替换为新的节点，具体过程就是调用 `patch` 方法，比较新旧节点，一边比较一边给真实的 dom 打补丁进行替换。

## 5. vue 中的 双向数据绑定 ⭐

### `Object.defineProperty` 方法（vue2）

```js
function observe(obj, callback) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    Object.defineProperty(newObj, key, {
      configurable: true,
      enumerable: true,
      get() {
        return obj[key]
      },
      // 当属性的值被修改时，会调用set，这时候就可以在set里面调用回调函数
      set(newVal) {
        obj[key] = newVal
        callback(key, newVal)
      }
    })
  })
  return newObj
}
 
const obj = observe(
  {
    name: '123',
  },
  (key, value) => {
    console.log(`[${key}]值被修改，为[${value}]`)
  }
)

// 输出：name的值被修改，为321
obj.name = '321'
```

### `es6 Proxy` 方法（vue3）

```js
function observe(obj, callback) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      callback(key, value)
    }
  })
}
 
const obj = observe(
  {
    name: '123',
  },
  (key, value) => {
    console.log(`[${key}]值被修改，为[${value}]`)
  }
)

// 输出：name的值被修改，为321
obj.name = '321'
```

### Object.defineProperty 与 Proxy 优劣对比

**proxy 优势**：

- `Proxy` 可以直接监听对象而非属性；
- `Proxy` 可以直接监听数组的变化；
- `Proxy` 有多达 13 种拦截方法,不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等；
- `Proxy` 返回的是一个新对象,我们可以只操作新的对象达到目的,而 `Object.defineProperty` 只能遍历对象属性直接修改；
- `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化

**Object.defineProperty 优势**：

- 兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平，因此 `Vue` 的作者才声明需要等到下个大版本( 3.0 )才能用 `Proxy` 重写。

## 6. vue 中的 v-model ⭐

- 定义：`v-model` 就是 `vue` 的双向绑定的指令
- 使用场景：一般用于表单 `input`、`textarea`、`select` 等元素上创建双向数据绑定

### 原理

以 `input` 表单元素为例：

```js
<input v-model='val'>

等同于

<input v-bind:value="val" v-on:input="val = $event.target.value">
```


## 7. vue 中的 组件通信 ⭐

- 父组件向子组件传递数据：
  - 父组件通过 `props` 属性传递数据；
  - 子组件通过 `props` 属性接收数据。
- 子组件向父组件传递数据：
  - 子组件通过 `$emit` 方法传递数据；
  - 父组件通过 `v-on` 方法接收数据。
- 兄弟组件之间的通信：
  - 可以在父组件中作为中间人进行传递。
- 跨级组件之间的通信：
  - 祖先组件中定义一个 `provide` 属性，通过该属性向所有子孙组件传递数据；
  - 子孙组件中通过 `inject` 属性接收数据。
- 全局状态管理
  - 使用 `Vuex`、`Pinia` 等状态管理库
- 使用 url 传参，跨页面通信
- 使用 `EventBus` 事件总线，跨页面通信
- 使用本地缓存，`localStorage`、`sessionStorage`, `Cookies`

## 8. vue 中的 Vuex ⭐

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 `store（仓库）`。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

（1）Vuex 的状态存储是响应式的。当 Vue 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

（2）改变 `store` 中的状态的唯一途径就是显式地提交 (commit) `mutation`。这样使得我们可以方便地跟踪每一个状态的变化。
主要包括以下几个模块：

- `State`：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- `Getter`：允许组件从 `Store` 中获取数据，`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性。
- `Mutation`：是唯一更改 `store` 中状态的方法，且必须是同步函数。
- `Action`：用于提交 `mutation`，而不是直接变更状态，可以包含任意异步操作。
- `Module`：允许将单一的 `Store` 拆分为多个 `store` 且同时保存在单一的状态树中。

## 9. vue 中的 nextTick ⭐

- 作用：dom 更新之后执行回调函数；
- 实现原理：通过 `MutationObserver` 和 `setTimeout` 来实现。

### 与 setTimeout 对比

- 都是 `异步函数`
- `nextTick` 比 `setTimeout` 优先执行


## 10. v-show 与 v-if 的区别 ⭐

- `v-show`：元素总是会被渲染，通过控制元素的 `display` 属性来控制显示隐藏；
- `v-if`：真正的条件渲染，`v-if` 切换有一个局部编译/卸载的过程，`v-if` 条件不满足时，条件块内的事件监听器和子组件都会被销毁。

## 11. computed 和 watch 的区别 ⭐

- `computed`：用于计算属性，依赖其他属性，当依赖属性变化时，计算属性会重新计算；
- `watch`：用于监听属性，当属性变化时，会执行监听函数。

**应用场景**：

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 `computed`，因为可以利用 `computed` 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 `watch`，使用 `watch` 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## 12. vue 中的 keep-alive ⭐

- 作用：缓存组件，避免重复渲染；
- 特性：
  - 一般结合路由和动态组件一起使用，用于缓存组件；
  - 提供 `include` 和 `exclude` 属性，两者都支持字符串或正则表达式， `include` 表示只有名称匹配的组件会被缓存，`exclude` 表示任何名称匹配的组件都不会被缓存 ，其中 `exclude` 的优先级比 `include` 高；
  - 对应两个钩子函数 `activated` 和 `deactivated` ，当组件被激活时，触发钩子函数 `activated`，当组件被移除时，触发钩子函数 `deactivated`。

## 13. vue-router 路由模式 ⭐

vue-router 有 3 种路由模式：`hash`、`history`、`abstract`

**vue 源码**：

```js
switch (mode) {
  case  'history' :
      this.history = new HTML5HIstory(this, option.base)
      break
  case   'hash' :
      this.history = new HashHistory(this, option.base,  this.fallback)
      break
  case 'abstract' :
      this.history = new AbstractHistory(this, options.base)
      break
  default :
      if (process.env.NODE_ENV !== 'production') {
          assert(false,  `invalid mode : ${mode}`)
      }
}    
```

- `hash`：使用 `URL hash` 值来作路由。`支持所有浏览器`，包括 `不支持 HTML5 History Api` 的浏览器（`#` 形式拼接）
- `history`: 依赖 `HTML5 History API` 和服务器配置。具体可以查看 `HTML5 History` 模式；（`/` 形式拼接）
- `abstract`: 支持所有 `JavaScript` 运行环境，如 `Node.js` 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## 14. vue3 的新特性 ⭐

### 生命周期

| vue2          | vue3              |
| ------------- | ----------------- |
| beforeCreate  | setup()           |
| created       | setup()           |
| beforeMount   | onBeforeMount     |
| mounted       | onMounted         |
| beforeUpdate  | onBeforeUpdate    |
| updated       | onUpdated()       |
| beforeDestroy | onBeforeUnmount() |
| destroyed     | onUnmounted()     |
| errorCaptured | onErrorCaptured() |

> 使用 `setup` 代替了之前的 `beforeCreate` 和 `created`，其他生命周期名字有些变化，功能都是没有变化的

### 响应式原理

- vue2：`Object.defineProperty`
- vue3：`es6 Proxy`
  
> 具体详情：[5. vue 中的 双向数据绑定 ⭐](#_5-vue-中的-双向数据绑定-⭐)

### Composition API

- `reactive`：响应式代理对象，该对象在被访问或修改时会触发相应的依赖更新。
- `ref`：响应式引用对象，该对象在被访问或修改时会触发相应的依赖更新。
- `computed`：用于创建计算属性。当依赖的数据变化时，计算属性会自动更新。
- `watch`：需要显式指定侦听的数据源和回调函数，支持立即执行、深度侦听等选项。
- `watchEffect`：自动侦听回调函数中使用的响应式数据，无需显式指定数据源。当回调函数中使用的数据变化时，watchEffect 会自动重新执行回调函数。
- `setup`：Composition API 的入口函数，用于替代 Vue 2 中的 data、methods、computed 等选项。

### 新的组件

- `Teleport`：是一种能够将我们的组件 html 结构移动到指定位置的技术。

```js
<teleport to="body">
  <div class="mask" v-if="isShow">
    <div class="dialog"  >
      <h4>弹窗</h4>
      <button @click="isShow = false">关闭</button>
    </div>
  </div>
</teleport>
```

- `Suspense`：等待异步组件时渲染一些额外内容，让应用有更好的用户体验

```js
<template>
  <Suspense>
    <template #default>
      <AsyncComp />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>
 
<script setup>
import { defineAsyncComponent } from 'vue'
 
const AsyncComp = defineAsyncComponent({
  // 异步加载的组件
  loader: () => import('./MyAsyncComponent.vue'),
  // 加载失败时的处理
  error: () => import('./ErrorComponent.vue'),
  // 加载时的占位符
  loadingComponent: LoadingComponent
})
</script>
```

### 其他新特性

- **增强的渲染优化**: Vue 3 的渲染系统进行了优化，包括块级作用域插槽、更新优化等。
- **TypeScript 支持**：拥有更好的类型推断和自动完成
- **自定义渲染器API**：Vue 3 提供了自定义渲染器 API，使得 Vue 可以在不同平台上运行，例如Web, WeChat小程序等。

## 15. vue 项目优化点 ⭐

### 代码层面

- `v-if` 和 `v-show` 区分使用场景
- `computed` 和 `watch` 区分使用场景
- `v-for` 遍历必须为 `item` 添加 `key`，且避免同时使用 `v-if`
- 长列表性能优化
  - 虚拟滚动
  - 骨架屏
  - 懒加载
  - 服务端渲染
- 图片懒加载
- 第三方插件按需引入
- 优化无限列表性能
  - 图片懒加载
  - 虚拟列表
- 预渲染

### Webpack 层面

- 图片压缩
- 减少 ES6 转为 ES5 消耗
  - `babel-loader` 开启 `cacheDirectory` 缓存
  - `babel-loader` 开启多进程打包
  - `babel-loader` 排除 node_modules 目录
  - 使用 `thread-loader` 开启多进程打包
- 使用 `Tree Shaking` 优化代码
  - 清除无用代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap

### 服务器层面

- 浏览器缓存
- CDN
- gzip 压缩
