# 基础代码建设
我们的目标是模仿微信，但是目前我的能力无法一蹴而就，设计全面。所以需要一点一点实现，一步一步完善，这一节以微信中第一个Tab-"微信"为例，开始做基础代码的建设

微信中Tab分为四大块：微信、通讯录、发现、我

我准备在pages目录下面创建四个子目录来开发上面四大模块
* 微信-chat
* 通讯录-contact
* 发现-discovery
* 我-me

下面就以contact作为开始，来建设基础代码
## 一个Button组件
在components目录下创建Button.vue组件
```vue
<template>
  <button class="button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'zyButton',
    methods: {
      handleClick () {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  .button{
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
    font-size: 12px;
    color: green;
  }
</style>
```
## 一个contact-list页面
在pages目录下创建contact目录，然后再在contact目录下创建contact-list.vue文件，
这个页面就是微信中通讯录中联系人列表的页面，不过咱们的页面目前只有一个按钮，和微信"相去甚远"
```vue
<template>
  <zy-button @click="handleClick">点我</zy-button>
</template>

<script>
  import Button from '../../components/Button.vue'

  export default {
    components: {
      zyButton: Button
    },
    methods: {
      handleClick () {
        alert('点我了  你好')
      }
    }
  }
</script>

<style scoped>
</style>
```
这个文件中我们使用`import Button from '../../components/Button.vue'`导入了Button.vue组件，然后使用如下代码注册该组件
```js
components: {
  zyButton: Button
}
```
`zyButton`就是将来在`<template>`中使用该组件的方式（即zyButton就是标签名），驼峰转为中划线的方式

## 一个路由
现在咱们已经写好了组件，写好了页面，并且在页面中也是用了组件，接下来要完成如何才能访问到contact-list.vue页面呢？答案就是使用路由


路由的使用又分为三个步骤：
1. 引入vue-router
2. 告诉router在哪里渲染这些组件(页面)
3. 将组件(页面)映射到路由

### 引入router
首先执行下面的命令去安装vue-router
```
npm i -D vue-router
```
### 指定渲染的位置
打开App.vue文件，内容修改如下：
```vue
<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  }
</script>
<style scoped lang="scss">
  
</style>

```
### 页面映射到路由
其实就是对路由的配置，在router目录下创建index.js文件，内容如下：
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import contactList from '../pages/contact/contact-list.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/contact',
    component: contactList
  }
]

const vueRouter = new VueRouter({
  routes
})

export default vueRouter
```

解释上面这段代码：
* `import Vue ...`和`import VueRouter ...`两行代码引入vue和vue-router
* `import contactList ...` 引入刚才咱们编写的contact-list.vue页面
* `Vue.use(VueRouter)`是将vue-router插件注册到vue中，这是vue使用插件的同一方式
* `const routes ...`是定义路由配置，其中`path`指定路径（此处是 /contact），`component`指定该路径下应该渲染的页面（此处是contact-list.vue页面）
* `const vueRouter` new一个vue-router的实例，并且向options传入刚才配置的路由routes
* `export default vueRouter`是导出路由实例
### 入口文件中注入路由
打开src目录下面的index.js入口文件，然后修改代码如下：
```js
import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'

new Vue ({
  el: '#app',
  render: h => h(App),
  router
})
```

上面引入了router实例，然后在new Vue实例时向其传入router配置，从而让整个应用自此拥有了路由功能。


现在可以`npm run dev`了，看看效果吧
![](./issue-image/issue32.png)

到这里，虽然看到了预期的效果，但可能你会很迷糊，这个页面到底是怎么出来的？上面各种创建文件，各种撸代码，解释的也不够清楚。所以我再尽可能详细的屡屡思路，梳理代码的完整执行流程。
从源头开始讲起。

* 命令行输入`npm run dev`，服务器加载index.html文件
* `html-webpack-plugin`插件会把entry指定的入口文件src目录下的index.js文件注入到index.html文件中
* 此时代码执行index.js文件，这个文件new Vue实例时传入的el配置项和render配置项告诉程序传入render函数的App组件之后将被渲染在el指定的dom节点中，替换掉el指定的dom节点里面的内容
* 继续执行index.js文件，发现new Vue实例时还传入了一个router配置项，现在vue就知道了有人给它注入了路由功能，现在它已经寻找到了路由的相关配置（即router目录下的index.js文件），接下来的任务就是寻找路由对应的组件我将来在哪里进行渲染呢？
* 于是程序就去渲染src目录下的App.vue文件，然后发现该文件中有`<router-view></router-view>`这样一段代码，这个代码就是给路由预留的地方，意思是："告诉vue将来路由对应的组件你就往这里渲染。我给你留地了"
* 到此一切准备就绪，程序静静地等待浏览器来访问它
* 浏览器中输入`localhost:4000/#/contact`，程序判断出此时的URL正好与路由配置中的`{path: '/contact', component: contactList}`这项配置的path属性匹配上
* 匹配上之后就去加载component属性指定的contact-list.vue组件
* 加载contact-list.vue组件时发现，在这个组件中又引入了Button.vue组件
* 于是就又去加载Button.vue组件
* 加载完毕后，华丽的将contact-list.vue放到`<router-view></router-view>`中，至此，***Game Over***
# 调用接口获取数据（ajax请求）
后端是另一个项目，采用nodejs(express框架)+mongoDB+mysql(待定)。。。，本节不用关心后端的事情，因为这里只是简单的打通调用后端接口的路。

vue官方推荐的ajax库叫做axios，用法非常简单，只要熟悉jquery中的ajax或者原生js中的ajax，当然如果再熟悉Promise，那就没啥好说的，入门非常容易，直接上代码

## 下载安装axios
首先咱们先下载安装axios
```
npm i -D axios
```
## 引入并使用axios
打开contact-list.vue文件
```vue
...
<script>
  import Button from '../../components/Button.vue'

  import axios from 'axios'

  export default {
    components: {
      zyButton: Button
    },
    methods: {
      handleClick () {
        alert('点我了  你好')
      }
    },
    created () {
      axios.get('http://localhost:3000/findContacts').then(res => {
        console.log(res.data)
      })
    }
  }
</script>
...
```

通过`import axios from 'axios'`引入axios，然后在created()生命周期方法中写入上面的代码。启动后端接口服务器，然后刷新页面就会看到控制台输出数据了。
![](./issue-image/issue33.png)

## 当后端服务器代码，并启动
可惜的是你那看不到这个东西，而是报错了，那是因为你还没有启动后端接口服务器。

代码中的接口地址就是我写的一个demo地址，下面跟着我其启动接口服务器吧。

后端服务器代码github地址为：https://github.com/codepan/zychat-server

依次执行以下命令：
```
git clone git@github.com:codepan/zychat-server.git
cd zychat-server
npm install
node app.js
```
此时就会在本地3000端口启动服务器，再次刷新页面，就会看到上面的数据在控制台输出。

# 封装axios

不用封装直接像上面那样引入axios，然后axios.get或者axios.post等等发送异步请求也是没有任何问题的，但是作为一个过来人，我想说：当项目越来越大，接口请求越来越多的时候就会发现，不封装axios会产生非常多的冗余代码。

举一些冗余的例子：
* 发送请求前，需要对请求参数做组合或者包装
* 发送请求中，需要显示loading，表示进度
* 收到响应后
  * 关闭loading
  * 将响应数据转换为json形式
  * 若成功，显示成功的提示
  * 若失败，显示失败的提示
  * 若token或者session过期，需要提示用户，并重新登录
* 配置响应超时时间
* and so on

这一切的一切如果不做封装，那发送请求很快就会成为一场噩梦！！！

不知你是否还记得在之前咱们创建的src/common/js/http.js这个文件？它就是咱们用来封装axios的地方，说干就干，打开这个文件。

这里我要插一句：





