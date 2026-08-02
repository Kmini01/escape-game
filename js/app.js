// ==========================
// MISSION : 칼퇴 대작전
// Version 0.4
// ==========================

let gender = "";
let playerName = "";

// --------------------------
// 성별 선택
// --------------------------

const genderButtons = document.querySelectorAll(".genderBtn");

genderButtons.forEach(button => {

    button.addEventListener("click", () => {

        genderButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        gender = button.dataset.gender;

    });

});

// --------------------------
// 출근 준비 완료
// --------------------------

document.getElementById("idCardButton").addEventListener("click", () => {

    playerName = document.getElementById("playerName").value.trim();

    if(playerName === ""){
        alert("이름을 입력해주세요.");
        return;
    }

    if(gender === ""){
        alert("성별을 선택해주세요.");
        return;
    }

    localStorage.setItem("playerName", playerName);
    localStorage.setItem("gender", gender);

    document.getElementById("cardName").textContent = playerName;

    document.getElementById("idCardModal").classList.remove("hidden");

});

// --------------------------
// 출근하기
// --------------------------

document.getElementById("closeCardButton").addEventListener("click", () => {

    document.getElementById("idCardModal").classList.add("hidden");

    startMission();

});

// --------------------------
// 게임 시작 버튼
// (임시 비활성)
// --------------------------

document.getElementById("startButton").style.display = "none";

// --------------------------
// Mission 시작
// --------------------------

function startMission(){

    document.body.innerHTML = `

    <div class="introScreen">

        <div class="introBox">

            <div class="level">

                🎮 LEVEL 1

            </div>

            <h1>

                칼퇴 대작전

            </h1>

            <p>

                오늘은 입사 첫날입니다.

            </p>

            <div id="countdown">

                3

            </div>

        </div>

    </div>

    `;

    let count = 3;

    const timer = setInterval(()=>{

        count--;

        if(count>0){

            document.getElementById("countdown").textContent=count;

        }else if(count===0){

            document.getElementById("countdown").textContent="START";

        }else{

            clearInterval(timer);

            showMission1();

        }

    },1000);

}

// --------------------------
// Mission1
// --------------------------

function showMission1(){

    document.body.innerHTML=`

    <div class="missionScreen">

        <div class="missionCard">

            <div class="missionTitle">

                🌧️ Mission 1

            </div>

            <h2>

                출근부터 위기!

            </h2>

            <p>

                폭우로 인해 지하철이 20분 연착되었습니다.

                가장 먼저 어떻게 하시겠습니까?

            </p>

            <button class="choice">

                팀장에게 먼저 연락한다.

            </button>

            <button class="choice">

                지하철을 계속 기다린다.

            </button>

            <button class="choice">

                택시를 탄다.

            </button>

            <button class="choice">

                아무 연락도 하지 않는다.

            </button>

        </div>

    </div>

    `;

}
