
/*****************************浏览器宽度、高度*********************************/
const clientWidth=document.documentElement.clientWidth;
const clientHeight=document.documentElement.clientHeight;
console.log("clientWidth:",clientWidth);
/****************************************************************************/

var wrapDiv=document.getElementById("wrap");  //获得小球的活动区


/**************************工具函数*****************************/
function randomNum(n,m){
  return   Math.floor( Math.random()*(m-n)+n);
}

function randomColor(){
  let $red=randomNum(0,255);
  let $green=randomNum(0,255);
  let $blue=randomNum(0,255);
  return 'rgb('+$red+','+$green+','+$blue+')';
}
/***************************创建小球************************************/
let balls=[];//存储所有小球

function createBalls(){

  for(let i=0;i<20;i++){
    let p=document.createElement("p");
    
    p.innerText=i;
    
    p.x=randomNum(0,clientWidth-32); //生成随机位置x,y坐标
    p.y=randomNum(0,clientHeight-32);
  
    
    p.style.left=p.x+"px";//随机创建小球位置
    p.style.top=p.y+"px";

    p.directionX=Math.random()-0.5>0?true:false;//随机创建小球运动方向
    p.directionY=Math.random()-0.5>0?true:false;
    console.log("directionX:",p.directionX,"directionY:",p.directionY);
    
    p.speed = randomNum(2,5);	//随机小球的移动速度
    console.log(p.speed);
    
    p.style.background=randomColor();//随机创建小球颜色

    balls.push(p);
    
    wrapDiv.appendChild(p);
  }
  

}

createBalls();
/********************************小球运动**********************************/

function moveBall(ballObj){
  setInterval(function(){
    ballObj.style.top=ballObj.y+"px";
    ballObj.style.left=ballObj.x+"px";
    //判断小球运动方向
    if(ballObj.directionY){ //小球向下移动
      ballObj.y+=ballObj.speed;
      if(ballObj.y>=clientHeight-32){//到底了
        ballObj.y=clientHeight-32;
        ballObj.directionY=false;//换方向
      }
    }else{//小球向上移动
      ballObj.y-=ballObj.speed;
      if(ballObj.y<=0){//到顶了
        ballObj.y=0;
        ballObj.directionY=true;//换方向
      }
    }
    if(ballObj.directionX){//小球向右移动
      ballObj.x+=ballObj.speed;
      if(ballObj.x>=clientWidth-32){//最右
        ballObj.x=clientWidth-32;
        ballObj.directionX=false;//换方向
      }
    }else{//小球向左滚动
      ballObj.x-=ballObj.speed;
      if(ballObj.x<=0){//最左
        ballObj.x=0;
        ballObj.directionX=true;
      }
    }
    crush(ballObj);
  },10);

}

for(let i=0;i<balls.length;i++){//所有小球运动起来
    moveBall(balls[i]);
}

/********************************碰撞函数**********************************/
function crush(ballObj){

  for(let i=0;i<balls.length;i++){

    if(ballObj!==balls[i]){

      let x1=ballObj.x,
          x2=balls[i].x;
      let y1=ballObj.y,
          y2=balls[i].y;

      if(Math.abs(x2-x1)<=32&&Math.abs(y1-y2)<=32){//碰撞
        //判断传过来的小球，相对于被碰撞的小球的方向
        if(x1<x2){
          if(y1>y2){//左上角
            ballObj.directionX=false;
            ballObj.directionY=false;
          }else if(y1<y2){//左下角
            ballObj.directionX=false;
            ballObj.directionY=true;
          }else{//正左方
            ballObj.directionX=false;
          }
        }else if(x1>x2){
          if(y1>y2){//右上角
            ballObj.directionX=true;
            ballObj.directionY=false;
          }else if(y1<y1){//右下角
            ballObj.directionX=true;
            ballObj.directionY=true;
          }else{//正右方
            ballObj.directionX=true;
          }
        }else if(y1<y2){//正上方
            ballObj.directionY=false;
        }else if(y1>y2){//正下方
          ballObj.directionY=true;
        }

      }

    }

  }
}
