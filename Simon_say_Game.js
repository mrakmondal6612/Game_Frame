let gameSq = [];
let userSq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is Started");
        // h2.innerText = "Game Started";
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rndIndx = Math.floor(Math.random()*3);
    let rndColor = btns[rndIndx];
    let rndBtn = document.querySelector(`.${rndColor}`);
    // console.log(rndIndx);
    // console.log(rndColor);
    // console.log(rndBtn);
    gameSq.push(rndColor);
    console.log(gameSq);
    gameFlash(rndBtn);
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSq.push(userColor);
    // console.log(userSq);

    checkAns(userSq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(i of allBtn){
    i.addEventListener("click",btnPress);
}

let allSq = [0];

function checkAns(idx){
    // let idx = level-1;
    if(userSq[idx] === gameSq[idx]){
        if(userSq.length == gameSq.length){
            setTimeout(levelUp,990);
        }
    }else{
        allSq.push(level);
        let maxSq = allSq.reduce((ans, i) => {
            if(ans > i) return ans;
            else return i;
        });
        console.log("All Sq= ", allSq, "max Score = ",maxSq);
        h2.innerHTML = `Game Over !<br> <b>Your score was : ${level}<br>Maximum score was : ${maxSq} </b> <br> Press any key to start.` ;
        let body = document.querySelector('body');
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white"; 
        }, 160);
        reset();
    }
}

function reset(){
    level = 0;
    userSq = [];
    gameSq = [];
    started = false;
}

