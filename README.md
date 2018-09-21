# 项目中引入静态资源（以图片为例）
图片在项目中是不可或缺的一部分，css的`background`可能需要引入图片，html的`<img>`也可能需要引入图片，首先咱们得先给这些图片安排个位置，存放下来，
然后再去引用人家吧。

其实图片放在哪里这个并没有强制要求，但是咱们得与国际接轨（vue官方推荐的目录）。使用vue-cli生成的项目目录里面会存在两处存放图片的位置：
* 一处是src目录下面的assets目录
* 一处是根目录下面的static目录

为什么会有两个目录来存放图片呢？这个问题也困扰了我好久，它们的不同点在哪里？一张图片我因该存放在哪里？各自的优缺点是什么？好吧，疑问太多了。

我不打算一上来就跟教科书一样罗列一大堆概念，我看不懂你更看不懂，我打算从实践出发（实践才能出真知）。

首先咱们创建这两个目录，。。。10秒过去了，假设你已经创建好了这两个目录，现在随便找一张图片（尽量小点）放如assets目录中

![](./issue-image/issue21.png)

我整了一个`test1.png`的图片放在assets目录下，注意static目录和assets的目录位置不要放错哦

然后再修改一下App.vue文件，在文件中引入test1.png这样图片，修改如下：
```vue
<template>
    <div id="test">
        <img src="./assets/test1.png" alt="">
        <p>{{text}}</p>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        text: 'codepan yangcx 哈哈哈'
      }
    }
  }
</script>
<style scoped lang="scss">
    $color: red;
    #test{
        font-size: 12px;
        color: $color;

        width: 200px;
        height: 200px;
        border: 1px solid blue;
        border-radius: 20px;
    }
</style>
```

其实也没改啥，就是引入一张图片而已，然后给`{{text}}`加了一个`<p>`标签，仅仅为了好看一些，其实仍然很丑

`npm run dev`快去浏览器中欣赏你引入的那张图片吧，不幸的是，命令行报错了

![](./issue-image/issue22.png)

说是错误发生在test1.png这个文件中，模块解析失败：意料之外的 '?'字符（你妈，说的啥，完全看不懂，明明是张图片，哪来的'?'号）。
重点在这句话：你可能需要一个合适的loader来处理这种文件类型。

好吧，现在大概知道解决办法了。处理vue文件有vue-loader；处理css文件有style-loader、css-loader；处理sass文件有sass-loader。
那么png文件是不是有png-loader？jpg文件是否有jpg-loader？。。。。想法不错，只是想的不够通用，局限性太大，因为图片格式有很多种（png|jpg|jpeg|gif|svg|bmp|psd|...）。那么每一样来个loader岂不被累死，
这个loader被统一叫做`file-loader`***（埋个伏笔：这个loader有一些缺点，后面我们会用一个更牛逼的loader来代替它）***
```
npm i -D file-loader
```
然后打开webpack.config.js文件，加入该loader
```
  module: {
    rules: [
     ...
      {
        test: /.png/,
        loader: 'file-loader'
      }
    ]
  }
}
```
在rules的最后面配置如上的代码，然后运行项目

![](./issue-image/issue23.png)

看到图片了吧，页面瞬间高（并）大（没）上（有）了很多。

通过一张图片，我们难以发现这个loader有什么缺点，如果再引入成百上千张图片问题就会暴露出来，但是这种抛砖引玉的方法成本有些大，项目搭建起来我就被累瘫了，
所以我就直接讲吧！但是得做好心理准备，项目经验相对匮乏的话会比较晦涩难懂，如有电商项目经验那就***浅显易懂***（成语好像用错了？没文化，别笑话）。


为了彻底讲明白file-loader的缺点，引入更牛逼的`xxx-loader`，我思考了好久，感觉寥寥几笔无法讲明白，这是个说来话长的东西，必须从"盘古开天辟地以来"开始讲起（开个玩笑）：

***话题会跑到九霄云外（一定要做好心理准备，不然会不知所云）***

## 传统页面中引入图片的方式

传统的页面引入图片方式无非就是下面两种：
1. html中img标签的src属性

    `<img src="images/image1.png">`
2. css中background的url属性

    `background: url('images/bg.png')`

以上两种方式总结一下：
* img标记的src属性或background的url属性都指定了一个远程服务器上的资源。
* 当网页被加载到浏览器中时，浏览器会针对每个外部资源都向服务器发送一次拉取资源的http请求，占用网络资源。
* 大多数的浏览器都有一个并发请求数不能超过4个的限制。这意味着，如果一个网页里嵌入了过多的外部资源，这些请求会导致整个页面的加载延迟。

这也就是面试时常被问及web性能优化中减少http请求的切入手段

N个静态资源（图片为例）就发送N个http请求的这种现象会无限削（拉）弱（低 ）网（你）站（的）体（逼）验（格）

对于这种现状，`DataURL`技术由此诞生

## DataURL
DataURL给了我们一种很巧妙的将图片“嵌入”到HTML中的方法。
跟传统的用img标记将服务器上的图片引用到页面中的方式不一样，在DataURL协议中，图片被转换成base64编码的字符串形式，并存储在URL中，冠以mime-type。
使用技术，会减少http请求，提升网页性能，图片数据以base64字符串格式嵌入到了页面中，与HTML成为一体，它的形式如下：
```
<img src="data:image/png;base64,R0lGODlhMwAxAIAAAAAAAP///
yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGX
ElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgd
LbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wn
k2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbF
ZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw==">
```
一串形如火星文的东西和平时指定网络资源加载图片的方式除了不再发起http请求之外没有任何区别，图片照样能完美的显示在页面中。

为什么要有DataURL技术，因为DataURL跟传统的外部资源引用方式相比，它有如下用处：
>* 当访问外部资源很麻烦或受限时
>* 当图片是在服务器端用程序动态生成，每个访问用户显示的都不同时
>* 当图片的体积太小，占用一个HTTP会话不是很值得时

当然任何事物都有两面性，DataURL也不例外，它也有不适用的场合：
>* Base64编码的数据体积通常是原数据的体积4/3，也就是DataURL形式的图片会比二进制格式的图片体积大1/3
>* DataURL形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。
这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候

然而，DataURL这些不利的地方完全可以避免或转化。

诚然，无法否认缓存在浏览器性能中的重要作用——如何能将Data URL数据也放入浏览器缓存中呢？答案是：通过CSS样式文件。CSS中的url操作符是用来指定网页元素的背景图片的，而浏览器并不在意URL里写的是什么——只要能通过它获取需要的数据。所以，我们就有了可以将Data URL形式的图片存储在CSS样式表中的可能。而所有浏览器都会积极的缓存CSS文件来提高页面加载效率。



