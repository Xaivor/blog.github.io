# React

下面是常见的 `React` 知识点：

## 1. React 中的 Fiber 架构 ⭐

`Fiber` 架构是 `React` 16 引入的一种新的架构，它允许 `React` 在渲染过程中进行中断和恢复，从而实现更流畅的用户体验。

解决的痛点：

- `增量渲染`：Fiber 架构可以将渲染工作拆分成多个时间片段执行，使得每个时间片段都有机会插入其他优先级更高的任务，从而在保证页面响应性的同时，尽可能快地完成渲染工作。
- `优先级调度`：Fiber 架构引入了任务优先级的概念，可以根据任务的紧急程度和重要性对任务进行优先级排序，确保优先级较高的任务能够尽早得到处理，提高用户交互的流畅度。
- `可中断和恢复`：Fiber 架构支持任务的中断和恢复，即在渲染过程中，如果有更高优先级的任务需要处理，当前任务可以被暂停并稍后恢复，以确保更及时地响应用户操作。
- `更好的错误处理`：Fiber 架构为错误处理提供了更好的机制。每个 Fiber 都有自己的错误边界，可以捕获并处理组件树中发生的错误，并在不崩溃整个应用程序的情况下进行优雅降级。

## 2. React 中的 Diff 算法 ⭐

`React Diff` 算法是 React 虚拟 Dom 的核心。它允许 React 快速确定虚拟 Dom 树上的哪些部分需要更新，从而使得 UI 更新非常的高效。

### 同级比较

- React 不会进行跨层级的 DOM 比较。它只比较同一层级的元素。
  
### 元素类型

- **类型不同，删除重建**：当两棵树的相同位置找到两个不同类型的元素时，React 会直接销毁旧节点及其子节点，并从头开始创建新节点。
- **类型相同，复用节点**：如果两个元素是相同类型的，React 会保留该 DOM 节点，并仅更新变化的属性。并递归地对其子节点进行比较。

### Keys重要性

当在数组中渲染子节点时，必须为每个子节点分配一个稳定的 Key 值。通过为每个节点分配一个 Key，React 可以使用这个 Key 来识别那些在不同的渲染中仍然保持不变的元素。
> 如果你没有设置 Key，React 内部会默认使用元素的索引作为它们的 Key
>
> `若是设置一个随机 Key 会怎样`？

**现象**：每次组件渲染，随机 Key 值都会变化，即时实际渲染的数据没有变，这个元素也会被销毁重新创建。

这将导致以下问题出现：

1. 性能下降
2. 状态丢失
   - 如果一个组件或元素依赖于本地状态或维护状态（如输入字段）。
3. 不一致的 DOM 行为
   - 这可能导致不可预测的行为，如焦点丢失、文本选择丢失等。
  
## 3. React 中的 Virtual DOM ⭐

虚拟 DOM 本质上是一个 JS 对象，它反映了真实 DOM 的结构和内容。

- 1.提供一个中间缓存，使得直接操作实际的 DOM（这通常是昂贵的操作）不再那么频繁。
- 2.通过对比新旧虚拟 DOM 来计算出最小的变动，从而优化实际 DOM 的更新。

虚拟 DOM 可以让 React 更优雅高效的更新真实 DOM，虚拟 DOM 可以让开发者不用关注 DOM 操作，只操作数据。

## 4. React 中的 Hooks ⭐

`Hooks` 是 React 16.8 版本引入的新特性，它允许在函数组件中使用状态（state）和生命周期（lifecycle）等 React 特性。

### 常用 Hooks

- `useState`：用于在函数组件中定义和更新状态（state）。
- `useEffect`：用于在函数组件中执行副作用操作（side effect）。
- `useContext`：用于在函数组件中获取上下文（context）的值。
- `useReducer`：用于在函数组件中实现状态管理。
- `useRef`：用于在函数组件中获取对 DOM 元素的引用。
- `useCallback`：用于在函数组件中缓存函数。
- `useMemo`：用于在函数组件中缓存计算结果。
- `useLayoutEffect`：类似于 `useEffect`，但会在 DOM 更新后同步调用副作用函数。

## 5. React 中的 生命周期 ⭐

React 组件的生命周期是指组件从创建到销毁的过程，它包括三个阶段：`挂载`、`更新`和`卸载`。

- `挂载`：组件创建时，会调用 `constructor` 方法，然后调用 `render` 方法，最后调用 `componentDidMount` 方法。
- `更新`：当组件的 `props` 或 `state` 发生变化时，会调用 `render` 方法，然后调用 `componentDidUpdate` 方法。
- `卸载`：当组件从 DOM 中移除时，会调用 `componentWillUnmount` 方法。

### 挂载阶段

- `constructor`：在组件创建时调用，用于初始化组件的状态。
- `render`：在组件创建时调用，用于返回组件的 UI 结构。
- `componentDidMount`：在组件挂载后调用，用于执行一些副作用操作，如发送网络请求、订阅事件等。

### 更新阶段

- `componentWillReceiveProps`：在组件接收到新的 `props` 时调用，用于更新组件的状态。
- `shouldComponentUpdate`：在组件接收到新的 `props` 或 `state` 时调用，用于判断是否需要重新渲染组件。
- `componentWillUpdate`：在组件接收到新的 `props` 或 `state` 且 `shouldComponentUpdate` 返回 `true` 时调用，用于更新组件的状态。
- `render`：在组件接收到新的 `props` 或 `state` 时调用，用于返回组件的 UI 结构。
- `componentDidUpdate`：在组件更新后调用，用于执行一些副作用操作，如发送网络请求、订阅事件等。

### 卸载阶段

- `componentWillUnmount`：在组件从 DOM 中移除时调用，用于执行一些清理操作，如取消订阅事件、清除定时器等。

## 6. useMemo、React.memo、useCallback区别 ⭐

`useMemo` 和 `React.memo` 都是 React 中的性能优化工具，但它们的作用和用法上有些区别。

- `useMemo`：用于在组件渲染时计算某个值，并将计算结果缓存起来，避免在每次渲染时重新计算。
- `React.memo`：用于优化组件的渲染，当组件的 props 没有变化时，避免重新渲染。
- `useCallback`：用于在组件渲染时缓存某个函数，避免在每次渲染时重新创建函数。

## 7. useState 和 useRef 区别 ⭐

- 触发渲染：`useState` 更新状态时会触发组件的重新渲染，而 `useRef` 更新 `.current` 属性时不会。
- 用途：`useState` 用于那些组件状态（通常是用户界面状态），这些状态的改变需要导致组件重新渲染。`useRef` 用于持久化存储数据，这些数据的改变不应该引起渲染。
- 返回值：`useState` 返回一个状态值和一个更新这个状态值的函数。`useRef` 返回一个具有 `.current` 属性的对象，你可以在其中存储任何值。

## 8. useEffect 和 useLayoutEffect ⭐

### useEffect

- 作用：`useEffect` 允许你执行任何在组件渲染后需要执行的操作。这些副作用包括数据获取、订阅或手动更改 React 组件树之外的 DOM。
- 执行时机：`useEffect` 在组件渲染到屏幕之后被调用，因此不会阻塞 DOM 的更新。这对于大多数副作用是合适的，尤其是那些不需要同步到屏幕的操作。
- 示例用途：数据请求、设置订阅、以及任何需要在组件加载后执行且不需要立即反映在屏幕上的操作。

### useLayoutEffect

- 作用：`useLayoutEffect` 的使用和 `useEffect` 相似，但它在 DOM 更新完成后、浏览器绘制之前同步调用。这使得它可以读取 DOM 布局并同步重新渲染。
- 执行时机：`useLayoutEffect` 会在 DOM 更新后立即同步执行，但在浏览器进行任何绘制之前，这意味着你可以在浏览器绘制之前读取布局并同步更新它，避免不必要的视觉闪烁。
- 示例用途：用于需要同步计算和重新渲染的操作，例如测量 DOM 节点的布局、同步动画等。

## 9. 类组件 和 函数组件 ⭐

React一开始，以类组件作为主体，在React16.8版本（引入React Hooks）后，解决了类组件的部分痛点（Hooks部分再说明），函数组件后来者居上。

### 类组件

**定义特点**：

- 组件首字母大写
- 继承自 React.Component
- 必须实现render函数

**实现方式**：

- 使用ES6 Class语法
- 构造器是可选的，用于初始化数据

```jsx
import React, { Component } from 'react';
 
export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
 
  render() {
    return (
      <div>
        <h1>我是类组件</h1>
      </div>
    );
  }
}
```

### 函数组件

函数组件，字面意思，就是JavaSript函数作为React组件。

**定义特点**：

- 组件首字母大写
- 无生命周期函数，可用useEffect替代
- 无状态管理，可用useState替代

```jsx
// 定义一个函数组件  
function Greeting({ name }) {  
  // 使用JSX来渲染组件的UI  
  return (  
    <div>  
      Hello, {name}!  
    </div>  
  );  
}  
  
// 在另一个组件或应用中使用Greeting组件  
function App() {  
  return (  
    <div className="App">  
      <Greeting name="Alice" />  
      <Greeting name="Bob" />  
    </div>  
  );  
}  
  
export default App;
```

## 10. 高阶组件 ⭐

- **定义**：高阶组件（HOC）是一个函数，接收一个组件作为参数，返回一个新的组件。
- 应用场景：
  - **复用逻辑**：高阶组件可以帮助我们在组件之间复用逻辑，避免重复代码。如果你现在多个组件有相同的逻辑代码，你可以将这个逻辑抽离出来封装一个高阶组件，实现代码逻辑的复用。
  - **加工 props**：高阶组件可以加工传递给组件的 props，从而改变组件的行为。
  - **条件渲染**：高阶组件可以根据特定的条件来决定是否渲染组件。
  - **提供额外功能**：高阶组件可以增强现有组件的功能，如错误处理，数据获取等等。

## 11. 受控组件 和 非受控组件 ⭐

### 受控组件

- **定义**：受控组件是指通过 `React` 的 `state` 来控制组件的输入。每当表单数据改变时，都会通过一个事件处理函数来更新 `state`，然后组件会根据这个新的 `state` 来重新渲染。
- **特点**：
  - `数据驱动`：组件的状态完全由 `React` 的 `state` 和 `props` 控制。
  - `即时更新`：每个状态的改变都伴随着组件的重新渲染。
  
  ```jsx
  import React, { useState } from 'react';

  function ControlledComponent() {
      const [value, setValue] = useState('');

      const handleChange = (event) => {
          setValue(event.target.value);
      };

      return <input type="text" value={value} onChange={handleChange} />;
  }
  ```

### 非受控组件

- **定义**：非受控组件是指通过 `DOM` 的 `ref` 来控制组件的输入。非受控组件通过 `DOM` 的 `ref` 来获取组件的输入，而不是通过 `React` 的 `state` 来控制组件的输入。
- **特点**：
  - `DOM` 驱动：表单数据由 `DOM` 节点自己管理，`React` 不负责维护状态。
  - 使用 `ref` 访问：通常通过 `ref` 来从 `DOM` 节点获取表单数据。
  
  ```jsx
  import React, { useRef } from 'react';

  function UncontrolledComponent() {
      const inputRef = useRef(null);

      const handleSubmit = (event) => {
          alert('A name was submitted: ' + inputRef.current.value);
          event.preventDefault();
      };

      return (
          <form onSubmit={handleSubmit}>
              <input type="text" ref={inputRef} />
              <button type="submit">Submit</button>
          </form>
      );
  }
  ```

### 对比

| 组件类型      | 数据管理        | 更新方式                    | 使用场景              |
| ------------- | --------------- | --------------------------- | --------------------- |
| `受控` 组件   | 由 `React` 管理 | `state` 和 `props` 实时更新 | 实时验证，控制 `输入` |
| `非受控` 组件 | 由 `DOM` 管理   | 依赖 `ref` 获取当前值       | 表单提交，`取值`      |

> 总结：`React` 推荐使用受控组件来实现表单，因为需要控制组件的状态和行为。但非受控组件在一些场景下（例如性能要求极高）可能更为简单。

## 12. React 18 的新特性 ⭐

> [官方文档：React v18.0 的新特性](https://zh-hans.react.dev/blog/2022/03/29/react-v18)

### Concurrent Mode（并发模式）

`Concurrent Mode` 是一种新的渲染模式，它允许 `React` 在主线程上执行渲染操作，从而提高应用程序的性能和响应能力。

在 `React18` 之前，所有任务都被视为急迫任务，`react18` 引入了并发模式，在这个模式下，渲染是可以中断的，高优先级的任务可以优先渲染更新。开启并发模式只需要将之前的 `ReactDom.render` 换成 `ReactDom.createRoot` 这个新的 `api` 即可。

### 自动批量处理

在 `React18` 之前，我们只在 `React` 事件处理函数 中进行批处理更新。默认情况下，在 `promise`、`setTimeout`、原生事件处理函数中、或任何其它事件内的更新都不会进行批处理。`React18` 之后，默认自动执行批处理，多次更新合并为一次更新。

### 其他

- 新的 Suspense 特性：允许在组件中使用异步组件，从而实现组件的懒加载和错误边界处理。
- 新的 Hooks：`useId`、 `useTransition`、 `useDeferredValue`、 `useSyncExternalStore`、 `useInsertionEffect`
- 新的 根节点挂载方式：使用新的 `API createRoot` 来替代旧的 `render` 方法。

## 13. React Vue 异同处 ⭐

### 相同点

- 都有 虚拟 `Dom + Diff` 算法 的渲染机制，用于提升渲染速度
- 都使用 组件化开发，通过 `props` 传参等方式进行父子数据通信
- 都具备 状态管理（ `Vue` 的 `Vuex/Pinia`，`React`的 `Redux/Mobx` ）
- 都支持 跨平台开发（ `Vue` 的 `Uniapp`， `React` 的 `React Native` ）

### 不同点

**1.框架层面**：

`Vue`：

- 本质属于 MVVM 模式（由 MVC 发展出来的）
- 由于 MVVM 模式，`双向数据流`

`React`：

- 严格意义上，只能算是 MVC 中的 View 层
- 由于 MVC 模式，`单向数据流`

**2.数据层面**：

`Vue`：

- vue 推崇 `响应式`，实现了数据的 `双向绑定`。
- 由于数据可变，当数据发生变化，可通过 getter/setter 以及一些 函数的 `劫持监听数据的变化`
- 并且当数据变化时，可直接更新到对应的虚拟 Dom（VM 的理念）


React：

- React 推崇 `不可变（Immutable）`，为 `单向数据流`。
- 由于数据不可变，所以 React 无需监听数据的变化，React 只对 `setState` 之后会有 `重新渲染` 的流程
- 当数据发生变化（ setState 之后），React 默认是通过 `比较引用的方式（Diff） 进行的`，所以若是不优化，则会导致大量非必要渲染，从而影响性能（代码要求更高）

**3.渲染层面**：

`Vue`：

- Vue 可以很快的计算出虚拟 DOM 的差异，这由于它监听了每一个组件的依赖关系，`不需要重新渲染整个组件树`

`React`：

- React 数据变化时，`会将全部子组件重新渲染`。但可 shouldComponentUpdate 这个生命周期函数进行控制。

**4.Diff 算法**：

`Vue`：

- `同层比较新老`：新的不存在旧的存在就删除，新的存在旧的不存在就创建
- 基于 Snabbdom 库，使用`双向链表，边对比，边更新 DOM`。

`React`：

- `递归同层比较`，标识差异点保存到 Diff 队列，从而得到 patch 树，再 `统一操作批量更新` DOM。

**5.其他层面**：

- 模板语法不同：Vue 是 `指令+模板语法`，react 是 `函数式编程`
- 性能优化可控：Vue 性能优化（自动的）相对 React 可控性低，因此大型应用，数据量庞大，无需过量非必要的 Watcher，出于性能方面，推荐使用可控的 React。
- 社区生态差异：Vue 国内受众人群多，React 国际受众人群多（更为成熟↑）

## 14. React 中的 组件通信 ⭐

### Props

最基本的通信方式，适用于简单的父子关系，单向传递。

### State

使用 React 的内置 Hook `useState` 或 `useReducer`，来更复杂的状态管理。

### Context

跨层级组件通信，创建 Context 对象，在父组件中使用 `<Context.Provider>` 包裹需要共享数据的子组件，然后在子组件中使用 `<Context.Consumer>` 或 `useContext` Hook 来访问这些数据。

### 事件回调函数

- 子组件可以通过回调函数（作为 props 传递）来通知父组件某些事件或状态的变化。
- 父组件可以定义这些回调函数，并在子组件触发事件时执行相应的逻辑

### Redux

- 对于更复杂的应用，可能需要使用 `Redux` 这样的状态管理库。
- `Redux` 提供了一种集中的方式来存储和管理应用的状态，并提供了一套可预测的状态更新机制。
- 通过 `Redux`，组件可以通过 `action` 来触发状态的更新，并通过 `selector` 来获取状态数据。

### 其他库和框架

- MobX、Zustand 等其他状态管理的插件。

## 15. Redux 状态管理库 ⭐

`Redux` 是 `react` 的一个状态管理库。

`Redux` 的三大原则：

- 1.单一数据源：应用的状态存储在唯一的 `store` 中。
- 2.状态是只读的：唯一改变状态的方式是触发 `action`。
- 3.使用纯函数执行修改：为了指定 `action` 如何改变状态，你需要编写 `reducers`。

常用概念：

- `Actions`：描述发生了什么的对象。
- `Reducers`：指定每个 `action` 如何改变应用状态的函数。
- `Store`：将 `Actions` 和 `Reducers` 绑定在一起的对象。

> Redux 通过解耦状态和 UI，使得状态管理更加明确和可预测。但也因为其模式和约束，对于一些简单的应用，使用 Redux 可能会显得过于复杂。不过，在大型应用和复杂状态管理场景下，Redux 的优势就显现出来了。
