# 浏览器

下面是常见的 `浏览器` 知识点：

## 1. 页面加载过程及原理 ⭐

实际上就是问，从输入URL到页面展示，这中间发生了什么？

<img src="https://img2.imgtp.com/2024/04/26/N7DIqJ83.png" width="100%" />

 - 1. `解析地址`：浏览器根据输入的URL，解析出域名、端口、协议、路径、参数等。
 - 2. `DNS解析`：根据域名，查询对应的IP地址。
 - 3. `建立TCP连接`：浏览器根据IP地址，建立TCP连接。
 - 4. `发送HTTP请求`：请求指定的资源（涉及 3次握手）
 - 5. `服务器响应`：服务器处理来自浏览器的请求，这可能涉及到查询数据库、处理应用逻辑等。服务器生成一个HTTP响应并发送回浏览器。
 - 6. `解析HTTP响应`：浏览器根据HTTP响应，解析出HTML、CSS、JavaScript等资源。
 - 7. `渲染页面`：构建DOM树，构建渲染树，JS逻辑处理，布局，绘制，显示完成的页面。

> 顶级理解：[领悟页面加载原理，成为恋爱高手：一篇不可错过的对线指南](https://juejin.cn/post/7353535887492988938)

## 2. 前端缓存详解 ⭐

<img src="https://img2.imgtp.com/2024/04/26/IC5HsbgA.png" width="100%" />

### HTTP 缓存

**强缓存**：

- `彻底缓存`，在缓存时间内不会向服务器发起请求，直接读取浏览器本地缓存，只有过期之后才会向服务器发起请求
- 状态码：`200`
- 谁来决定：`浏览器`
- 缓存强度：F5 刷新无效，Ctrl+F5 刷新清空
- 存放位置：`Disk Cache`（磁盘缓存）、`Memory Cache`（内存缓存）
- 判断缓存：由 `Expires` 、`Cache-Control` 、`Pragma` 这3个 Header 属性控制。
  
**协商缓存**：

- 协商缓存都会向 `服务器` 发送请求，由 `服务器` 来确定缓存资源是否可用，所以客户端与服务器端要通过某种标识来进行通信。
- 状态码：`304`
- 谁来决定：`服务器`
- 缓存强度：F5 刷新和 Ctrl+F5 刷新都清空
- 判断缓存：由 `Last-Modified / If-Modified-Since`、`ETag / If-None-Match` 这2个 Header 成对属性 控制。

### 浏览器缓存

- 默认缓存：`Bf Cache`，页面前进后退行为，会将浏览器DOM状态保存进该缓存。
- 本地缓存：
  - WebStorage：大小跟浏览器相关，一般是 `5MB`
    - `LocalStorage`：本地 `持久化` 存储，只能被 `显式清除`，数据 `可跨` 页面，跨浏览器
    - `SessionStorage`：会话级别的 `临时` 存储，`关闭页面清除`，`不可跨` 页面，跨浏览器
  - `Cookie`：主要用于用户信息的存储，自动在请求的时候被传递给服务器，大小 `4KB`
  - `IndexDB`：客户端数据库，大小 `无限`。
  - `WebSql`：提供 SQL 操作客户端数据库的 APIs
  - 离线缓存：
    - `Application Cache`：静态资源缓存，h5的新特性
    - `PWA`：基于App Manifest、Service Worker、Push Notification，实现的渐进式Web应用技术

> 顶级理解：[前端缓存揭秘：5年前端技术的必备知识点](https://juejin.cn/post/7352799449456918543)

## 3. 浏览器跨域 ⭐

### 定义

- 协议、域名、端口，只要有一个不同，就属于跨域
- 跨域条件：
  - `协议不同`（http 与 https）
  - `域名不同`（baidu.com 与 google.com）
  - `端口不同`（:8080 与 :80）

### 解决方案

- `CORS`：跨源资源共享，在服务器端设置 `Access-Control-Allow-Origin` 等 HTTP 头部字段来告知浏览器哪些源可以访问该资源。（`后端处理`，常用解决方案一）。
- `JSONP`：JSONP 是一种利用 script 标签没有跨域限制的漏洞，通过动态创建 script 标签，设置其 src 属性为跨域 URL，然后执行该 URL 返回的 JavaScript 代码的一种跨域请求方式。不过，JSONP `只支持 GET 请求`。
- `Nginx` 反向代理：利用 Nginx 作为反向代理服务器，将前端的请求经过 Nginx 服务器转发到目标服务器，再将目标服务器返回的响应返回给前端。（`运维处理`，常用解决方案二）
- `WebSocket`：WebSocket 是一种基于 TCP 协议的全双工通信协议，可以实现客户端和服务器之间长时间的双向通信。由于 WebSocket 不受同源策略的限制，因此可以用于跨域通信。
- `postMessage`：window.postMessage 方法可以在不同窗口的文档中进行跨域通信。例如，在一个窗口中使用 postMessage 方法发送消息，然后在另一个窗口中监听 message 事件来接收消息。
- 设置 `document.domain`：对于主域相同但子域不同的跨域应用场景，可以通过设置相同的 document.domain 来使两个页面共享 Cookie，从而实现跨域通信。
