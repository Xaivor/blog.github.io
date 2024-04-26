# webpack

下面是常见的 `webpack` 知识点：

## 1. webpack 概念 ⭐

> `webpack` 是一个前端的打包工具，可以打包各种资源，如：`JS`、`CSS`、图片、字体等。

### 解决痛点

> 为了解决哪个痛点，才有 webpack ?

如果像以前开发时一个 html 文件可能会引用十几个 js 文件,而且顺序还不能乱，因为它们存在依赖关系，同时对于 ES6+ 等新的语法，less, sass 等 CSS 预处理都不能很好的解决……，此时就需要一个处理这些问题的工具。

### 基本功能

- **代码压缩（文件优化）**：将 `JS`、`CSS` 代码混淆压缩，减小代码体积，提高加载速度
- **编译语法（代码转化）**：对于无法被浏览器直接识别的语法，如 `Less`、`Sass`、`ES6`、`TypeScript` 等，`webpack` 可以配合相应的加载器和插件进行编译和转换。
- **处理模块化**：`webpack` 能够处理 `JS`、`CSS` 的模块化语法，将它们编译为浏览器可识别的形式。
- **自动刷新**：监听本地源代码的变化，自动构建，刷新浏览器
- **代码校验**：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统。

### 工作原理

它做的事情是，分析你的项目结构，找到 `JavaScript` 模块以及其它的一些浏览器不能直接运行的拓展语言（`Sass`，`TypeScript`等），并将其转换和打包为合适的格式供浏览器使用。在 3.0 出现后，`webpack` 还肩负起了优化项目的责任。

### 打包原理

- **把一切都视为模块**：不管是 css、JS、Image 还是 html 都可以互相引用，通过定义 entry.js，对所有依赖的文件进行跟踪，将各个模块通过 `loader` 和 `plugins` 处理，然后打包在一起。
- **按需加载**：打包过程中 webpack 通过 `Code Splitting` 功能将文件分为多个 `chunks`，还可以将重复的部分单独提取出来作为 `commonChunk`，从而实现按需加载。把所有依赖打包成一个 `bundle.js` 文件，通过代码分割成单元片段并按需加载

### 核心概念（属性）

- **entry**：入口，指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图
- **output**：出口，指示 webpack 打包后的资源 `bundles` 输出到哪里去，以及如何命名，默认为 `./dist`
- **loader**：转换器，用于把模块原内容按照需求转换成新内容。
- **plugins**：插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
- **module**：模块，在 webpack 里一切皆模块，一个模块对应着一个文件。webpack 会从配置的 `entry` 开始递归找出所有依赖的模块。

## 2. webpack Loader ⭐

以下是常用的 `Loader` :

### CSS

- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `less-loader`：把 Less 代码转换成 CSS
- `sass-loader`：把 Scss、Sass 代码转换成 CSS
- `postcss-loader`：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
  
### File  

- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- `image-loader`：加载并且压缩图片文件
- `svg-inline-loader`：将压缩后的 SVG 内容注入代码中
- `url-loader`：把文件转换成 base64 编码，通过 data URI 来引用转换后的文件
- `json-loader` 加载 JSON 文件（默认包含）
- `source-map-loader`：加载额外的 Source Map 文件，以方便断点调试

### JS

- `babel-loader`：将 ES6 转换成 ES5
- `ts-loader`: 将 TypeScript 转换成 JavaScript
- `awesome-typescript-loader`：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
- `vue-loader`：加载 Vue.js 单文件组件

### 校验

- `eslint-loader`：通过 ESLint 检查 JavaScript 代码
- `tslint-loader`：通过 TSLint检查 TypeScript 代码

### 测试

- `mocha-loader`：加载 Mocha 测试用例的代码
- `coverjs-loader`：计算测试的覆盖率

> 更多见官网：[Loaders | webpack 中文文档](https://webpack.docschina.org/loaders/)

## 3. webpack Plugin ⭐

以下是常用的 `Plugin` :

- `HotModuleReplacementPlugin`：模块热更新插件。(依赖于 webpack-dev-server)
- `html-webpack-plugin`：简化 HTML 文件创建 (依赖于 html-loader)
- `clean-webpack-plugin`：打包前清理上次项目生成的 bundle 文件
- `ignore-plugin`：忽略第三方包指定目录，制定目录不打包
- `define-plugin`：定义全局变量
- `copy-webpack-plugin`：复制文件到指定目录
- `mini-css-extract-plugin`：提取 CSS 到单独文件，支持按需加载
- `optimize-css-assets-webpack-plugin`：压缩和优化 CSS
- `uglifyjs-webpack-plugin`：webpack4 以前 压缩 JS（不支持 ES6）
- `terser-webpack-plugin`：webpack4 压缩 JS（支持ES6）
- `compression-webpack-plugin`：压缩资源
- `speed-measure-webpack-plugin`：分析打包速度

> 更多见官网：[Plugins | webpack 中文文档](https://webpack.docschina.org/plugins/)


## 4. Loader Plugin 区别 ⭐

|        | 本质   | 在哪配置            | 配置字段       | 运行时机             |
| ------ | ------ | ------------------- | -------------- | -------------------- |
| Loader | `函数` | `module.rules` 字段 | 数组（`对象`） | 打包文件前（预处理） |
| Plugin | `插件` | `plugins` 字段      | 数组（`实例`） | 整个编译周期         |

>共同点： 两者都是为了扩展 webpack 的功能。

## 5. webpack 构建流程 ⭐

<img src="https://pcsdata.baidu.com/thumbnail/67b7caf54q77532a2e95e4fd28c9d3de?fid=3471640123-16051585-1124148084085886&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-ju35PsyAu2W9DgHHgBjYMfihgKU%3D&expires=2h&chkv=0&chkbd=0&chkpc=&dp-logid=393765110463796629&dp-callid=0&time=1714093200&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video" width="100%" />

- `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- `确定入口`：根据配置中的 entry 找出所有的入口文件
- `编译模块`：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- `完成模块编译`：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 6. webpack 打包优化 ⭐

- `使用代码分割` (Code Splitting)：
  - 使用 import() 语法动态导入模块，webpack 会自动进行代码分割。
  - 使用 SplitChunksPlugin 插件来进一步分割公共代码。

- `压缩和优化输出文件`
  - 使用 TerserPlugin 插件来压缩 JavaScript 代码。
  - 使用 OptimizeCSSAssetsPlugin 或 cssnano 来压缩 CSS 代码。
  - 使用 compression-webpack-plugin 插件来压缩输出的 gzip 或 brotli 文件。

- `利用缓存`
  - 使用 cache-loader 或 webpack 内置的持久化缓存来缓存已编译的模块，减少重新编译的时间。
  - 使用 hard-source-webpack-plugin 来缓存构建结果，进一步提高速度。

- `优化加载器` (Loaders)
  - 尽量减少使用加载器，尤其是那些处理大文件的加载器。
  - 使用 exclude 和 include 选项来限制加载器处理的文件范围。
  - 使用 thread-loader 或 happypack 来并行处理加载器任务。

- `减少解析模块`
  - 使用 resolve.modules 来指定查找模块的目录，减少 webpack 的搜索范围。
  - 使用 resolve.extensions 来减少扩展名的尝试，例如只解析 .js 和 .jsx 文件。
  - 使用 resolve.alias 来为模块创建别名，简化模块引用。

- `使用 DLL Plugin`
  - 使用 DllPlugin 和 DllReferencePlugin 来将特定的依赖库与业务代码分离，减少构建时间。

- `Tree Shaking`
  - 利用 ES6 模块的特性，webpack 可以在打包时去除未引用的代码，实现 Tree Shaking。确保你的项目配置正确支持这一特性。
  
- `优化依赖`
  - 定期更新和审查项目的依赖，确保使用最新和最有效的库。
  - 使用 webpack-bundle-analyzer 插件来分析打包后的文件，找出可能的问题和优化点。
  
- `使用更快的硬件和文件系统`
  - 使用 SSD 而不是 HDD 来提高文件读写速度。
  - 增加内存或使用更快的 CPU 可以提高构建速度。

- `其他插件和工具`
  - 使用 speed-measure-webpack-plugin 来分析构建过程中各个步骤的耗时，找出性能瓶颈。
  - 考虑使用其他构建工具或配置，如 vite 或 esbuild，它们在某些场景下可能比 webpack 更高效。

> 更多参考官网：[构建性能|webpack 中文文档](https://www.webpackjs.com/guides/build-performance/)

## 7. HMR 热更新 ⭐

webpack 的热更新又称热替换（`Hot Module Replacement`），缩写为 `HMR`。这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

### 原理

通过监视源代码的更改（`chunk diff`），如 JavaScript、CSS 等。实际上 WDS 与浏览器之间维护了一个 `Websocket`，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 `Ajax` 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 `jsonp` 请求获取该 chunk 的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 `HotModulePlugin` 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 `react-hot-loader` 和 `vue-loader` 都是借助这些 API 实现 HMR。

## 8. Tree Shaking

Tree Shaking 是一种通过清除无用代码来减少最终打包文件大小的优化技术。

### 原理

- `静态导入分析`：Tree Shaking 的核心是对 `ES6` 模块的静态结构进行分析。`ES6` 模块的导入（import）和导出（export）语句是静态的，这意味着它们不可以在运行时改变。这种静态性使得打包工具能够在构建阶段确定每个模块是否被使用。
- `标记未使用代码`：在构建过程中，打包工具会分析代码，标记所有未被使用的模块或导出。这一过程依赖于代码的依赖树。
- `移除未使用代码`：在最后的打包阶段，所有被标记为未使用的代码会被移除。这通常是通过压缩工具（如 Terser）实现的，这些工具能够移除未被引用的代码。

## 9. Source Map

`Source Map` 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 `Source Map`。

> map 文件只要不打开开发者工具，浏览器是不会加载的。

线上环境一般有三种处理方案：

- `hidden-source-map`：借助第三方错误监控平台 Sentry 使用
- `nosources-source-map`：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高
- `sourcemap`：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

> 注意的是：避免在生产中使用 inline- 和 eval- ，因为它们会增加 bundle 体积大小，并降低整体性能。

## 10. Babel ⭐

Babel 是将 ES6 及以上版本的代码转换为 ES5 的工具。

### 原理

> AST：虚拟语法树（Abstract Syntax Tree）

- 1. `解析`：将代码转换成 AST
  - 词法分析：将代码(字符串)分割为token流，即语法单元成的数组
  - 语法分析：分析 token 流(上面生成的数组)并生成 AST
- 2. `转换`
  - 访问 AST 的节点进行变换操作生产新的 AST
- 3. `生成`
  - 以新的 AST 为基础生成代码

### 使用场景

- 1. `语言特性转换`：将 ES6+ 代码转换为更广泛兼容的 ES5 代码。
- 2. `浏览器兼容性`：确保 JavaScript 代码可以在旧版浏览器上运行。
- 3. `React 开发`：转换 JSX 代码为普通的 JavaScript。
