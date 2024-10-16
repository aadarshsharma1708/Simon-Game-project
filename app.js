let gameSeq=[];
let userSeq=[];
let started=[];
let level=0;
let highScore=0;
let btnColor=["red","yellow","green","blue"];

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is Started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function useFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    if(level > highScore){
        highScore++;
    }
    
    h2.innerText=`Level ${level}`;
    let ranIdx = Math.floor(Math.random()*3);
    let ranColor = btnColor[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}
function checkAns(idx){
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    }else{        
        if (level >= highScore) {
            highScore=level;
        }
        h2.innerHTML = `Game Over! Your score is <b>${level}</b>. <br> <i>"Your HighScore is <b>${highScore}</b>."</i> <br> Press any key to Restart.`
        document.querySelector("h2").style.color="red";
        setTimeout(function(){
            document.querySelector("h2").style.color="black";
        },200);
        
        
        reset();
    }
}
function btnPress(){
    let btn = this;
    useFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}