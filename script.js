const cvs=document.getElementById("canvas");
const ctx=cvs.getContext("2d");
// taking input of player

let newplayer=confirm("new player press ok");
if (newplayer ==false) 
    {
    var playername1 = prompt("Please enter your name :player 1");
    
    let wins= localStorage.getItem("playername1");
    alert("your wins"+wins);
}
    
  
  else 
  {
    var playername1 = prompt("Please enter your name:player 1");
     
    localStorage.setItem(playername1,0);
}


let newplayer2=confirm("new player press ok");
if (newplayer2 ==false) 
    {
    var playername2 = prompt("Please enter your name :player 2 ");
    
    let wins= localStorage.getItem("playername2");
    alert("your wins"+wins);
}
    
  
  else 
  {
    var playername2 = prompt("Please enter your name:player 2");
     
    localStorage.setItem(playername2,0);
}


alert("press enter to start the game ");


const user={
    x:0,
    y:cvs.height/2-100/2,
    width:10,
    height:100,
    color:"blue",
    score:0,
    n:playername1

}
const com={
    x:cvs.width-10,
    y:cvs.height/2-100/2,
    width:10,
    height:100,
    color:"red",
    score:0,
    n:playername2
   
}
const ball={
    x:cvs.width/2,
    y:cvs.height/2,
    radius:10,
    speed:10,
    velocityX:5,
    velocityY:5,
    color:"white"
   

}
const net={
    x:cvs.width/2-1,
    y:0,
    width:2,
    height:10,
    color:"white"
}
function createrect(x,y,w,h,color)
{
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);

}
function createcircle(x,y,r,color)
{
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fill(); 
}
function createnet()
{
    for(let i=0;i<=cvs.height;i+=15)
        {
            createrect(net.x,net.y+i,net.width,net.height,net.color);
        }

}


function render()
{
    createrect(0,0,cvs.width,cvs.clientHeight,"black");
    createnet();
    drawText(user.score,cvs.width/4,cvs.height/5,"white");
    drawText(com.score,3*cvs.width/4,cvs.height/5,"white");
    createrect(user.x,user.y,user.width,user.height,user.color);
    createrect(com.x,com.y,com.width,com.height,com.color);
    createcircle(ball.x,ball.y,ball.radius,ball.color);
   

}
function colllision(b,p)
{
    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;
    
    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;

    return b.right>p.left && b.bottom>p.top && b.left<p.right && b.top<p.bottom;
}

function movepaddle(e)
{
    let rect=cvs.getBoundingClientRect();
    if(e.key==="w")
        {
            if(user.y==0)
                return 
            else
            user.y-=25;
        }
    
    else if(e.key==="s")
        {
            if(user.y+user.height==700)
                return
            else
            user.y+=25;
        }
        
    else if(e.key==="i")
        {
            if(com.y==0)
                return 
            else
            com.y-=25;
        }
        
    else if(e.key==="k")
        {
            if(com.y+com.height==700)
                return
            else
            com.y+=25;
        }
        
        
    

}
function resetBall()
{

    ball.x=cvs.width/2;
    ball.y=cvs.height/2;
    ball.speed=10;
    ball.velocityX=-ball.velocityX;
}
function update()
{   
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    if(ball.y+ball.radius>cvs.height || ball.y-ball.radius<0)
        {
            ball.velocityY=-ball.velocityY
        }
        let player=(ball.x<cvs.width/2)?user:com;
        if(colllision(ball,player))
            {
                let collidpoint=ball.y-(player.y+player.height/2);
                collidpoint=collidpoint/(player.height/2);
                let angleRAd=collidpoint*Math.PI/4;
                let direction=(ball.x<cvs.width/2)?1:-1;

                ball.velocityX=direction*ball.speed*Math.cos(angleRAd);
                ball.velocityY=direction*ball.speed*Math.sin(angleRAd);
                ball.speed+=1;


            }
   if(ball.x-ball.radius<0)
    {
        com.score++;
    //   localStorage.setItem(com.n,parseInt(localStorage.getItem(com.n))+1);
    //   alert(localStorage.getItem(com.n));
       score=true;
        resetBall();

    }
    else if(ball.x+ball.radius>cvs.width)
        {
            user.score++;
            
            // localStorage.setItem(user.n,parseInt(localStorage.getItem(user.n))+1);
            // alert(localStorage.getItem(user.n));
              
           score=true;

            
            resetBall();
        }
}

function drawText(text,x,y,color)
{
    ctx.fillStyle=color;
    ctx.font="50px fantasty";
    ctx.fillText(text,x,y);


}
var score=false;
function game()
{   update();
    render();
//     document.addEventListener("keypress",function(e)
// {
//     if(e.key==="q")
        
// });
if(score==true)
    {
    alert("press enter to continue");
    score=false;
    }
    if(user.score=="5" || com.score=="5")
        {  
           let player=(user.score==5)?user.n:com.n;
           alert("The Winner is " +player.toUpperCase());
         clearInterval(interval);
       
        }
    
}


document.addEventListener("keypress",movepaddle);
const framePerSecond=50;

var interval=setInterval(game,1000/framePerSecond);




