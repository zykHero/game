/**
 * Created by dell on 2017/10/25.
 * 俄罗斯游戏核心代码
 */
var Game = function(){
    //dom元素
    var gameDiv;//游戏区域dom
    var nextDiv;//下一个显示区域的dom
    var gameCurBlock;//游戏区域当前方块的坐标
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
        [1,1,1,1,1,1,1,1,0,0]
    ];
    //缓存divs
    var gameDivs = [];//游戏区域的div
    var nextDivs = [];//下一个出现的方块的信息区域div
    //当前方块
    //当前的方块
    var cur = new Squery();
    //下一个方块
    var next = new Squery();
    /*********************************************
     * 方法名：initDiv
     * 功能：根据矩阵数据，初始化游戏区域、下一个方块显示区域的div
     * 参数：
     * contains：需要被填充的div对象
     * data：数据矩阵
     * divArr:缓存的div数组类型
     * *******************************************/
    var initDiv = function(contains,data,divArr){
        var dataLength = data.length;
        for(var i=0;i<dataLength;i++){
            var divs = [];//用于保存div组成的2维数组
            var len = data[i].length;
            for(var j=0;j<len;j++){
                //创建空白方块的div
                var newNode = document.createElement('div');
                newNode.className ='none';
                //设置每一个方块的位置
                newNode.style.top =(i*20)+'px';
                newNode.style.left = (j*20)+'px';
                //把创建的div添加到game的div下
                contains.appendChild(newNode);
                divs.push(newNode);
            }
            divArr.push(divs);
        }
    };
    /*********************************************
     * 方法名：refreshDiv
     * 功能：根据矩阵里的数据，刷新游戏区域、下一个方块显示区域的div（添加样式）
     * 参数：
     * data:矩阵的数组
     * divArr:存放游戏区域、下一个方块显示区域的div数组
     * *******************************************/
    var refreshDiv = function(data,divArr){
        var dataLen =  data.length;
        for(var i=0;i<dataLen;i++ ){
            //todo 视频中是data[0].length

            var len = data[0].length;
            for(var j=0;j<len;j++){
                var flag =data[i][j];
                switch (flag){
                    case 0:
                        divArr[i][j].className ='none';
                        break;
                    case 1:
                        divArr[i][j].className ='done';
                        break;
                    case 2:
                        divArr[i][j].className ='current';
                        break;
                    default:
                        break;
                }
            }
        }
    };


    /*********************************************
     * 方法名：getCurBlock
     * 功能：获取当前方块的坐标，返回数组格式
     * *******************************************/
    var getCurBlock = function(){
        var resArr = [];
        for(var i=0;i<gameData.length;i++){
            for(var j=0;j<gameData[i].length;j++){
                //缓存方块的坐标(矩阵是2的坐标)
                if(gameData[i][j] == 2){
                    resArr.push({
                        x:i,
                        y:j
                    })
                }
            }
        }
        return resArr;
    };


    /*********************************************
     * 方法名：checkBlock
     * 功能：检查方块移动是否正确
     * 参数
     * action：移动的方向
     * *******************************************/
    var checkBlock = function(action){
        //缓存最新的当前方块的坐标
        var blockXArr = [],
            blockYArr = [];
        for(var i=0;i<gameCurBlock.length;i++){
            //缓存方块的坐标(矩阵是2的坐标)
            blockXArr.push(gameCurBlock[i].x);
            blockYArr.push(gameCurBlock[i].y);
        }
        //在当前方块找到边界值:找到最左边的左边（Y最小）、最右边的坐标（Y最大）、最下边的坐标(X最大)
        function minAndMax(arr){
            var temp;
            var len = arr.length;
            //冒泡排序
            if(len.length <1){
                return false;
            }
            for(var i=0;i<len;i++){
                for(var j=0;j<len-i;j++){
                    if(arr[j]>arr[j+1]){
                        temp = arr[j+1];
                        arr[j+1] =arr[j];
                        arr[j] = temp;
                    }
                }
            }

            return {
                min : arr[0],
                max : arr[len-1]
            }
        }
        //获取最值
        var X = minAndMax(blockXArr),
            Y = minAndMax(blockYArr);
        var leftBlock = Y.min,
            rightBlock = Y.max,
            downBlock = X.max;
        for(var i=0;i<gameData.length;i++){
            switch (action){
                case 'left':{
                    if(gameData[downBlock][leftBlock-1] !=0){
                        return false;
                    }
                    break;
                }
                case 'right':{
                    if(gameData[downBlock][rightBlock+1] !=0){
                        return false;
                    }
                    break;
                }
                case 'down':{
                    if(gameData[downBlock+1][leftBlock] !=0 ||
                        gameData[downBlock+1][rightBlock]){
                        return false;
                    }
                    break;
                }
                default:
                    break;
            }
        }
        return true;
    };

    /*********************************************
     * 方法名：clearGame
     * 功能：清除游戏区域的方块
     * *******************************************/
    var clearGame = function(){
        var dataLen = gameData.length;
        var len = gameData[0].length;
        for(var i =0;i<dataLen;i++){
            for(var j =0;j<len;j++){
                if(gameData[i][j] ==2){
                    gameData[i][j] = 0;
                }
            }
        }
    };

    /*********************************************
     * 方法名：setCurData
     * 功能：设置游戏区域的方块
     * 参数：
     * pos：当前方块在游戏区域的坐标
     * pos.x:在游戏区域的纵向位置
     * pos.y:在游戏区域的横向位置
     * data：显示方块区域的矩阵
     * gameData：游戏区域的矩阵
     * *******************************************/
    var setCurData = function(pos,data,gameData){
        //根据设置game的位置，在game区域显示方块
        var dataLen = data.length;
        var len = data[0].length;
        for(var i =0;i<dataLen;i++){
            for(var j =0;j<len;j++){
                gameData[i+pos.x][j+pos.y] =data[i][j];
            }
        }
    };


    /*********************************************
     * 方法名：moveBlock
     * 功能：移动事件
     * *******************************************/
    var moveBlock = function(action){
        if(checkBlock(action)){
            //清除游戏区域当前方块
            clearGame();
            for(var i=0;i<gameCurBlock.length;i++){
                //根据键盘事件，改变每个方块的在游戏区域坐标
                switch (action){
                    case 'left':{
                        //向左移动一位
                        --gameCurBlock[i].y;
                        break;
                    }
                    case 'right':{
                        ++gameCurBlock[i].y;//向右移动一位
                        break;
                    }
                    case 'down':{
                        ++gameCurBlock[i].x;//向下移动一位
                        break;
                    }
                    default:
                        break;
                }
                //刷新游戏区域的矩阵
                gameData[gameCurBlock[i].x][gameCurBlock[i].y] =2;
            }
            //刷新游戏区域的dom
            refreshDiv(gameData,gameDivs);
        }
    };



    //获取游戏区域当前方块的坐标

    /*********************************************
     * 方法名：rotateBlock
     * 功能：旋转方块
     * *******************************************/
    var i =1;
    var rotateBlock = function(){
        //获取方块对象长度
        var len =0;
        for(var j in cur.curBlock){
            len++;
        }
        i++;
        if(i>len){
            i=1;
        }
        cur.data =cur.curBlock[i];
        //清空
        clearGame();
        //设置
        setCurData(cur.origin,cur.data,gameData);
        //刷新
        refreshDiv(cur.data,gameDivs);
        console.log(cur.origin)
        //获取当前方块的类型、序号
        //根据旋转的计数，获取对应方块矩阵
        //把矩阵刷新到DIV
    };




    /*********************************************
     * 方法名：init
     * 功能：模块初始化
     * 参数：
     * doms：对象类型
     *      doms.gameDiv:游戏区域dom
     *      doms.nextDiv:下一个显示区域dom
     * *******************************************/
    var init = function(doms){
        //获取游戏区域的dom
        gameDiv = doms.gameDiv;
        //获取下一个方块显示区域的dom
        nextDiv = doms.nextDiv;
        //初始化游戏区域（根据gameData矩阵创建对应div）
        initDiv(gameDiv,gameData,gameDivs);
        //初始化下一个方块显示区域（根据nextData矩阵创建对应div）
        initDiv(nextDiv,next.data,nextDivs);
        //把下一块区域的方块拷贝到游戏区域
        setCurData(cur.origin,cur.data,gameData);
        //刷新游戏区域
        refreshDiv(gameData,gameDivs);
        //刷新下一个方块显示区域
        refreshDiv(next.data,nextDivs);
        //获取game区域中的当前方块坐标
        gameCurBlock = getCurBlock();
    };
    //导出API,可以通过return导出
    this.init = init;
    this.moveBlock = moveBlock;
    this.rotateBlock = rotateBlock;

};
