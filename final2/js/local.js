var Local = function(){
    //游戏对象
    var game;
    //时间间隔
    var INTERVAL = 200;
    var timer = null;
    //计时次数
    var timeCount = 0;
    //时间
    var time = 0;
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
        timerFnc();
        //判断是否可以下降
        if(!game.down()){
            game.fixed1();//让其固定
           var line = game.checkclear();//消行
            if(line){
                game.setScore(line);
            }
            var gameOver = game.checkGameOver();//游戏结束
            if(gameOver){
                stop();
                game.gameOver(false);
            }else{
                game.performNext(generateType(),generateDir());//使用下一个方块
            }
        }
    }
    //随机生成干扰行 lineNum:干扰行数
    var gennerateBottomLine = function(lineNum){
        var lines = [];
        for(var i = 0; i < lineNum;i++){
            var line = [];
            for(var j = 0; j < 10; j++){
                line.push(Math.ceil(Math.random() * 2 -1));
            }
            lines.push(line);
        }
        return lines;
    }
    //计时函数
    var timerFnc = function(){
        timeCount++;
        if(timeCount == 5){
            timeCount = 0;
            time++;
            game.setTimer(time);
            if(time % 10 == 0){
                game.addTailLines(gennerateBottomLine(1));
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
            timeDiv:document.getElementById('time'),
            scoreDiv:document.getElementById('score'),
            gameOver:document.getElementById('gameOver'),
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