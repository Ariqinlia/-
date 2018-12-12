//食物
(function () {
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function Food(width, height, color, x, y) {
        this.width = width || 20;
        this.height = height || 20;
        this.x = x || 0;
        this.y = y || 0;
        this.color = color || "green";
    }

    var elements = [];
    //初始化食物,显示效果和位置
    Food.prototype.init = function (map) {
        remove();
        var div = document.createElement("div");//创建小方块
        div.style.position = "absolute";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        this.x = getRandom(0, map.offsetWidth / this.width) * this.width;
        this.y = getRandom(0, map.offsetHeight / this.height) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        map.appendChild(div);
        //追加到数组中
        elements.push(div);
    }

    //删除食物
    function remove() {
        for (var i = 0; i < elements.length; i++) {
            //从地图上删除
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的小方块
            elements.splice(i, 1);
        }
    }

    window.Food = Food;
}());