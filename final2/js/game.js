var Game = function(){
    //dom元素
    var gameDiv;
    var nextDiv;
    //计时
    var timeDiv;
    //分数div
    var scoreDiv;
    //分数
    var score = 0;
    //游戏结束
    var resultOver;
    //游戏矩阵
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    //当前方块
    var cur;
    //下一个方块
    var next;
    //divs
    var gameDivs = [];
    var nextDivs = [];
    //初始化div container:需要添加的dom元素，data:二维数组，divs:添加了dom元素的二维数组
    var initDiv = function(container,data,divs){
        for(var i = 0; i < data.length; i++){
            var div = [];
            for(var j = 0; j < data[0].length; j++){
                var box = document.createElement('div');
                box.className ='none';
                box.style.top = (i * 20) + 'px';
                box.style.left = (j * 20) + 'px';
                container.appendChild(box);
                div.push(box);
            }
            divs.push(div);
        }
    }
    //刷新div
    var refrechDiv = function(data,divs){
        for(var i = 0; i < data.length; i++){
            for(var j = 0; j< data[0].length;j++){
                if (data[i][j] == 0){
                    divs[i][j].className = 'none';
                }else if (data[i][j] == 1){
                    divs[i][j].className = 'block';
                }else if (data[i][j] == 2){
                    divs[i][j].className = 'down';
                }
            }
        }
    }
    //检测点是否合法pos:原点（方块的位置），x,y二维数组的索引
    var check = function(pos,x,y){
        if(pos.x + x < 0){//上边界
            return false;
        }else if(pos.x + x >= gameData.length){//下边界
            return false;
        }else if(pos.y+ y < 0){//左边界
            return false;
        }else if(pos.y+ y >= gameData[0].length){//右边界
            return false;
        }else if(gameData[pos.x + x][pos.y + y] == 1){//已有方块
            return false;
        }else{
            return true;
        }
    }
    //检测数据是否合法
    var isValid = function (pos,data) {
        for(var i = 0 ; i < data.length; i++){
            for(var j = 0; j < data[0].length; j++){
                if(data[i][j] != 0){
                    if(!check(pos,i,j)){
                        return false
                    }
                }
            }
        }
        return true;
    }
    //设置数据
    var setData = function(){
        for(var i = 0; i<cur.data.length; i++){
            for(var j = 0; j < cur.data[0].length; j++){
                if(check(cur.origin,i,j)){
                   gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    }
    //清除数据
    var clearData = function(){
        for(var i = 0; i<cur.data.length; i++){
            for(var j = 0; j < cur.data[0].length; j++){
                if(check(cur.origin,i,j)){
                   gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    }
    //下移
    var down = function(){
        if(cur.canDown(isValid)){
            clearData();
            cur.down();
            setData();
            refrechDiv(gameData,gameDivs);
            return true;
        }else{
            return false;
        }
    }
    //左移
    var left = function(){
        if(cur.canLeft(isValid)){
            clearData();
            cur.left();
            setData();
            refrechDiv(gameData,gameDivs);
        }
    }
    //右移
    var right = function(){
        if(cur.canRight(isValid)){
            clearData();
            cur.right();
            setData();
            refrechDiv(gameData,gameDivs);
        }
    }
    //旋转
    var rotate = function(){
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate();
            setData();
            refrechDiv(gameData,gameDivs);
        }
    }
    //方块移动到底部  让其固定
    var fixed1 = function(){
        for(var i = 0; i < cur.data.length;i++){
            for(var j = 0; j < cur.data[0].length;j++){
                //判断点是否合法
                if(check(cur.origin,i,j)){
                    //判断掉落方块是否已到达底部，如果到达底部让其变成灰色
                    if(gameData[cur.origin.x + i][cur.origin.y +j] == 2){
                        gameData[cur.origin.x + i][cur.origin.y +j] = 1;
                    }
                }
            }
        }
        refrechDiv(gameData,gameDivs);
    };
    //消行
    var checkclear = function () {
        var line = 0;//消的行数
         for(var i = gameData.length-1; i >=0;i--){
             var clear = true;
             for(var j = 0; j<gameData[0].length;j++){
                 if(gameData[i][j] !=1){
                     clear = false;
                 }
             }
             if(clear){
                 line = line + 1;
                 for(var m=i;m>0;m--){
                    for(var n=0; n<gameData[0].length;n++){
                        gameData[m][n] = gameData[m-1][n];
                    }
                 }
                 for(var n=0; n<gameData[0].length;n++){
                     gameData[0][n] = 0;
                 }
                 i++;
             }
         }
         return line;
    }
    //设置时间
    var setTimer = function(time){
          timeDiv.innerText = time;
    }
    //设置分数
    var setScore = function(line){
       var s = 0;
        switch (line){
            case 1:
                s = 10;
                break;
            case 2:
                s = 20;
                break;
            case 3:
                s = 50;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    }
    //判断游戏是否结束
    var checkGameOver = function(){
        var gameOver = false;
        for(var i = 0; i < gameData[0].length;i++){
            if(gameData[1][i] == 1){
                gameOver = true;
            }
        }
        return gameOver;
    }
    //游戏结束
    var gameOver = function (win) {
        if(win){
            resultOver.innerText = '你赢了！'
        }else{
            resultOver.innerText = '你输了！'
        }
    }
    //底部增加行
    var addTailLines = function(lines){
        //让gameData数据向上移动一行
        for(var i = 0; i < gameData.length - lines.length;i++){
            gameData[i] = gameData[i + lines.length];
        }
        //给复制gameData最底层数据并在底部多添加一行
        for(var i = 0; i < lines.length; i++){
            gameData[gameData.length - lines.length + i] = lines[i];
        }
        //恢复原点
        cur.origin.x = cur.origin.x - lines.length;
        if(cur.origin.x < 0){
            cur.origin.x = 0;
        }
        refrechDiv(gameData,gameDivs);
    }

    //使用下一个方块
    var performNext = function(type,dir){
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type,dir);
        refrechDiv(gameData,gameDivs);
        refrechDiv(next.data,nextDivs);
    }
    //初始化
    var init = function(doms,type,dir){
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultOver = doms.gameOver;
        next = SquareFactory.prototype.make(type,dir);
        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);
        refrechDiv(next.data,nextDivs);
    }
    //导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function(){while(down());};
    this.fixed1 = fixed1;
    this.performNext = performNext;
    this.checkclear = checkclear;
    this.checkGameOver = checkGameOver;
    this.setTimer = setTimer;
    this.setScore = setScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
}