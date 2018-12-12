//游戏
(function () {
    var that=null;
    function Game(map) {
        this.food=new Food();
        this.snack=new Snack();
        this.map=map;
        that=this;
    }
    //初始化,在地图上显示食物和蛇
    Game.prototype.init=function (map) {
        this.food.init(map);
        this.snack.init(map);
        this.runSnack();
        this.bindKey();
    }
    //移动
    Game.prototype.runSnack=function (){
        var timeId=setInterval(function () {
            this.snack.move(this.food,this.map);
            this.snack.init(this.map);
            var headX=this.snack.body[0].x;
            var headY=this.snack.body[0].y;
            var maxX=this.map.offsetWidth/this.food.width;
            var maxY=this.map.offsetHeight/this.food.height;
            if(headX<0||headX>=maxX||headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束!");
            }
            var headX=this.snack.body[0].x;
            var headY=this.snack.body[0].y;
            for(var i=1;i<this.snack.body.length;i++){
                var objX=this.snack.body[i].x;
                var objY=this.snack.body[i].y;
                if(headX==objX&&headY==objY){
                    clearInterval(timeId);
                    alert("游戏结束!");
                }
            }
        }.bind(that),150);
        //判断用户操作
        Game.prototype.bindKey=function(){
            //keyCode,左上右下37,38,39,40
            addEventListener(document,"keydown",function (e) {
                //现在的this是document
                switch (e.keyCode) {
                    case 37:this.snack.direction="left";break;
                    case 38:this.snack.direction="top";break;
                    case 39:this.snack.direction="right";break;
                    case 40:this.snack.direction="bottom";break;
                }
            }.bind(that))
        };
    };
    window.Game=Game;
}());