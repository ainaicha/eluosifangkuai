var Local = function(){
    //游戏对象
    var game;
    //时间间隔
    var INTERVAL = 200;
    var timer = null;
    //绑定键盘事件
    var bindKeyEvent = function(){
        document.onkeydown = function (e) {
            if(e.keyCode == 37){//left
                 game.left();
            }else if(e.keyCode == 38){//up
                  game.rotate();
            }else if(e.keyCode == 39){//right
                 game.right();
            }else if(e.keyCode == 40){//down
                  game.down();
            }else if(e.keyCode == 32){//spece
                 game.fall();
            }
        }
    }
    var move = function(){
        //判断是否可以下降
        if(!game.down()){
            game.fixed1();//让其固定
            game.checkclear();//消行
            var gameOver = game.checkGameOver();//游戏结束
            if(gameOver){
                stop();
            }else{
                game.performNext(generateType(),generateDir());//使用下一个方块
            }
        }
    }
    //随机生成一个方块种类
    var generateType = function(){
        return Math.ceil(Math.random() * 7) - 1;//0-6的随机数
    }
    //随机生成一个旋转次数
    var generateDir = function(){
        return Math.ceil(Math.random() * 4) - 1;//0-3的随机数
    }
    //开始
    var start = function(){
        var doms = {
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next'),
        }
        game = new Game();
        game.init(doms,generateType(),generateDir());
        game.performNext(generateType(),generateDir());
        bindKeyEvent();
        //游戏定时器  INTERVAL:时间间隔   move：方块移动
        timer = setInterval(move,INTERVAL);
    }
    //结束
    var stop = function(){
        if(timer){
           clearInterval(timer);
           timer = null;
            onkeydown = null;
        }
    }
    //导出api
    this.start = start;
}