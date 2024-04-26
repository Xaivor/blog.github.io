# CSS

下面是常见的 `CSS` 知识点：

## 1. BFC ⭐

`块级格式化上下文`（Block Formatting Context），是页面上一块独立的渲染区域，内部元素盒子都按照其特定的规则进行排列渲染，且区域内的布局与区域外的布局不相互影响。

### 如何创建？

- `根元素` html 直接生成 BFC
- `overflow` 值不为 visible 和 clip 的块元素
- `position` 值为 absolute 或 fixed
- `float` 值不为 none
- `display` 值为 inline-block、flow-root、table、table-row、table-row-group、table-header-group、table-footer-group、table-cell、table-caption 等


### BFC 的作用

- `阻止外边距折叠`：
相邻元素的距离，会采取外边距最大值，可以设置其中一个元素为BFC，避免外边距折叠
- `清除浮动`：
浮动元素会脱离文档流，导致父元素高度塌陷，可以设置父元素为 BFC，避免高度塌陷
- `自适应两栏布局`：
左侧定宽，右侧自适应，可以设置右侧元素为 BFC，避免右侧元素被左侧元素遮挡

## 2. 水平垂直居中

- `flex` 布局

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- `position` 布局

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

- `table` 布局

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.child {
  display: inline-block;
}
```

## 3. 清除浮动

- 该元素 `::after` 添加 `clear:both` 样式
- 使用 `BFC`（overflow: hidden）
- `flex` 布局
- `grid` 布局

## 4. 手写三角形

```css
// 上三角
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```
