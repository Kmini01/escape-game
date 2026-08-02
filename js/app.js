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
let isReady = false;
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

    isReady = !isReady;

    const btn = document.getElementById("idCardButton");

    if(isReady){

        btn.innerHTML = "✅ 출근 준비 완료";
        btn.style.background = "#16a34a";

    }else{

        btn.innerHTML = "🪪 출근 준비 완료";
        btn.style.background = "#2563eb";

    }

});

document.getElementById("startButton").addEventListener("click",()=>{

    playerName = document.getElementById("playerName").value.trim();

    if(playerName===""){

        alert("이름을 입력해주세요.");
        return;

    }

    if(gender===""){

        alert("성별을 선택해주세요.");
        return;

    }

    if(!isReady){

        alert("출근 준비 완료를 눌러주세요.");
        return;

    }

    document.getElementById("cardName").textContent = playerName;

    document.getElementById("idCardModal").classList.remove("hidden");

    setTimeout(()=>{

        document.getElementById("idCardModal").classList.add("hidden");

        startGame();

    },1500);

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

    showMission2();

});

// ==========================
// 초기 HUD
// ==========================

updateHUD();

// ==========================
// Mission 2
// 오늘의 업무 일정표
// ==========================

function showMission2(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">

            📅 MISSION 2

        </div>

        <h2>

            오늘의 업무 일정표 만들기

        </h2>

        <p>

            팀장님이 오늘 해야 할 업무를 전달했습니다.<br><br>

            <b>회의 시간을 고려하여</b><br>
            가장 적절한 일정표를 선택하세요.

        </p>

        <button class="choiceBtn" onclick="selectMission2(1)">

            📧 이메일 → 📑 회의자료 → 📞 거래처 → 👥 팀회의 → 📊 업무보고

        </button>

        <button class="choiceBtn" onclick="selectMission2(2)">

            📊 업무보고 → 📧 이메일 → 👥 팀회의 → 📑 회의자료

        </button>

        <button class="choiceBtn" onclick="selectMission2(3)">

            📞 거래처 → 📊 업무보고 → 📑 회의자료 → 👥 팀회의

        </button>

        <button class="choiceBtn" onclick="selectMission2(4)">

            📑 회의자료 → 📧 이메일 → 📊 업무보고 → 👥 팀회의

        </button>

    </div>

</div>

`);

}
// ==========================
// Mission 2 선택
// ==========================

function selectMission2(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        game.score += 20;
        game.trust += 5;
        game.progress += 10;
        game.time = "10:00";

        showResult(
            "📅",
            "일정 계획 완료!",
            "회의 시간을 고려하여<br>업무 우선순위를 적절하게 계획했습니다.<br><br>⭐ 업무점수 +20<br>❤️ 신뢰도 +5"
        );

    }

    else{

        game.score -= 10;
        game.trust -= 5;
        game.progress += 10;
        game.time = "10:10";

        showResult(
            "❌",
            "일정 계획 실패",
            "회의 전에 필요한 업무가<br>계획되지 않았습니다.<br><br>⭐ 업무점수 -10<br>❤️ 신뢰도 -5"
        );

    }

    updateHUD();

}
