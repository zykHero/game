/**
 * Created by dell on 2017/10/23.
 */

var nextData = [
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [2,2,2,2]
];
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
    [0,0,0,0,0,0,1,0,0,0],
    [0,0,0,2,2,2,1,0,0,0],
    [0,2,2,2,1,1,1,0,0,0],
    [0,1,1,1,1,1,1,0,0,0]
];
//保存div
var nextDivs = [];
var gameDivs = [];
//创建gameDivs
var initGame = function(){
    var gameDataLength = gameData.length;
    for(var i=0;i<gameDataLength;i++){
        var gameDiv = [];//用于保存div组成的2维数组
        var len = gameData[i].length;
        for(var j=0;j<len;j++){
            //创建空白方块的div
            var newNode = document.createElement('div');
            newNode.className ='none';
            //设置每一个方块的位置
            newNode.style.top =(i*20)+'px';
            newNode.style.left = (j*20)+'px';
            //把创建的div添加到game的div下
            document.getElementById('game').appendChild(newNode);
            gameDiv.push(newNode);
        }
        gameDivs.push(gameDiv);
    }
};
//创建nextDivs
var initNext = function(){
    var nextDataLength = nextData.length;
    for(var i=0;i<nextDataLength;i++){
        var nextDiv = [];//用于保存div组成的2维数组
        var len = nextData[i].length;
        for(var j=0;j<len;j++){
            //创建空白方块的div
            var newNode = document.createElement('div');
            newNode.className ='none';
            //设置每一个方块的位置
            newNode.style.top =(i*20)+'px';
            newNode.style.left = (j*20)+'px';
            //把创建的div添加到next的div下
            document.getElementById('next').appendChild(newNode);
            nextDiv.push(newNode);
        }
        nextDivs.push(nextDiv);
    }
};

/*根据gameData里的数据改变gameDivs里的数据
* 0-none,1-done(已经落下),2-current（正在操作）
* */
var refreshGame = function(){
    var gameDataLen =  gameData.length;
    for(var i=0;i<gameDataLen;i++ ){
        var len = gameData[i].length;
        for(var j=0;j<len;j++){
            var stat =gameData[i][j];
            switch (stat){
                case 0:
                    gameDivs[i][j].className ='none';
                    break;
                case 1:
                    gameDivs[i][j].className ='done';
                    break;
                case 2:
                    gameDivs[i][j].className ='current';
                    break;
                default:
                    break;
            }
        }
    }
};
/*根据nextData里的数据改变nextDivs里的数据
 * 0-none,1-done(已经落下),2-current（正在操作）
 * */
var refreshNext = function(){
    var nextDataLen =  nextData.length;
    for(var i=0;i<nextDataLen;i++ ){
        var len = nextData[i].length;
        for(var j=0;j<len;j++){
            var stat =nextData[i][j];
            switch (stat){
                case 0:
                    nextDivs[i][j].className ='none';
                    break;
                case 1:
                    nextDivs[i][j].className ='done';
                    break;
                case 2:
                    nextDivs[i][j].className ='current';
                    break;
                default:
                    break;
            }
        }
    }
};

initGame();
initNext();
refreshGame();
refreshNext()