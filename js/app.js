// ==========================
// MISSION : 칼퇴 대작전
// Version 1.0
// Part 1
// ==========================

// --------------------------
// 게임 데이터
// --------------------------

let gender = "";
let playerName = "";

const game = {

    score: 0,
    trust: 100,
    progress: 0,
    time: "09:00"

};

// --------------------------
// HUD 업데이트
// --------------------------

function updateHUD(){

    document.getElementById("gameTime").textContent = game.time;
    document.getElementById("score").textContent = game.score;
    document.getElementById("trust").textContent = game.trust;
    document.getElementById("progress").textContent = game.progress;

}

// --------------------------
// 성별 선택
// --------------------------

const genderButtons = document.querySelectorAll(".genderBtn");

genderButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        genderButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        gender = button.dataset.gender;

    });

});

// --------------------------
// 출근 준비 완료
// --------------------------

document.getElementById("idCardButton").addEventListener("click",()=>{

    playerName = document.getElementById("playerName").value.trim();

    if(playerName===""){

        alert("이름을 입력해주세요.");
        return;

    }

    if(gender===""){

        alert("성별을 선택해주세요.");
        return;

    }

    document.getElementById("cardName").textContent = playerName;

    document.getElementById("idCardModal").classList.remove("hidden");

});

// --------------------------
// 출근하기
// --------------------------

document.getElementById("closeCardButton").addEventListener("click",()=>{

    document.getElementById("idCardModal").classList.add("hidden");

    startGame();

});

// --------------------------
// 게임 시작
// --------------------------

function startGame(){

    document.getElementById("startScreen").style.display="none";

    document.getElementById("hud").classList.remove("hidden");

    updateHUD();

    showCountdown();

}

// --------------------------
// 카운트다운
// --------------------------

function showCountdown(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="countdownScreen">

    <div class="countBox">

        <div class="levelText">
            🎮 LEVEL 1
        </div>

        <h1>칼퇴 대작전</h1>

        <p>오늘은 입사 첫날입니다.</p>

        <div id="countNumber">3</div>

    </div>

</div>

`);

    let count = 3;

    const timer = setInterval(()=>{

        count--;

        if(count>0){

            document.getElementById("countNumber").textContent = count;

        }else if(count===0){

            document.getElementById("countNumber").textContent = "START";

        }else{

            clearInterval(timer);

            document.getElementById("countdownScreen").remove();

            showMission1();

        }

    },1000);

}
// ==========================
// Part 2
// Mission 1
// ==========================

function showMission1(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">
            🌧️ MISSION 1
        </div>

        <h2>출근부터 위기!</h2>

        <p>

            폭우로 인해 지하철이 20분 연착되었습니다.<br><br>

            가장 먼저 어떻게 하시겠습니까?

        </p>

        <button class="choiceBtn" onclick="selectAnswer(1)">
            📞 팀장에게 먼저 연락한다.
        </button>

        <button class="choiceBtn" onclick="selectAnswer(2)">
            🚇 지하철을 계속 기다린다.
        </button>

        <button class="choiceBtn" onclick="selectAnswer(3)">
            🚖 택시를 탄다.
        </button>

        <button class="choiceBtn" onclick="selectAnswer(4)">
            😴 아무 연락도 하지 않는다.
        </button>

    </div>

</div>

`);

}

// ==========================
// 결과 팝업
// ==========================

function showResult(icon,title,text){

    document.getElementById("resultIcon").textContent = icon;

    document.getElementById("resultTitle").textContent = title;

    document.getElementById("resultText").innerHTML = text;

    document.getElementById("resultModal").classList.remove("hidden");

}

// ==========================
// 선택
// ==========================

function selectAnswer(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        game.score+=20;
        game.progress+=10;
        game.time="09:20";

        showResult(
            "✅",
            "좋은 선택!",
            "팀장에게 먼저 연락하여<br>상황을 공유했습니다.<br><br>⭐ 업무점수 +20"
        );

    }

    else if(answer===2){

        game.score+=10;
        game.progress+=10;
        game.time="09:20";

        showResult(
            "🙂",
            "무난한 선택",
            "기다리는 것도 가능하지만<br>먼저 연락하는 것이 더 좋았습니다.<br><br>⭐ 업무점수 +10"
        );

    }

    else if(answer===3){

        game.score+=15;
        game.progress+=10;
        game.time="09:10";

        showResult(
            "🚖",
            "빠른 판단",
            "시간은 지켰지만<br>비용도 함께 고려해야 합니다.<br><br>⭐ 업무점수 +15"
        );

    }

    else{

        game.score-=10;
        game.trust-=10;
        game.progress+=10;
        game.time="09:30";

        showResult(
            "❌",
            "아쉬운 선택",
            "연락 없이 지각하여<br>신뢰도가 감소했습니다.<br><br>❤️ 신뢰도 -10"
        );

    }

    updateHUD();

}
// ==========================
// Part 3
// 다음 버튼
// ==========================

document
.getElementById("nextMissionButton")
.addEventListener("click",()=>{

    document
    .getElementById("resultModal")
    .classList.add("hidden");

    alert("Mission 2가 이어질 예정입니다.");

});

// ==========================
// 초기 HUD
// ==========================

updateHUD();
