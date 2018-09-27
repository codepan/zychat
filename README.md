# 增加常用（或必有）目录结构
到这一节差不多基本上就能开发代码了，但是开发中可能还少不了下面这些东西（当然也不局限于这些）：
* 路由（vue-router，项目为单页项目，没有路由怎么玩？）
* 状态管理器（vuex，目前可能，不懂没关系）_
* 公共样式（使用sass编写哦）
* 工具方法（utils）
* 异步请求（axios）
* 第三方类库，或者api
* 全局配置
* and so on ...


***不用这些东西其实也没有太大的关系，但是咱们为了高（装）效（逼），为了代码的好维护，动工前在项目架构和项目目录上面多下些功夫其实也是一件非常有意义的事情***

这节讲完之后，我们将拥有一个非常清晰和易维护的项目目录，这也是我一贯的风格，如果你不适应或者不赞同我"分门别类"的方式，那么可以V我：13341128625

声明一点：这节只是目录的搭建，且只在src目录（开发目录）下面动手，不会讲任何关于技术细节的问题，例如vue-router是神马？vuex又是神马？所以你大可不必担心看不懂，也不要问太多的为什么要这么做。

- api -- 该目录依赖common/js下的http.js文件，用于请求接口的封装
- assets -- 上一节已经讲过，放置一些图片的地方
- common -- 个人习惯，这里放置着许多公共资源，例如js工具类库、公共样式文件、公共配置文件等等
    - js
        - config.js -- 配置文件 
        - http.js -- 封装axios请求 （非常重要）
        - utils.js -- 封装常用工具类（方法）（非常重要）
    * style
        * base.scss -- 基础组件样式
        * index.scss -- 整合所有样式文件
        * mixin.scss -- 混合函数库
        * reset.scss -- 重置样式库
        * var.scss -- 全局变量声明
- components -- 主要放置一些常用组件或公共组件文件
- pages -- 放置视图即页面
- router -- 配置vue-router为什么要放在这里，因为"甲鱼的臀部-规定(龟腚)"，vue-router官方推荐放在这里，我只是照做而已 
- store -- 这是vuex的目录，官方默认，照做就行

有了上面的目录，接下来咱们就可以开始项目开发了，但是这只是一个初步的目录结构，后面新添或者删除或者移动目录的时候，可一定要"积极配合"哦，不要嫌不耐烦。


到目前为止，我们代码其实和业务没有任何关系，也就是可以作为任何项目使用的一个模板项目，下一节（dev7）我还是继续讲解和业务无关的代码，到了dev8我们就要以一个具体的项目：<模仿微信>作为练手的项目。

这节很轻松，作为缓冲，下节任务又会比较繁重，做好心理准备哦！！！

***注意：***
目录下面只有一个.gitignore文件的目录是空目录，由于git会自动忽略掉空目录，导致我的空目录push不到github上来，所以我就加了一个.gitignore文件，在dev7中我们会删掉这个文件，因为到时候这些目录中会放置文件，届时目录就不是空目录了，就可以顺利的push到github中。

