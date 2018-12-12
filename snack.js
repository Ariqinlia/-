//蛇
(function () {
    var elements = [];

    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 1, color: "red"},
            {x: 2, y: 1, color: "orange"},
            {x: 1, y: 1, color: "orange"},
        ];
        this.direction = direction || "right";
    }

    Snake.prototype.init = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = this.width * this.body[i].x + "px";
            div.style.top = this.height * this.body[i].y + "px";
            div.style.backgroundColor = this.body[i].color;
            //方向
            map.appendChild(div);
            elements.push(div);
        }
    };

    //删除
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //从蛇尾开始删除
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //移动
    Snake.prototype.move = function (food,map) {
        for (var i = elements.length - 1; i > 0; i--) {
            //蛇尾改变位置
            var x = this.body[i - 1].x;
            var y = this.body[i - 1].y;
            this.body[i].x=x;
            this.body[i].y=y;
        }
        var headX = this.body[0].x*this.width ;
        var headY = this.body[0].y*this.height;
        switch (this.direction) {
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }
        //判断有没有吃到食物
        if(headX==food.x&&headY==food.y){
            //复制蛇尾并追加到数组中
            var last=this.body[elements.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //吃到删除食物并初始化
            food.init(map);
        }
    };
    window.Snack = Snake;
}());