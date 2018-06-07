# json-server

​想把自己做的一个仿照bilibili评论区放在百度云上,可涉及到linux系统安装mongodb并不会弄无法解决数据库问题也就无法解决接口问题,而涉及到的翻页和刷新保存数据必须要用到数据库o(╥﹏╥)o, 最终决定选择使用**json-server**来解决, 

## 什么是json-server

​	先来理解下什么是RESTful接口, 这里推荐[阮一峰老师的博客](http://www.ruanyifeng.com/blog/2014/05/restful_api)简单来说.不同的请求方式, 代表着对网络资源不同的处理方式.

| Methods        | Operate       | Example |
| -------------- |:-------------------------:|---------|
| get            | 获取服务器资源              | 访问百度页面|
| post           | 对服务器上的数据进行添加      | 注册QQ号码|
| patch          | 修改服务器的资源             | 修改QQ个人信息|
| delete         | 删除服务器资源              |  删除论坛评论|
所以**json-server**就是用来模拟后台接口,且接口的设计采用了RESTful方式.

## 使用

先创建一个db.json文件, 用来模拟后台数据,如下

```json
db.json
{
  "friends": [
    {
      "id": 0,
  	  "name": "david",
      "age": 14
    },
    {
      "id": 1,
  	  "name": "yusifeng",
      "age": 14
    },
    {
      "id": 2,
  	  "name": "zhaobaiwan",
      "age": 14
    }
  ]
}
```
:::tip
对象中必须包含`id`属性, 类似于一般数据库的索引
:::

### GET获取数据

```js
let axios = require('axios')

axios({
  method: 'get',
  url: '127.0.0.1:3000',
  params: {
  	                                //空参则检索所有字段
  }
}).then(res => {
	console.log(res)                //输出db.json全部类容
})

//params参数
{
	q:'d',				        //全局查找, 也就是查找每个对象中是否有关键字d
	_limit: 3, 			        //类似于数据库中查找个数, 每次获取相同个数的数据就可以做类似翻页
	_page: 2,			        //_page的值为0或者1都表示第一页
	_sort: 'age',		        //按照age的顺序来排列
	_order: 'age',
	_start: 3, 			        //从第3个开始查找一般配合_end 或者 _limit
	_end: 5, 			        //配合_start 类似于Array.slice(3, 5) 即包左不包右
	`${key}_gte`: 5,	        //key属性大于5的全部检索出来
	`${key}_lte`: 10,	        //${key}属性小于10的全部检索出来
	`${key}_ne`: 4 ,	        //${key}的值不等于4的全部检索
	_embed: ${key},		        //给所在对象添加一个字键且值为空数组
	_expand: 
}
```
:::tip
根据`param`的参数的不同配置, 可以获取不同的返回数据,
:::

### POST添加数据

```js
axios({
  method: 'post',
  url: 'http://localhost:3000/comments',
  data: {	                         //id会自动递增添加类似于mySQL的key
    name: 'invoker',
    age: 312
  },
  headers: {
    'Content-Type': 'application/json'
  }

}).then(res => {
  console.log(res.data) 	        //添加的数据,添加完成后db.json数据会变动
}).catch(err => {
  console.log(err)
})
```

### PATCH修改数据

```js
axios({
  method: 'patch',
  url: 'http://localhost:3000/friends/2',

  data: {
    "age": 2333,
  },
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => {
  console.log(res.data)			 //返回修改后的数据
}).catch(err => {
  console.log(err)
})
```
```json
db.json中的数据变化

{                                                     {
  ...													...		
  {														{
     "id": 2,											   "id": 2,
  	 "name": "zhaobaiwan",     =>						   "name": "zhaobaiwan",
     "age": 14											   "age": 2333
  },													},
  ...													...
}													  }
```

### DELETE删除数据

```js
axios({
  method: 'delete',
  url: 'http://localhost:3000/friends/2',
}).then(res => {
  console.log(res.data)			
}).catch(err => {
  console.log(err)
})

//直接将id为2的对象删除
```

## 简单的环境部署
想要真实的运用于生产, 需要单独编写一个nodejs脚本来运行 

```js
datebase.js				//命名不要带有- 我用pm2 上线的时候出现了问题, 去掉-就好了

let jsServer = require('json-server')
let server = jsServer.create()
let router = jsServer.router('db.json')
let middlewares = jsServer.defaults()

server.use(middlewares)
server.use(router)

server.listen(27017, () => {
  console.log( 'running at port 27017')
})
```
:::danger
命名不要带有 `-` 我用pm2 上线的时候出现了问题, 去掉`-`就好了.
:::
```bash
$ pm2 start datebase.js	
```
**更多关于json-server, 请[访问官网](https://www.npmjs.com/package/json-server)**







