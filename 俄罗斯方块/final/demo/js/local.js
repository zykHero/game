/**
 * Created by dell on 2017/10/25.
 */
var Local = function(){
    var game = new Game();
    //绑定键盘事件
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            var code = e.keyCode;
            switch (code){
                case 32:{
                    //空格键-space
                    game.rotateBlock();
                    break;
                }
                case 37:{
                    //left
                    game.moveBlock('left');
                    break;
                }
                case 38:{
                    //up
                    break;
                }
                case 39:{
                    //right
                    game.moveBlock('right');
                    break;
                }
                case 40:{
                    //down
                    game.moveBlock('down');
                    break;
                }
            }
        }
    };

    var start =function(){
        var gameDiv = document.getElementById('game');
        var nextDiv = document.getElementById('next');
        var doms = {
            gameDiv : gameDiv,
            nextDiv : nextDiv
        };
        game.init(doms);
    };
    //导出API
    this.start = start;
    this.bindKeyEvent = bindKeyEvent;
};