"use strict";

//创建原型
var APP = function APP() {
    this.a = 1;
};

APP.prototype = { //添加原型的一些方法
    aa: function aa(d) {
        console.log(d);
    },
    extend: function extend(a, b) {
        for (var key in b) {
            a[key] = b[key];
        }
        return a;
    },
    documentReady: function documentReady(fn) {
        if (document.addEventListener) {
            //兼容非IE
            document.addEventListener("DOMContentLoaded", function () {
                //注销事件，避免反复触发
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                fn(); //调用参数函数
            }, false);
        } else if (document.attachEvent) {
            //兼容IE
            IEContentLoaded(window, fn);
        }

        function IEContentLoaded(w, fn) {
            var d = w.document,
                done = false,

            // only fire once
            init = function init() {
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
    windowLoad: function windowLoad(fn) {
        if (document.addEventListener) {
            //兼容非IE
            window.addEventListener('load', function () {
                fn();
            });
        } else {
            window.attachEvent('onload', function () {
                fn();
            });
        }
    }
};

//关键字段 extend

var Page = function Page(obj) {
    var app = new APP(); //添加APP的方法
    //检查prototype字段是否占用
    function checkKeys(check, keys) {
        //check为检查对象,keys为要检查的对象
        var flag = true;
        for (var key in keys) {
            if (check.hasOwnProperty(key)) {
                console.error("data\u53C2\u6570[" + key + "]\u4E3A\u5173\u952E\u5B57\u6BB5\uFF0C\u8BF7\u91CD\u65B0\u547D\u540D\uFF01\uFF01\uFF01");
                flag = false;
            }
        }
        return flag;
    }
    if (obj.data) {
        //数据
        var a = obj.data.call(app);
        if (checkKeys(APP.prototype, a)) {
            //检测是否占用关键字段
            app.extend(app, a);
        }
    }
    if (obj.ready) {
        //ready事件
        app.documentReady(function () {
            //执行ready事件
            obj.ready.call(app);
        });
    }
    if (obj.load) {
        //load事件
        app.windowLoad(function () {
            //执行load事件
            obj.load.call(app);
        });
    }
    return app;
};
//# sourceMappingURL=index.js.map
