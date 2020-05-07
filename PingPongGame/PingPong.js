var canvas=document.getElementById("mycanvas");
var ctx=canvas.getContext("2d");
var rodHeight=10;
var rodWidth=80;
var distleft=(canvas.width-rodWidth) / 2;
function drawRod() {
    ctx.beginPath();
    ctx.rect(distleft, canvas.height-rodHeight, rodWidth, rodHeight);
    ctx.rect(distleft,0, rodWidth, rodHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
var leftmove=false;
var rightmove=false;
var lx=2;
var flag1=false;
window.addEventListener("keydown",function(event){
    if((!flag1)&&event.keyCode==13)
    {
        startgame();
       window.alert("Lets start the game");
       flag1=true;
    }
    if(event.keyCode==65){
        leftmove=true;
    }
    if(event.keyCode==68){
        rightmove=true;
    }
})
var x=distleft+rodWidth/2;
var y=canvas.height-rodHeight-10;
var dx=2;
var dy=-2;
var ballRadius=5;
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
drawBall();
drawRod();
var speed=30;
var score=0;
var flag=false;
var interval=null;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRod();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if((y + dy<rodHeight+ballRadius) && (distleft<x+dx) && (x+dx<distleft+rodWidth))
    {
        dy=-dy;
        score++;
    }
    if(flag&& (y + dy > canvas.height-rodHeight-ballRadius && (distleft<x+dx) && (x+dx<distleft+rodWidth)))
    {
        dy=-dy;
        score++;
    }
    else if(y + dy < ballRadius||y + dy > canvas.height-ballRadius) {
          if(score>localStorage.getItem("HighestScore")){
            alert("Hurry You Made Highest Score: "+score);
            localStorage.setItem("HighestScore",""+score);
          }
          else{
            alert("GAME OVER"+"  SCORE : "+score);
          }
            document.location.reload();
            clearInterval(interval); 
    }
    if(rightmove && distleft < canvas.width-rodWidth) {
        distleft += 5;
    }
    else if(leftmove && distleft > 0) {
        distleft -= 5;
    }
    leftmove=false;
    rightmove=false;
    x += dx;
    y += dy;
    flag=true;
}
function startgame(){

     interval=setInterval(draw, speed);
}
// startgame();

