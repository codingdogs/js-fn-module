# js-fn-module
解决普通建站页面js代码混乱的问题，js执行代码越多会越乱。
> 像vue一样去写我们普通的前端代码，各种this的应用，便于页面功能模块的整理修改，以及相互调用，数据修改。

### 先来一段vue代码压压惊
> 下面代码可以看到this的妙用，this的调用很频繁，created会自动执行，methods之中定义的函数可以直接用this拿到data的数据，data可以直接调用插件的方法。

```javascript
export default {
    data() {
        return {
            query: this.$route.query,//调用vue-router插件的方法
            loading: true,
            data: {
                list: []
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            console.log(this.query)
        }
    },
    components: {}
}
```

### 普通js实现上面的方式去写代码
> 首先要解决this指向的问题，感兴趣的可以去看源代码，下面直接说明用法

```javascript
var page = Page({
    data: function () {
        return {
            t: +new Date(),
            num:this.add(2,4)
        }
    },
    ready: function () {
        this.time('first');
        document.getElementById('third').innerHTML = this.num;
    },
    load: function () {
        this.time('second');
    },
    methods: {
        time: function (id) {
            var t = +new Date();
            document.getElementById(id).innerHTML = t - this.t + 'ms'
        }
    }
})
```

### props
| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ---------------------------------------- |
| data        | Function  |             | 静态参数，必须return一个obj，可以直接调用插件方法                           |
| ready        | Function  |             | document.ready之后执行的方法   |
| load        | Function  |             |window.onload之后执行的方法  |
| methods        | Object  |             | 注册方法,方法之间可以互相调用 |


### this默认方法


| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ---------------------------------------- |
| extend        | Function  |             | 和jquery,angular的extend类似|

### 添加插件方法
> 再引入js-fn-module.js之后就可以注册插件。在页面调用之前引入，这样就可以愉快的使用插件了。

```javascript
APP.prototype.add = function (a, b) {
    if (a && b) {
        return a + b;
    } else {
        return 0;
    }
}
```

### 书写插件项目启动方式

> git clone 本项目之后可以启动项目，查看源代码，更去了解原理
- clone 项目
    ```shell
    $ git clone https://github.com/codingdogs/js-fn-module.git
    ```
- 下载npm依赖包
    ```shell
    $ npm i
    ```
- 创建server，打开本地调试
    ```shell
    $ npm start
    ```
