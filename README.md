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
            page: this.extend({
                a: 1
            }, {
                b: 2
            }),
            page1: 'test'
        }
    },
    ready: function () {
        this.test();
        console.log("ready",this.page1);
        this.test1();
    },
    load: function () {
        console.log("load",this.page)
    },
    methods: {
        test: function () {
            console.log(this.page)
            console.log(this.extend({
                a: 1
            }, {
                b: 10
            }));
        },
        test1: function(){
        	this.test();
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
之后详细说明

