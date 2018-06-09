# 京东金融移动端页面


## 在线查看

- [官方真实地址](https://m.jr.jd.com/spe/qyy/main/index.html)
- [线上demo](https://yusifeng.github.io/jd-fin/#/)
:::tip
项目托管于GitHub Page, 国内用户可能会访问较慢, 打开后请切换至移动端.
:::

## 框架选择



前端界可谓轮子不断, 光MV*框架, 可谓数不胜数,但流行程度最高的还是[Vue](), [React](), [AngularJS]().虽然框架众多, 但所做的事情几乎都差不多, 双向绑定, 组件化, SSR等等都可以做, 选择一个框架, 应该从各个方面去考虑, 业务需求, 学习成本, 生态圈, 还是一个很重要的就是其作者对于框架的重视程度, 和其文档的详细程度, 对于我这个项目, 业务方面并没有涉及到很复杂的数据交互, 所以三个框架都可以使用, 但学习成本和作者的投入度方面, Vue明显优于另外两个框架, 当然了, React的生态圈就目前来看确实优于Vue, 但Vue的生态圈也在逐渐扩大, 我们目前所能遇到的大部分问题, 应该都可以从论坛或者网上寻找到答案.

### 框架对比(仅个人的看法)

- React

知名程度在Vue之上, 最大的生态圈, 背靠facebook, 不需要担心其版本的升级和维护, 最大的特色我认为是[React Native](),能写出跨三端的应用,但是其学习成本较高, 且官方文档对国人不太友好, 上手难度较大.

- Angular
 
Angular也是一个老牌框架, 且使用人数众多, 但最近几年逐开始走下坡趋势, Angular1.0的脏检查机制一直让人诟病, 且学习框架自身产生了许多专有名词, Angular之后的版本与1.0完全不同, 且是基于[TypeScript]()来编写,对于有C++, Jave语言基础的较为友好, 且一般用于大型项目, 对于一些小项目, 使用Angular并不是一个明智的决定.

- Vue
### 为什么选择Vue

国人开发, 文档完善 **(可以说是我目前所看到的官方文档中最详细,最小清新的一个了)** 作者对于其框计的投入程度远远大于另外两个框架, 就拿我个人来说, 闲来无事去翻翻[Vue的官方文档](https://cn.vuejs.org), 每次都有一点小小的变化, 可见其用心程度, 而且文档写的真的是很详细, 国人作者, 作为使用者我说我支持国产, 也不是不可以

## 项目难题

- 适配问题

移动端项目最大的难题就是不同尺寸的手机适配问题, 从设计师手上拿到的PSD文件, 最多一份,如何编写一份代码, 可以尽可能多的适配不同的尺寸大小.

- 组件复用性设计

一个良好的组件复用性设计有助于产品的迭代和维护, 同样的一个耦合性高的组件设计会使得产品的后期维护变得艰难, 如何尽可能的做到组件之间的解耦, 更好的做到可复用性, 这并不是一个简单的话题

- 环境搭建

虽然有官方[vue-cli]()工具, 但是对于一个并不是我们自己的搭建环境的项目, 我们对于其的把控能力始终不能做到最大, 学会自己搭建一个开发环境, 是一个低级工程师到高级工程师的必经之路.

## 项目介绍

### 项目背景

学习移动端页面的一般设计, 学习使用flex布局, 和css3高级特性, 缺少一套处理设备移动端兼容性的问题的解决方案.

### 项目收益

由于该项目并不是一个工作中的项目, 并没有带来实际的金钱收益, 但就对我个人的提高而言, 带来的收益是不可忽视的

- [flex布局]()的熟练掌握, 整个项目没有涉及一处流动布局, 80%的页面设计采用的flex布局
- [stylus]()预处理的深度使用 (变量, 混入, 1px解决方案)
- 学会了使用hotcss,px2rem来解决移动端的痛点----自适应问题
- 项目开发环境的搭建和[webpack]()的使用和如何通过网络资源来解决环境搭建问题

### 项目设计

#### 项目目录

```sh
├── base
│   └── panel.vue       # 公共panel组件(非业务)
│   └── slide.vue       # 轮播图组件
├── css             
│   ├── _var.styl       # 全局css变量
│   ├── element.styl    # 元素
│   ├── layout.styl     # 布局
│   ├── mixin.styl      # 混入
│   └── reset.styl      # 重制样式
├── js                  # 项目js文件
│   └── hotcss.js
├── public              # 公共业务组件
│   ├── footer.vue      # 公共底部
│   ├── header.vue      # 公共头部
│   └── nav-bar.vue     # 公共底部导航
├── router              
│  └── index.js         # 路由入口
├── views              
│   ├── borrow          # 借钱页面
│   ├── home            # 主页
│   ├── login           # 登录页面
│   ├── money           # 赚钱页面
│   └── vip             # 会员入口野蛮
├── App.vue    
└── main.js             # 入口文件
```

::: tip 更好的路由设计
项目中App.vue中仅仅包好一个`<router-view/>`公共的头部和底部全部并没有在App.vue
, 这样的设计是更加方面项目的维护, 和各个页面的解耦, 虽然多写了点代码, 但更加可控, 例如有些页面并不需要`<footer/>`组件, 如果把`<footer/>`写在路由视图外, 那些不需要`<footer/>`的页面就必须利用`props`来控制显示了, 这显然不是一个合理的设计, 那些可以放在路由视图之外的比如`<to-top/>`可以这样设计.
:::

#### css模块设计

- ##### 如何设计

说道模块化,一般联想到的都是javascript, 但是css也可以有模块设计, 此项目就充分体现了css模块化设计之后能给项目带来的便利.例如下面的例子

这个是主页的一个截图, 从图片上我们很容易看出每个部分页面都有一个上下的margin 我们可以把页面的背景色设置成间隙的颜色, 然后把每个小页面看成一个组件, 上下margin可以在这个组件上写, 然后每次调用这个组件, 就不需要写`margin 20px 0`这种重复的代码, 也许你会说不就多了这一句吗, 有什么麻烦的, 但是当页面频繁的出现这样的样式, 你就会明白其中带来了多大的方便, 类似于vue中的`@click`和`:xxx`的简写, 明明很简单, 但确实带来了巨大的便利, 这里同样如此.

![An image](../.vuepress/public/page1.png)

这是`panel.vue`组件, 组件内部通过`title`和`showTitle`来外部控制组件是否展示头部的标题, `<panel></panel>`的css调用了全局的混入mixin, 
```vue
<template>
    <div :class="[panelClass]">
        <h4 v-show="showTitle">- {{title}} -</h4>
        <slot/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                panelClass: 'panel'
            }
        },
        props: {
            cName: {
                type: String, 
                default: ''
            },
            title: {
                type: String, 
                default: 'Default Title'
            },
            showTitle: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../css/element.styl'
    
    .panel
        panel()
        margin 20px 0 20px
</style>
```
这是`<panel></panel>`的默认样式, 
```js
panel($bg-color = #fff, $padding = 0px, $margin = 20px 0, $height = 112px, $textPadding = 0 32px, $color = #333, $fontSize = 32px)
    background-color $bg-color
    padding $padding
    margin $margin
    >h4
        height $height
        color $color
        line-height $height
        padding $textPadding
        nowrap()
        text-align center
        font-size $fontSize
```

- ##### 如何使用

可以看到引入了 `panel.vue`组件后, 不需要多余的css就可以写好一个组件,不止这一个地方, 该项目中多处使用`panel.vue`组件

```vue
<template>
    <panel :show-title="false">
        <img src="//img12.360buyimg.com/jrpmobile/jfs/t20653/10/545368582/233132/296b2aa4/5b11063aN5a084f81.png?width=750&height=260" alt="">
    </panel>
</template>

<script>
    import panel from '../../base/panel.vue'
    export default {
        components: {
            panel,
        },
    }
</script>

<style lang="stylus" scoped>
    .panel
        padding-bottom 20px
        img
            width: 100%
</style>
```

#### 自适应布局(重点)

这里无疑是最重要的部分, 也是能一直运用在实际生产中的经验, 那么到底如何解决自适应布局(仅移动端)

在讲解之前先介绍2个工具

- [px2rem-loader]()

这个工具可以把px单位转化为rem单位,为什么要用rem单位而不用px, 因为rem是相对单位, 不是定死的, rem会根据`<html/>`标签的`font-size`来确定大小,

- [hotcss.js]()

这个一段简单的js代码, 所做的工作就是根据不同的**设备像素比**和不同的**屏幕尺寸**里动态的给`<html>`计算`font-size`大小

工具介绍完了, 可能你就已经明白能自适应设备的原因了, 就是根据`hotcss.js`来动态计算`font-size`来改变页面比例的

#### css3选择器的使用

本项目页面中没有大量的`class`类, 而是充分利用了[css3]()选择器, 因为每次看到别人写的页面都是div到底和每个标签都有class就很难受, 我们本可以不需要这样做, 这样做了, 页面非会场杂乱, 且不利于维护和迭代, 也不方便他人观看, 毕竟代码是写给别人看到的,例如看下项目中的部分代码

```vue
<template>
    <panel :title="'白条'">
        <div>

            <section>
                <p></p>
                <p>小白信用分</p>
                <p>免费领取</p>
            </section>

            <ul>
                <li v-for="item in items" :key="item.src">
                    <img :src="item.src">
                    <p>{{item.title}}</p>
                </li>
            </ul>

        </div>
    </panel>
</template>

<style lang="stylus" scoped>
    @import '~css/element.styl'
    @import '~css/layout.styl'
    @import '~css/_var.styl'
    .panel
        box-sizing border-box 
        padding 0 30px
        >div
            list(row)
            >section
                text-align center
                position relative
                width 212px
                height 260px
                margin-right 16px
                box-shadow 0 0 20px 1px rgba(101,118,155,.15)
                p
                    &:first-child
                        font-size 50px
                        height 62px
                        line-height 62px
                        color $c-9
                        margin-top 62px
                    &:nth-child(2)
                        font-size 24px
                        height 34px
                        line-height 34px
                        color $c-10
                        margin-bottom 24px
                    &:nth-child(3)
                        font-size 24px
                        height 50px
                        width 140px
                        line-height 50px
                        color #fff
                        margin 0 auto
                        border-radius 25px
                        background-color $c-10
                ...

</style>

```
我相信把这种代码会更加赏析悦目.

:::tip 我们应该尝试更多的css选择器
移动端不必担心让人闹心的IE兼容性问题, 我们可以大胆的尝试各种不同的新特性, 选择器方面的选择不仅仅是子代选择器和类选择器
:::

## 项目总结

此项目在移动端的布局方面和适配方面给了我很大的启发, 我相信我能完全的吸收此项目, 为以后的项目做更好的铺垫.

::: warning
项目的灵感是来自于[慕课网]()的[京东金融实战](https://coding.imooc.com/class/175.html)项目, 但这依然是个全新的项目.
:::

