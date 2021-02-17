##  dependencies和devDependencies的区别？

![dependencies](D:\资料\lecture-notes\npm\dependencies.jpg)

- `devDependencies`：开发环境使用
- `dependencies`：生产环境使用

例如：`webpack`，`gulp`等打包工具，这些都是我们开发阶段使用的，代码提交线上时，不需要这些工具，所以我们将它放入`devDependencies`即可，但是像`jQuery、Vue`这类插件库，是我们生产环境所使用的，所以如要放入`dependencies`，如果未将`jquery`安装到`dependencies`，那么项目就可能报错，无法运行，所以类似这种项目必须依赖的插件库，我们则必须打入`dependencies`中