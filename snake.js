//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var Score;

//snakehead
var snakeHeadX = blockSize * 5;
var snakeHeadY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

//food
var foodX;
var foodY;

//gameover
var gameOver = false;

window.onload = function(){

    board = document.getElementById("board");
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d");
    document.getElementById("new").style.display = "none";

    placeFood();
    document.addEventListener("keyup",changeDirection);
    //update();
    setInterval(update,1000/10);

}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeHeadX==foodX && snakeHeadY==foodY){
        snakeBody.push([foodX,foodY]);
        score();
        placeFood();
    }

    for (let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]=[snakeHeadX,snakeHeadY];
    }

    context.fillStyle="yellow";
    snakeHeadX += velocityX*blockSize;
    snakeHeadY += velocityY*blockSize;
    context.fillRect(snakeHeadX,snakeHeadY,blockSize,blockSize);
    
    for (let i=0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize , blockSize);
    }

    //gameover conditions
    if(snakeHeadX<0 || snakeHeadX>cols*blockSize || snakeHeadY<0 || snakeHeadY>rows*blockSize){
        gameOver = true;
        overMsg = "GAME OVER";
        document.getElementById("gameover").innerHTML = overMsg;
        document.getElementById("new").style.display = "block";
        document.getElementById("pb").style.display = "none";
    }
    for(i=0; i<snakeBody.length; i++){
        if(snakeHeadX==snakeBody[i][0] && snakeHeadY==snakeBody[i][1]){
            gameOver = true;
            overMsg = "GAME OVER";
            document.getElementById("gameover").innerHTML = overMsg;
            document.getElementById("new").style.display = "block";
            document.getElementById("pb").style.display = "none";
        }
    }


}

var Score = 0 ;

function score(){
        Score = Score+1;
        var outPut = Score;
        document.getElementById("score").innerHTML = "Score: "+outPut;
}

function placeFood(){
    foodX = Math.floor(Math.random()*cols)*blockSize;
    foodY = Math.floor(Math.random()*rows)*blockSize;
}

function goUp(){
    if(velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
}
function goDown(){
    if(velocityY != -1){
        velocityX=0;
        velocityY=1;
    }
}function goLeft(){
    if(velocityX != 1){
        velocityX=-1;
        velocityY=0;
    }
}function goRight(){
    if(velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}