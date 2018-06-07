# vue-router

学习一门技术, 最直接的方式就是看该技术项目的官方文档了, 因为没有比官方文档说的还要详细的了, 说来惭愧, [vue.js](https://cn.vuejs.org/)的文档过了十几遍, 但是[vue-router](https://router.vuejs.org/zh/)的文档真的除了在实战项目中看别人用过外, 自己就没去看过了, 上次抽了一天时间看了看官网文档, 感觉像是打开了新世界的大门, 因为感觉学问确实很多, 知识点也很杂乱, 所以这篇文章就是记录下官方文档中的一些细节和总结, 方便日后二次学习.

## 普通路由

* ### 不传参数

```vue
<router-link to="/user"> DEMO1 <router-link/>
<router-view/>
```

```js
new Router({
    routes: [
        {
            path: '/user',
            component: User
        }
    ]
})
```
:::tip
这是最简单的一种路由跳转了,当路由设定好了之后, 会根据component对应的组件来渲染页面, 简单归简单, 但这并没有传递参数
:::

### 传递query

这种传参可以类比于`get`方法, 参数的传递可以通过url观测到

```vue
<router-link :to="{path:'/user',query:{age:13}}"> DEMO2 <router-link/>
<router-view/>
```

```js
new Router({
    routes: [
        {
            path: '/user',
            components: User
        }
    ]
})
```

```vue
<template>
    <div>
        {{$route.query.age}} //渲染为13
    </div>
</template>
```

:::tip
点击跳转后的url `http://localhost:8080/#/user?age=13`
且可以通过`$route.query.age`获取到值`13`
:::

### 传递params

类比于`post`方法

```vue
<router-link :to="{name:'userr',params:{age:13}, query:{gender: 'male'}}"> DEMO2 <router-link/>
<router-view/>
```

```js
new Router({
    routes: [
        {
            path: '/user',
            name: 'user'
            components: User
        }
    ]
})
```

```vue
<template>
    <div>
        {{$route.params.age}} //渲染为13
        {{$route.query.gender}} //male
    </div>
</template>
```

:::tip
跟第二个又有点不同是path变成了name, query变成了params,路由配置中多了一个name属性, 这个时候当点击了之后url为`http://localhost:8080/#/user?gender=male`, 这种方式可以说涵盖了所有可能传参的方式, 推荐使用`name`,而不是使用`path`,url的参数写在`query`对象中, 其他参数写在`params`中.
:::



### 动态路由跳转

```vue
<router-link :to="{path:'user/3154', query:{gender: 'male'}}"> DEMO2 <router-link/>
<router-view/>
```

```js
new Router({
    routes: [
        {
            path: '/user/:id',
            name: 'userr'
            components: User
        }
    ]
})
```

```vue
<template>
    <div>
        {{$route.params.id}} //3154
        {{$route.query.gender}} //male
    </div>
</template>
```

至此, 总结为以下

路由方式 | 能否传query | 能否传params | params参数在url中是否可见 
:- | :-: | :-: | :-:
{path, query} | √| × | 
{name, params, query} | √ | √ | 不可见
{path(动态传参), query} | √ | √ | 可见

## 编程式路由
编程式路由的左右就是不必使用`<router-link>`来跳转路由,
这其实跟history的API有那么一点类似, 来简单总结下

### API

```js
router.push(location, onComplete?, onAbort?)
```

这是最简单的跳转动作, 跳转过后会进入历史记录, 当你跳转完成后, 点击后退会回退到上一层, 其中的参`location`数类似于`:to="location"`, 也支持三种方式, `onComplete`即为成功时候的回调, `onAbort`表示为终止时候的回调, 这里并不是onError也就表示并不代表了失败, 可能是**在导航到此路由前, 跳转到其他路由**

```js
router.replace(location, onComplete?, onAbort?)
```

类似于push, 但是并不会存储在历史记录的队列中, 顾名思义就是替换的意思

```js
router.go(n)
```

如果你熟悉history的API的话, 你一定知道这个方法, 这个方法接受一个整数, 1表示**前进**, -1表示**后退**, 这与浏览器的前进后退完全一致

## 钩子函数(很重要)
第一次面试的时候就被这个问题, 当时给拦住了, 因为当时根本不知道还有路由钩子, 这也从测方面反应了读文档的重要性, 真的想学好Vue, 请多读官方文档, 你看个10遍都不过分, 同样的, 对于vue的生态圈中比较重要的几个, `vue-router`就算一个, 也需要看文档, 光从一些视频或者是什么论坛上很难寻找到有用的知识, 我看了ustbhuangyi老师的那门音乐APP课, 虽然用到了路由, 但是真的很浅很浅, 仅仅是一个动态路由而已, 废话这门多, 我来总结下我仔细看完路由钩子这篇官方文档的总结吧, 首先我们要知道哪些地方会有路由钩子函数
- ### 组件中的路由钩子函数

页面跳转的过程也就是组件加载的过程和组件销毁的过程, 每个组件都有同一套钩子函数
```js
const User = {
    props:[],
    data() {
        return {
            msg: 'hello vue-router'
        }
    },
    //路由钩子
    beforRouterEnter(to, from, next) {
        console.log(this)       //undefined
        //next(vm => {
            console.log(vm)     //
        })
    },
    beforRouterUpdata(to, from, next) {
        next()
    },
    beforRouterLeave(to, from, next) {
        next()
    }
}
```

:::tip
需要注意在`beforRouterEnter`的这个钩子中, 我们并不能访问到this, 举个简单的例子, 你data函数返回的数据中有msg, 但是在next()的回调中可以访问到this, 这是一个异步的过程, 我们先不去说这些钩子是在什么时机触发, 在我们介绍完整个钩子的时候我们利用一个例子来说明问题, 官网有关于路由钩子调用顺序的回答, 但并没有例子, 对于没有赖心的人来说, 可能就一扫而过了.
:::
    
- ### router实例中的钩子函数

这个地方配置的路由钩子其实是全局的一种钩子, 也就是说只要你路由跳转了, 这里的钩子函数就会被调用, 官方的说法叫守卫,我感觉不太好, 如果你理解vue生命周期的钩子函数, 这两个意思其实差不多.

 Vue实例由产生到销毁这个过程有生命周期,而路由跳转也是一个过程, 自然而然也会有生命周期, 同样的对于过度动画, 也有生命周期.
 
 我第一次接触到生命周期的时候是完全蒙蔽的, 啥玩意啊, 有啥用, 但是当稍微深入了那么点后, 你理解了, 你就会觉得这是件多么自然的事情, 又扯远了(⊙o⊙)…

```js
router.beforeEach((to, from, next) => {
    console.log('router.beforeEach')
    console.log(to.matched)
    next()
})

router.beforeResolve((to, from, next) => {
    console.log('router.beforeResolve')
    next()
})

router.afterEach((to, from) => {
    console.log('router.afterEach')
})
```

- ### router对应关系中的钩子函数

```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
                // ...
            }
        }
    ]
})
```

:::tip
官方文档中把叫**路由独享的守卫**, 还是很想吐槽这个名字
:::


## 钩子的执行过程

好了我们说完了所有可能会产生钩子函数的地方, 现在我们来举个栗子, 从栗子中我们可以知道路由跳转的过程中, 这些钩子函数到底是怎么执行的, 首先我们声明三个组件`User`, `David`, `Yusifeng`

```vue
<template>
<div class="user">
    <div><router-link :to="{name: 'david', params: {color: 'pink'}}"> to user/david</router-link></div>
    <div><router-link :to="{name: 'yusifeng', params: {color: 'blue'}}"> to user/yusifeng</router-link></div>
    <div><router-view/></div>
</div>
</template>
<script>

export default {
    props: {
        age: {
        type: Number,
        default: null
        }
    },
    beforeRouteUpdate(to, from , next) {
        console.log('user -> beforeRouteUpdate')
        next()
    },
    beforeRouteEnter(to, from , next) {
        console.log('user -> beforeRouteEnter')

        next(vm => {
        console.log('user ->next -> beforeRouteEnter')
        })
    },
    // //做一些页面离开后的挽留方法, 不过感觉挺恶心的...
    beforeRouteLeave(to, from , next) {

        console.log('user -> beforeRouterLeave')
        next()
    }
}
</script>
```