/**
 * desc 格式化日期
 * Returns 格式化的日期
 * @param dateObj
 */
function showDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes() + 1;
    var second = dt.getSeconds();
    month = month < 10 ? ("0" + month) : month;
    day = day < 10 ? ("0" + day) : day;
    hour = hour < 10 ? ("0" + hour) : hour;
    minute = minute < 10 ? ("0" + minute) : minute;
    second = second < 10 ? ("0" + second) : second;
    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
}

/**
 * desc 根据id属性的值获取元素
 * Returns 元素
 * @param id属性值
 */
function my$(id) {
    return document.getElementById(id);
}

/**
 * desc 设置任意标签中的任意文本
 * Returns
 * @param 标签(元素),文本内容
 */
function setInnerText(element, text) {
    if (typeof element.innerText == "undefined") {
        //不支持
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

/**
 * desc 获取任意标签中的文本内容
 * Returns 文本内容
 * @param 标签元素
 */
function getInnerText(element) {
    if (typeof element.innerText == "undefined") {
        return element.textContent;
    } else {
        return element.innerText;
    }
}

/**
 * desc 获取任意一个父级元素的第一个子级元素
 * Returns 第一个子级元素
 * @param 父级元素
 */
function getFirstElementChild(element) {
    if (element.firstElementChild) {
        //支持
        return element.firstElementChild;
    } else {
        var node = element.firstChild;//第一个子节点
        while (node && node.nodeType != 1) {
            //节点存在且节点不是标签,查找下一个节点
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * desc 获取任意一个父级元素的最后一个子级元素
 * Returns 最后一个子级元素
 * @param 父级元素
 */
function getLastElementChild(element) {
    if (element.lastElementChild) {
        //支持
        return element.lastElementChild;
    } else {
        var node = element.lastChild;//最后子节点
        while (node && node.nodeType != 1) {
            //节点存在且节点不是标签,查找上一个节点
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 * desc 获取某元素前一个兄弟元素
 * Returns 前一个兄弟元素
 * @param 元素
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;//前一个节点
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 * desc 获取某元素后一个兄弟元素
 * Returns 后一个兄弟元素
 * @param 元素
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;//后一个节点
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * desc 为任意元素绑定任意的事件
 * Returns
 * @param 事件类型，处理函数，元素
 */
function addEventListener(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

/**
 * desc 为任意一个元素解绑对应的事件
 * Returns
 * @param string,string,string
 */
function removeEventListener(element, type, fnName) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fnName, false);
    } else if (element.dettachEvent) {
        element.dettachEvent("on" + type, fnName);
    } else {
        element["on" + type] = null;
    }
}

//封装匀速动画函数
//任意元素移动到一个目标位置
function animation(element, target) {
    clearInterval(element.timeId);
    var current = element.offsetLeft;
    element.timeId = setInterval(function () {
        var step = 10;
        step = (target - current) > 0 ? step : -step;
        current += step;
        if (Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, 20);
}

//变速动画函数
function shiftAnimation(element, target) {
    clearInterval(element.timeId);
    var current = element.offsetLeft;
    element.timeId = setInterval(function () {
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        console.log(step);
        current += step;
        if (Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, 20);
}

//变速动画增加任意一个属性
function animationOne(element, attr, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取属性值
        var current = parseInt(getStyle(element, attr));
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        if (Math.abs(target - current) > Math.abs(step)) {
            //正常移动
            element.style[attr] = current + "px";
        } else {
            //一步到位
            //清理定时器
            clearInterval(element.timeId);
            element.style[attr] = target + "px";
        }
    }, 20);
}

//变速动画封装增加任意多个属性和回调函数
function animationMore(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var key in json) {
            var current = parseInt(getStyle(element, key));
            var target = json[key];
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            element.style[key] = current + "px";
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 20);
}

//变速动画函数封装增加任意多个属性和回调函数及层级还有透明度
function animationAll(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            if (attr == "zIndex") {
                element.style[attr] = json[attr];
            } else if (attr == "opacity") {
                //获取当前的透明度,放大100倍
                var current = getStyle(element, attr) * 100;
                //目标透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else {
                current = parseInt(getStyle(element, attr));
                target = json[attr];
                step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 20);
}

//获取任意属性当前的属性值
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}

//终极代码--所有函数封装在一个对象中
//window.event和e的兼容代码
//scrollLeft和scrolltop,clientX和clientY,pageX和pageY
var evt={
    getEvent:function (evt) {
        return evt?evt:window.event;
    },
    getScrollLeft:function () {
        return window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;
    },
    getScollTop:function () {
        return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;
    },
    getClientX:function (evt) {
        return this.getEvent(evt).clientX;
    },
    getClientY:function (evt) {
        return this.getEvent(evt).clientY;
    },
    getPageX:function (evt) {
        return this.getEvent(evt).pageX?this.getEvent(evt).pageX:this.getScrollLeft()+this.getClientX();
    },
    getPageY:function (evt) {
        return this.getEvent(evt)?this.getEvent(evt).pageY:this.getScollTop()+this.getClientY();
    }
};