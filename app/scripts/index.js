//创建原型
var APP = function () {
    // this.a = 1;
}

APP.prototype = { //添加原型的一些方法
    extend(a, b) {
        for (let key in b) {
            a[key] = b[key]
        }
        return a;
    },
    documentReady(fn) {
        if (document.addEventListener) { //兼容非IE
            document.addEventListener('DOMContentLoaded', function () {
                //注销事件，避免反复触发
                document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                fn(); //调用参数函数
            }, false);
        } else if (document.attachEvent) { //兼容IE
            IEContentLoaded(window, fn);
        }

        function IEContentLoaded(w, fn) {
            var d = w.document,
                done = false,
                // only fire once
                init = function () {
                    if (!done) {
                        done = true;
                        fn();
                    }
                };
            // polling for no errors
            (function () {
                try {
                    // throws errors until after ondocumentready
                    d.documentElement.doScroll('left');
                } catch (e) {
                    setTimeout(arguments.callee, 50);
                    return;
                }
                // no errors, fire

                init();
            })();
            // trying to always fire before onload
            d.onreadystatechange = function () {
                if (d.readyState == 'complete') {
                    d.onreadystatechange = null;
                    init();
                }
            };
        }
    },
    windowLoad(fn) {
        if (document.addEventListener) { //兼容非IE
            window.addEventListener('load', () => {
                fn();
            })
        } else {
            window.attachEvent('onload', () => {
                fn();
            });
        }
    }
}

//关键字段 extend

var Page = function (obj) {
    var app = new APP(); //添加APP的方法
    //检查prototype字段是否占用
    function checkKeys(check, keys) { //check为检查对象,keys为要检查的对象
        var flag = true;
        for (let key in keys) {
            if (check.hasOwnProperty(key)) {
                console.error(`data参数[${key}]为关键字段，请重新命名！！！`);
                flag = false;
            }
        }
        return flag;
    }
    if (obj.data) { //数据
        var a = obj.data.call(app);
        if (checkKeys(APP.prototype, a)) { //检测是否占用关键字段
            app.extend(app,a)
        }
    }
    if(obj.methods){//添加方法
        var m = obj.methods;
        if (checkKeys(APP.prototype, m)) { //检测是否占用关键字段
            app.extend(app,m)
        }

    }
    if (obj.ready) { //ready事件
        app.documentReady(() => {
            //执行ready事件
            obj.ready.call(app)
        })
    }
    if (obj.load) { //load事件
        app.windowLoad(() => {
            //执行load事件
            obj.load.call(app)
        })
    }
    
    return app;
}
