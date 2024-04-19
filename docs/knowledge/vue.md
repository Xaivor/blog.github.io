# Vue 部分
下面是常见的 `Vue` 基础问题：

## 1. vue 中的 MVVM 模式 ⭐
MVVM 模式是一种设计思想。`Model` 代表数据模型，`View` 代表 UI 组件，`ViewModel` 监听模型数据的改变和控制视图行为、处理用户交互，将数据同步到 `Model` 中。

## 2. vue 中的生命周期 ⭐
总共分为 8 个阶段，具体为：创建前/后，载入前/后，更新前/后，销毁前/后。

- 创建前/后： 
  - 在  `beforeCreated` 阶段：vue 实例的挂载元素 $el 和数据对象 data 都为 undefined，还未初始化；
  - 在 `created` 阶段，vue 实例的数据对象 data 有了，$el 还没有。
- 载入前/后：
  - 在 `beforeMount` 阶段，vue 实例的 $el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换；
  - 在 `mounted` 阶段，vue 实例挂载完成，data.message 成功渲染。
- 更新前/后：当 data 变化时，会触发 `beforeUpdate` 和 `updated` 方法。
- 销毁前/后：在执行 `destroy` 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在。

## 3. vue 中的 Diff 算法 ⭐
- 作用：修改 dom 的一小段，不引起 dom 树的重绘
- 实现原理：diff 算法将 `virtual dom` 的某个节点数据改变后生成的新的 vnode 与旧节点进行比较，并替换为新的节点，具体过程就是调用 `patch` 方法，比较新旧节点，一边比较一边给真实的 dom 打补丁进行替换。