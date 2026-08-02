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
// 다음 버튼
// ==========================

document
.getElementById("nextMissionButton")
.addEventListener("click",()=>{

    document
    .getElementById("resultModal")
    .classList.add("hidden");

    switch(game.progress){

        case 10:
            showMission2();
            break;

        case 20:
            showMission3();
            break;

        case 30:
            showMission4();
            break;

        case 40:
            showMission5();
            break;

        case 50:
            showMission6();
            break;

        case 60:
            showMission7();
            break;

        case 70:
            showMission8();
            break;

        case 80:
            showEnding();
            break;

    }

});

updateHUD();
// ==========================
// 초기 HUD
// ==========================

// ==========================
// Mission 2
// 오늘의 업무 일정표
// ==========================

let draggedTask = null;

function showMission2(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard missionSchedule">

        <div class="missionLabel">
            📅 MISSION 2
        </div>

        <h2>오늘의 업무 일정표 만들기</h2>

        <p>
            업무 카드를 드래그하여<br>
            올바른 시간에 배치하세요.
        </p>

        <div class="scheduleArea">

            <div class="timeRow">
                <div class="time">09:00</div>

                <div class="dropZone"
                     data-answer="email"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow">
                <div class="time">09:15</div>

                <div class="dropZone"
                     data-answer="print"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow">
                <div class="time">09:35</div>

                <div class="dropZone"
                     data-answer="call"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow fixed">

                <div class="time">
                    10:00
                </div>

                <div class="fixedTask">
                    👥 팀회의 (30분)
                </div>

            </div>

            <div class="timeRow">

                <div class="time">
                    10:30
                </div>

                <div class="dropZone"
                     data-answer="report"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow fixed">

                <div class="time">
                    12:00
                </div>

                <div class="fixedTask">
                    🍱 점심시간
                </div>

            </div>

        </div>

        <h3>업무 카드</h3>

        <div id="taskArea">

            <div class="taskCard"
                 id="email"
                 draggable="true"
                 ondragstart="drag(event)">

                📧 이메일 확인
                <br>
                <small>15분</small>

            </div>

            <div class="taskCard"
                 id="print"
                 draggable="true"
                 ondragstart="drag(event)">

                📑 회의자료 출력
                <br>
                <small>20분</small>

            </div>

            <div class="taskCard"
                 id="call"
                 draggable="true"
                 ondragstart="drag(event)">

                📞 거래처 전화
                <br>
                <small>20분</small>

            </div>

            <div class="taskCard"
                 id="report"
                 draggable="true"
                 ondragstart="drag(event)">

                📊 업무보고 작성
                <br>
                <small>60분</small>

            </div>

        </div>

        <button
            id="checkScheduleButton"
            onclick="checkMission2()">

            ✅ 일정 확인

        </button>

    </div>

</div>

`);

}
// ==========================
// Drag & Drop
// ==========================

function drag(event){

    draggedTask = event.target.id;

    event.dataTransfer.setData("text", draggedTask);

}

function allowDrop(event){

    event.preventDefault();

}

function drop(event){

    event.preventDefault();

    const taskId = event.dataTransfer.getData("text");

    const task = document.getElementById(taskId);

    const zone = event.target.closest(".dropZone");

    if(!zone) return;

    // 이미 카드가 있으면 서로 교체
    if(zone.firstElementChild){

        const existTask = zone.firstElementChild;

        const oldParent = task.parentElement;

        zone.appendChild(task);

        if(oldParent.id === "taskArea"){

            oldParent.appendChild(existTask);

        }else{

            oldParent.appendChild(existTask);

        }

    }

    else{

        const oldParent = task.parentElement;

        zone.appendChild(task);

        if(oldParent.classList.contains("dropZone")){

            // 기존 슬롯은 비워둠

        }

    }

}

// ==========================
// Mission 2 정답 확인
// ==========================

function checkMission2(){

    let correct = true;

    document.querySelectorAll(".dropZone").forEach(zone=>{

        const answer = zone.dataset.answer;
        const task = zone.firstElementChild;

        if(!task || task.id !== answer){

            correct = false;

        }

    });

    document.getElementById("missionContainer").remove();

    if(correct){

        game.score += 20;
        game.trust += 5;
        game.progress += 10;
        game.time = "10:30";

        updateHUD();

        showResult(
            "🎉",
            "일정 계획 완료!",
            "회의 시간을 고려하여 업무를 올바르게 배치했습니다.<br><br>⭐ 업무점수 +20<br>❤️ 신뢰도 +5"
        );

    }

    else{

        game.score -= 10;
        game.trust -= 5;
        game.progress += 10;
        game.time = "10:30";

        updateHUD();

        showResult(
            "❌",
            "일정 계획 실패",
            "회의 전에 필요한 업무 순서를 다시 확인해보세요.<br><br>⭐ 업무점수 -10<br>❤️ 신뢰도 -5"
        );

    }

}
// ==========================
// Mission 3
// 프린터 고장
// ==========================

function showMission3(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">

            🖨️ MISSION 3

        </div>

        <h2>

            프린터가 고장났다!

        </h2>

        <p>

            회의자료를 출력하려는데<br>
            프린터 오류가 발생했습니다.<br><br>

            <b>회의까지 20분 남았습니다.</b><br><br>

            어떻게 하시겠습니까?

        </p>

        <button class="choiceBtn" onclick="selectMission3(1)">

            👨‍💼 팀장에게 먼저 보고하고 다른 프린터를 확인한다.

        </button>

        <button class="choiceBtn" onclick="selectMission3(2)">

            🔧 혼자 계속 프린터를 고쳐본다.

        </button>

        <button class="choiceBtn" onclick="selectMission3(3)">

            🚶 아무 말 없이 다른 층 프린터를 찾으러 간다.

        </button>

        <button class="choiceBtn" onclick="selectMission3(4)">

            😅 회의시간이 될 때까지 기다렸다가 이야기한다.

        </button>

    </div>

</div>

`);

}

// ==========================
// Mission 3 선택
// ==========================

function selectMission3(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        game.score += 20;
        game.trust += 5;
        game.progress += 10;
        game.time = "09:55";

        updateHUD();

        showResult(
            "🖨️",
            "좋은 판단!",
            "문제를 바로 공유하고<br>대안을 찾아 회의 준비를 이어갔습니다.<br><br>⭐ 업무점수 +20<br>❤️ 신뢰도 +5"
        );

    }

    else if(answer===2){

        game.score += 10;
        game.progress += 10;
        game.time = "10:00";

        updateHUD();

        showResult(
            "🔧",
            "노력은 좋았습니다.",
            "직접 해결하려는 자세는 좋았지만<br>시간이 많이 지체되었습니다.<br><br>⭐ 업무점수 +10"
        );

    }

    else if(answer===3){

        game.score += 5;
        game.progress += 10;
        game.time = "09:58";

        updateHUD();

        showResult(
            "🏃",
            "조금 아쉬운 선택",
            "문제는 해결할 수 있지만<br>팀장이 현재 상황을 알지 못했습니다.<br><br>⭐ 업무점수 +5"
        );

    }

    else{

        game.score -= 10;
        game.trust -= 10;
        game.progress += 10;
        game.time = "10:05";

        updateHUD();

        showResult(
            "❌",
            "아쉬운 선택",
            "보고가 늦어져 회의 준비에 차질이 생겼습니다.<br><br>⭐ 업무점수 -10<br>❤️ 신뢰도 -10"
        );

    }

}
// ==========================
// Mission 4
// 회의 일정 변경
// ==========================

function showMission4(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard missionSchedule">

        <div class="missionLabel">
            📅 MISSION 4
        </div>

        <h2>
            회의 일정이 변경되었습니다!
        </h2>

        <p>

            📢 팀장님 공지<br><br>

            회의가 <b>오후 2시</b>로 변경되었습니다.<br>

            오전 시간이 생겼습니다.<br><br>

            <b>회의자료를 보완하는 업무가 추가되었습니다.</b><br>

            일정을 다시 배치하세요.

        </p>

        <div class="scheduleArea">

            <div class="timeRow">

                <div class="time">09:00</div>

                <div class="dropZone"
                     data-answer="email"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow">

                <div class="time">09:20</div>

                <div class="dropZone"
                     data-answer="call"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow">

                <div class="time">10:00</div>

                <div class="dropZone"
                     data-answer="report"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow">

                <div class="time">11:10</div>

                <div class="dropZone"
                     data-answer="edit"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow">

                <div class="time">13:20</div>

                <div class="dropZone"
                     data-answer="print"
                     ondragover="allowDrop(event)"
                     ondrop="drop(event)">
                </div>

            </div>

            <div class="timeRow fixed">

                <div class="time">14:00</div>

                <div class="fixedTask">

                    👥 팀회의 (30분)

                </div>

            </div>

        </div>

        <h3>업무 카드</h3>

        <div id="taskArea">

            <div class="taskCard"
                 id="email"
                 draggable="true"
                 ondragstart="drag(event)">

                📧 이메일 확인
                <br><small>15분</small>

            </div>

            <div class="taskCard"
                 id="call"
                 draggable="true"
                 ondragstart="drag(event)">

                📞 거래처 전화
                <br><small>20분</small>

            </div>

            <div class="taskCard"
                 id="report"
                 draggable="true"
                 ondragstart="drag(event)">

                📊 업무보고 작성
                <br><small>60분</small>

            </div>

            <div class="taskCard"
                 id="edit"
                 draggable="true"
                 ondragstart="drag(event)">

                📝 회의자료 보완
                <br><small>40분</small>

            </div>

            <div class="taskCard"
                 id="print"
                 draggable="true"
                 ondragstart="drag(event)">

                🖨️ 회의자료 출력
                <br><small>20분</small>

            </div>

        </div>

        <button
            id="checkScheduleButton"
            onclick="checkMission4()">

            ✅ 일정 확인

        </button>

    </div>

</div>

`);

}
// ==========================
// Mission4 채점
// ==========================

function checkMission4(){

    let correct = true;

    document.querySelectorAll(".dropZone").forEach(zone=>{

        const answer = zone.dataset.answer;
        const task = zone.firstElementChild;

        if(!task || task.id!==answer){

            correct = false;

        }

    });

    document.getElementById("missionContainer").remove();

    if(correct){

        game.score += 25;
        game.trust += 5;
        game.progress += 10;
        game.time = "14:30";

        updateHUD();

        showResult(
            "👏",
            "일정 재조정 성공!",
            "회의 변경에 맞춰 업무를 효율적으로 재배치했습니다.<br><br>⭐ 업무점수 +25<br>❤️ 신뢰도 +5"
        );

    }

    else{

        game.score -= 10;
        game.progress += 10;
        game.time = "14:30";

        updateHUD();

        showResult(
            "❌",
            "일정 재조정 실패",
            "회의 변경에 맞는 업무 순서를 다시 생각해보세요.<br><br>⭐ 업무점수 -10"
        );

    }

}
// ==========================
// Mission 5
// 업무보고서 작성
// ==========================

let selectedFiles = [];

function showMission5(){

    selectedFiles = [];

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">
            📊 MISSION 5
        </div>

        <h2>업무보고서 작성</h2>

        <p>

            📢 팀장님<br><br>

            오후 ESG 회의를 위해<br>

            <b>「2026년 상반기 ESG 활동 실적 보고서」</b>를 작성해주세요.<br><br>

            보고서 작성에 필요한 자료 <b>2개</b>를 선택하세요.

        </p>

        <div class="fileList">

            <div
                class="fileItem"
                onclick="selectFile(this,'2026')">

                <span class="fileIcon">📊</span>

                <span class="fileName">

                    2026 상반기 ESG 실적.xlsx

                </span>

                <span class="fileDate">

                    2026-07-30

                </span>

            </div>

            <div
                class="fileItem"
                onclick="selectFile(this,'report')">

                <span class="fileIcon">📄</span>

                <span class="fileName">

                    2025 상반기 ESG 보고서.docx

                </span>

                <span class="fileDate">

                    2025-12-20

                </span>

            </div>

            <div
                class="fileItem"
                onclick="selectFile(this,'2025')">

                <span class="fileIcon">📊</span>

                <span class="fileName">

                    2025 상반기 ESG 실적.xlsx

                </span>

                <span class="fileDate">

                    2025-07-25

                </span>

            </div>

            <div
                class="fileItem"
                onclick="selectFile(this,'memo')">

                <span class="fileIcon">📝</span>

                <span class="fileName">

                    ESG 회의 메모.txt

                </span>

                <span class="fileDate">

                    2026-07-28

                </span>

            </div>

            <div
                class="fileItem"
                onclick="selectFile(this,'logo')">

                <span class="fileIcon">🖼️</span>

                <span class="fileName">

                    회사 로고.png

                </span>

                <span class="fileDate">

                    2026-01-15

                </span>

            </div>

        </div>

        <button
            id="checkMission5Button"
            onclick="checkMission5()">

            ✅ 선택 완료

        </button>

    </div>

</div>

`);

}

// ==========================
// 파일 선택
// ==========================

function selectFile(element,value){

    if(element.classList.contains("selected")){

        element.classList.remove("selected");

        selectedFiles =
        selectedFiles.filter(v=>v!==value);

        return;

    }

    if(selectedFiles.length>=2){

        alert("파일은 2개만 선택할 수 있습니다.");

        return;

    }

    element.classList.add("selected");

    selectedFiles.push(value);

}

// ==========================
// Mission5 채점
// ==========================

function checkMission5(){

    if(selectedFiles.length!==2){

        alert("파일 2개를 선택해주세요.");

        return;

    }

    document.getElementById("missionContainer").remove();

    const correct =
    selectedFiles.includes("2026") &&
    selectedFiles.includes("report");

    if(correct){

        game.score += 20;
        game.trust += 5;
        game.progress += 10;
        game.time = "15:10";

        updateHUD();

        showResult(

            "📊",

            "자료 선택 성공!",

            "최신 실적 데이터와 작년 보고서를 함께 참고하여 업무보고서를 작성했습니다.<br><br>⭐ 업무점수 +20<br>❤️ 신뢰도 +5"

        );

    }

    else{

        game.score -= 10;
        game.trust -= 5;
        game.progress += 10;
        game.time = "15:10";

        updateHUD();

        showResult(

            "❌",

            "자료 선택 실패",

            "최신 데이터와 기존 보고서 양식을 함께 확인해야 합니다.<br><br>⭐ 업무점수 -10<br>❤️ 신뢰도 -5"

        );

    }

}
