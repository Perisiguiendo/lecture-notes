## webpack中hash、chunkhash、contenthash区别

webpack中对于输出文件名可以有三种hash值：

1. hash

2. chunkhash

3. contenthash

这三者有什么区别呢？

###  hash（所有文件哈希值相同，只要改变内容跟之前的不一致，所有哈希值都改变，没有做到缓存意义）

hash是跟整个项目的构建相关，构建生成的文件hash值都是一样的，所以hash计算是跟整个项目的构建相关，同一次构建过程中生成的hash都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。

如果出口是hash，那么一旦针对项目中任何一个文件的修改，都会构建整个项目，重新获取hash值，缓存的目的将失效。

![img](https://img2018.cnblogs.com/blog/887360/201809/887360-20180904134123992-581664738.png)



hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存。



###  chunkhash（同一个模块，就算将js和css分离，其哈希值也是相同的，修改一处，js和css哈希值都会变，同hash，没有做到缓存意义）

chunkhash根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。并且webpack4中支持了异步import功能，固，chunkhash也作用于此，如下：

![img](https://img2018.cnblogs.com/blog/887360/201809/887360-20180904135805932-1678207702.png)

我们将各个模块的hash值 (除主干文件) 改为chunkhash，然后重新build一下，可得下图：

![img](https://img2018.cnblogs.com/blog/887360/201809/887360-20180904140120087-728478633.png)

我们可以清晰地看见每个chunk模块的hash是不一样的了。

但是这样又有一个问题，因为我们是将样式作为模块import到JavaScript文件中的，所以它们的chunkhash是一致的，如test1.js和test1.css：

![img](https://img2018.cnblogs.com/blog/887360/201809/887360-20180904140438870-871123820.png)

这样就会有个问题，只要对应css或则js改变，与其关联的文件hash值也会改变，但其内容并没有改变呢，所以没有达到缓存意义。固contenthash的用途随之而来。

###  contenthash（只要文件内容不一样，产生的哈希值就不一样）

contenthash是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变，所以我们可以通过contenthash解决上诉问题。如下：

![img](https://img2018.cnblogs.com/blog/887360/201809/887360-20180904141159855-1073612332.png)