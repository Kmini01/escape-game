// ==========================
// MISSION : 칼퇴 대작전
// Version 1.0
// Part 1
// ==========================

// ==========================
// 게임 데이터
// ==========================

let gender = "";
let playerName = "";
let isReady = false;

const game = {

    // 게임 점수
    score: 0,

    // 신뢰도
    trust: 100,

    // 진행률
    progress: 0,

    // 현재 시간
    time: "09:00",

    // ======================
    // 역량 점수 (엔딩 별점 계산용)
    // ======================

    schedule: 0,        // 일정관리
    problem: 0,         // 문제해결
    communication: 0,   // 협업·소통
    report: 0,          // 업무보고
    manner: 0           // 비즈니스 매너

};
// ==========================
// 별점 생성
// ==========================

function makeStars(score){

    score = Math.max(0, Math.min(5, score));

    return "★".repeat(score) + "☆".repeat(5-score);

}

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
// Mission 1 선택
// ==========================

function selectAnswer(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        // 점수
        game.score += 10;

        // 진행
        game.progress += 10;

        // 시간
        game.time = "09:20";

        // 역량
        game.communication += 2;

        showResult(

            "✅",

            "좋은 선택!",

            "팀장에게 먼저 연락하여<br>상황을 공유했습니다.<br><br>⭐ 업무점수 +10"

        );

    }

    else if(answer===2){

        game.score += 5;
        game.progress += 10;
        game.time = "09:20";

        // 역량
        game.communication += 1;

        showResult(

            "🙂",

            "무난한 선택",

            "기다리는 것도 가능하지만<br>먼저 연락하는 것이 더 좋았습니다.<br><br>⭐ 업무점수 +5"

        );

    }

    else if(answer===3){

        game.score += 7;
        game.progress += 10;
        game.time = "09:10";

        // 역량
        game.problem += 1;

        showResult(

            "🚖",

            "빠른 판단",

            "시간은 지켰지만<br>먼저 연락하는 것이 더 좋은 방법이었습니다.<br><br>⭐ 업무점수 +7"

        );

    }

    else{

        game.score -= 5;
        game.trust -= 10;
        game.progress += 10;
        game.time = "09:30";

        showResult(

            "❌",

            "아쉬운 선택",

            "연락 없이 지각하여<br>신뢰도가 감소했습니다.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -10"

        );

    }

    updateHUD();

}
// ==========================
// 다음 미션 버튼
// ==========================

let currentMission = 1;

document
.getElementById("nextMissionButton")
.addEventListener("click",()=>{

    document
    .getElementById("resultModal")
    .classList.add("hidden");

    currentMission++;

    switch(currentMission){

        case 2:
            showMission2();
            break;

        case 3:
            showMission3();
            break;

        case 4:
            showMission4();
            break;

        case 5:
            showMission5();
            break;

        case 6:
            showMission6();
            break;

        case 7:
            showMission7();
            break;

        case 8:
            showMission8();
            break;

        default:
            showEnding();
            break;

    }

});
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

        game.score += 15;
        game.schedule += 2;

        game.trust += 5;
        game.progress += 10;
        game.time = "10:30";

        updateHUD();

        showResult(

            "📅",

            "일정 계획 완료!",

            "회의 시간을 고려하여 업무를 우선순위에 맞게 배치했습니다.<br><br>⭐ 업무점수 +15<br>❤️ 신뢰도 +5"

        );

    }

    else{

        game.score -= 5;
        game.trust -= 5;
        game.progress += 10;
        game.time = "10:30";

        updateHUD();

        showResult(

            "❌",

            "일정 계획 실패",

            "업무 우선순위와 회의 시간을 다시 고려해보세요.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -5"

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

        game.score += 15;
        game.problem += 2;

        game.trust += 5;
        game.progress += 10;
        game.time = "11:00";

        updateHUD();

        showResult(

            "🖨️",

            "문제 해결 성공!",

            "프린터 상태를 확인하고 대체 방법을 찾아 회의자료를 제시간에 준비했습니다.<br><br>⭐ 업무점수 +15<br>❤️ 신뢰도 +5"

        );

    }

    else if(answer===2){

        game.score += 10;
        game.problem += 1;

        game.progress += 10;
        game.time = "11:10";

        updateHUD();

        showResult(

            "🙂",

            "무난한 선택",

            "도움을 요청한 것은 좋았지만 먼저 스스로 해결 방법을 찾아보면 더 좋습니다.<br><br>⭐ 업무점수 +10"

        );

    }

    else if(answer===3){

        game.score += 5;
        game.problem += 1;

        game.progress += 10;
        game.time = "11:20";

        updateHUD();

        showResult(

            "😅",

            "아쉬운 선택",

            "문제가 해결될 때까지 기다리기보다 적극적으로 대안을 찾는 것이 좋습니다.<br><br>⭐ 업무점수 +5"

        );

    }

    else{

        game.score -= 5;
        game.trust -= 5;

        game.progress += 10;
        game.time = "11:30";

        updateHUD();

        showResult(

            "❌",

            "문제 해결 실패",

            "문제를 방치하여 회의 준비가 지연되었습니다.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -5"

        );

    }

}
// ==========================
// Mission 4 정답 확인
// ==========================

function checkMission4(){

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

        // 점수 (20점)
        game.score += 20;

        // 역량
        game.schedule += 2;
        game.problem += 1;

        // 신뢰도
        game.trust += 5;

        // 진행률
        game.progress += 10;

        // 시간
        game.time = "14:00";

        updateHUD();

        showResult(

            "📅",

            "일정 재조정 성공!",

            "회의 일정 변경에 맞춰 오전 업무를 효율적으로 재배치했습니다.<br><br>" +
            "⭐ 업무점수 +20<br>" +
            "❤️ 신뢰도 +5"

        );

    }

    else{

        // 점수
        game.score -= 10;

        // 신뢰도
        game.trust -= 5;

        // 진행률
        game.progress += 10;

        // 시간
        game.time = "14:00";

        updateHUD();

        showResult(

            "❌",

            "일정 재조정 실패",

            "회의 일정 변경을 반영하지 못했습니다.<br>" +
            "업무 우선순위를 다시 계획해보세요.<br><br>" +
            "⭐ 업무점수 -10<br>" +
            "❤️ 신뢰도 -5"

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
// Mission 5 채점
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

        game.score += 15;

        // 역량
        game.report += 2;

        game.trust += 5;
        game.progress += 10;
        game.time = "15:10";

        updateHUD();

        showResult(

            "📊",

            "자료 선택 성공!",

            "최신 실적 데이터와 작년 보고서를 함께 참고하여 업무보고서를 작성했습니다.<br><br>⭐ 업무점수 +15<br>❤️ 신뢰도 +5"

        );

    }

    else{

        game.score -= 5;

        game.trust -= 5;

        game.progress += 10;
        game.time = "15:10";

        updateHUD();

        showResult(

            "❌",

            "자료 선택 실패",

            "최신 데이터와 기존 보고서 양식을 함께 확인해야 정확한 업무보고서를 작성할 수 있습니다.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -5"

        );

    }

}
// ==========================
// Mission 6
// 다른 팀과 협업
// ==========================

function showMission6(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">
            🤝 MISSION 6
        </div>

        <h2>
            다른 팀과 협업하기
        </h2>

        <p>

            📢 마케팅팀에서 연락이 왔습니다.<br><br>

            "오늘 오후 4시까지 ESG 실적 데이터를
            공유해주실 수 있을까요?<br>
            내일 홍보자료 제작에 꼭 필요합니다."<br><br>

            현재 나도 업무보고서를
            마무리해야 하는 상황입니다.<br><br>

            어떻게 답하시겠습니까?

        </p>

        <button
            class="choiceBtn"
            onclick="selectMission6(1)">

            🤝 네, 가능합니다.<br>
            현재 업무를 마무리한 후
            30분 안에 전달드리겠습니다.

        </button>

        <button
            class="choiceBtn"
            onclick="selectMission6(2)">

            ⚡ 네! 지금 바로 보내드리겠습니다.

        </button>

        <button
            class="choiceBtn"
            onclick="selectMission6(3)">

            😅 지금 바빠서 어렵습니다.

        </button>

        <button
            class="choiceBtn"
            onclick="selectMission6(4)">

            📵 답장을 하지 않는다.

        </button>

    </div>

</div>

`);

}

// ==========================
// Mission 6 선택
// ==========================

function selectMission6(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        game.score += 10;

        // 역량
        game.communication += 2;

        game.trust += 5;
        game.progress += 10;
        game.time = "16:00";

        updateHUD();

        showResult(

            "🤝",

            "협업 성공!",

            "상대 부서와 일정을 조율하여 원활하게 협업했습니다.<br><br>⭐ 업무점수 +10<br>❤️ 신뢰도 +5"

        );

    }

    else if(answer===2){

        game.score += 5;

        game.communication += 1;

        game.progress += 10;
        game.time = "16:00";

        updateHUD();

        showResult(

            "🙂",

            "좋은 협조",

            "협조 의지는 좋았지만 현재 업무 일정도 함께 고려하면 더욱 좋습니다.<br><br>⭐ 업무점수 +5"

        );

    }

    else if(answer===3){

        game.score -= 5;

        game.trust -= 5;

        game.progress += 10;
        game.time = "16:00";

        updateHUD();

        showResult(

            "😐",

            "아쉬운 협업",

            "업무 우선순위는 지켰지만 협업과 소통이 부족했습니다.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -5"

        );

    }

    else{

        game.score -= 10;

        game.trust -= 10;

        game.progress += 10;
        game.time = "16:00";

        updateHUD();

        showResult(

            "❌",

            "협업 실패",

            "다른 부서와 소통하지 않아 업무에 차질이 발생했습니다.<br><br>⭐ 업무점수 -10<br>❤️ 신뢰도 -10"

        );

    }

}
// ==========================
// Mission 7
// 업무보고
// ==========================

function showMission7(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">
            📋 MISSION 7
        </div>

        <h2>
            퇴근 전 업무보고
        </h2>

        <p>

            🕔 오후 5시 40분<br><br>

            팀장님이 말씀하셨습니다.<br><br>

            <b>"오늘 진행한 업무를
            간단히 보고해주세요."</b><br><br>

            가장 적절한 업무보고를 선택하세요.

        </p>

        <button
        class="choiceBtn"
        onclick="selectMission7(1)">

        📋 오늘 일정을 계획하고,
        회의자료를 보완했으며,
        업무보고서를 작성했습니다.
        또한 마케팅팀과 데이터를
        공유했습니다.

        </button>

        <button
        class="choiceBtn"
        onclick="selectMission7(2)">

        😊 오늘 업무 다 했습니다.

        </button>

        <button
        class="choiceBtn"
        onclick="selectMission7(3)">

        📄 회의하고 자료 만들었습니다.

        </button>

        <button
        class="choiceBtn"
        onclick="selectMission7(4)">

        🚶 보고하지 않고 퇴근한다.

        </button>

    </div>

</div>

`);

}

// ==========================
// Mission 7 선택
// ==========================

function selectMission7(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        game.score += 10;

        // 역량
        game.report += 2;

        game.trust += 5;
        game.progress += 10;
        game.time = "17:50";

        updateHUD();

        showResult(

            "📋",

            "업무보고 완료!",

            "오늘의 업무를 핵심만 정리하여 명확하게 보고했습니다.<br><br>⭐ 업무점수 +10<br>❤️ 신뢰도 +5"

        );

    }

    else if(answer===2){

        game.score += 5;

        game.report += 1;

        game.progress += 10;
        game.time = "17:50";

        updateHUD();

        showResult(

            "🙂",

            "무난한 보고",

            "업무보고는 했지만 조금 더 구체적으로 전달하면 더욱 좋습니다.<br><br>⭐ 업무점수 +5"

        );

    }

    else if(answer===3){

        game.score += 3;

        game.report += 1;

        game.progress += 10;
        game.time = "17:50";

        updateHUD();

        showResult(

            "😅",

            "조금 아쉬운 보고",

            "업무 내용을 전달했지만 결과와 진행 상황을 함께 설명하면 더욱 좋습니다.<br><br>⭐ 업무점수 +3"

        );

    }

    else{

        game.score -= 5;

        game.trust -= 10;

        game.progress += 10;
        game.time = "17:50";

        updateHUD();

        showResult(

            "❌",

            "업무보고 누락",

            "퇴근 전 업무보고는 중요한 업무입니다.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -10"

        );

    }

}
// ==========================
// Mission 8
// 퇴근하기
// ==========================

function showMission8(){

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

    <div class="missionCard">

        <div class="missionLabel">
            🎉 FINAL MISSION
        </div>

        <h2>
            퇴근 시간!
        </h2>

        <p>

            🕕 오후 6시가 되었습니다.<br><br>

            오늘 하루의 업무를 모두 마쳤습니다.<br><br>

            이제 퇴근하려고 합니다.<br><br>

            가장 적절한 행동은 무엇일까요?

        </p>

        <button
            class="choiceBtn"
            onclick="selectMission8(1)">

            🙋 "더 도와드릴 업무나
            제가 할 일이 있을까요?"

        </button>

        <button
            class="choiceBtn"
            onclick="selectMission8(2)">

            😊 "먼저 퇴근하겠습니다.
            고생하셨습니다.
            좋은 저녁 보내세요."

        </button>

        <button
            class="choiceBtn"
            onclick="selectMission8(3)">

            🚶 6시 10분 전에
            인사 없이 조용히 사라진다.

        </button>

        <button
            class="choiceBtn"
            onclick="selectMission8(4)">

            👜 6시 정각이 되자
            바로 가방을 챙기고 일어난다.

        </button>

    </div>

</div>

`);

}

// ==========================
// Mission 8 선택
// ==========================

function selectMission8(answer){

    document.getElementById("missionContainer").remove();

    if(answer===1){

        game.score += 5;

        // 역량
        game.manner += 2;

        game.trust += 5;
        game.progress = 100;
        game.time = "18:00";

        updateHUD();

        showResult(

            "🏆",

            "최고의 선택!",

            "퇴근 전 남은 업무를 먼저 확인하는 책임감 있는 자세를 보여주었습니다.<br><br>⭐ 업무점수 +5<br>❤️ 신뢰도 +5"

        );

    }

    else if(answer===2){

        game.score += 3;

        game.manner += 1;

        game.trust += 3;
        game.progress = 100;
        game.time = "18:00";

        updateHUD();

        showResult(

            "😊",

            "좋은 선택!",

            "정중하게 퇴근 인사를 하고 퇴근했습니다.<br><br>⭐ 업무점수 +3<br>❤️ 신뢰도 +3"

        );

    }

    else if(answer===3){

        game.score -= 3;

        game.trust -= 5;

        game.progress = 100;
        game.time = "18:00";

        updateHUD();

        showResult(

            "😅",

            "아쉬운 선택",

            "인사 없이 퇴근하여 좋은 인상을 남기지 못했습니다.<br><br>⭐ 업무점수 -3<br>❤️ 신뢰도 -5"

        );

    }

    else{

        game.score -= 5;

        game.trust -= 3;

        game.progress = 100;
        game.time = "18:00";

        updateHUD();

        showResult(

            "😐",

            "조금 아쉬운 선택",

            "퇴근 시간은 되었지만 주변 상황을 한 번 더 확인하면 더욱 좋습니다.<br><br>⭐ 업무점수 -5<br>❤️ 신뢰도 -3"

        );

    }

}
// ==========================
// Ending
// ==========================

function showEnding(){

    let title = "";
    let icon = "";
    let message = "";
    let resultColor = "";

    // --------------------------
// 결과 판정 (100점 만점)
// --------------------------

if(game.score >= 85 && game.trust >= 90){

    icon = "🏆";
    title = "칼퇴 성공!";
    resultColor = "#16a34a";

    message =
    "오늘 하루 업무를 완벽하게 수행했습니다.<br>" +
    "업무능력과 협업, 소통까지 모두 인정받았습니다.<br><br>" +
    "축하합니다! 정시에 퇴근합니다. 🎉";

}

else if(game.score >= 70 && game.trust >= 75){

    icon = "😊";
    title = "정상 퇴근";
    resultColor = "#2563eb";

    message =
    "오늘의 업무를 무사히 마무리했습니다.<br>" +
    "신입사원으로서 좋은 업무 수행을 보여주었습니다.<br><br>" +
    "오늘도 수고 많으셨습니다!";

}

else if(game.score >= 50 && game.trust >= 60){

    icon = "⏰";
    title = "야근 1시간";
    resultColor = "#f59e0b";

    message =
    "업무는 대부분 완료했지만<br>" +
    "일부 업무를 마무리하기 위해<br>" +
    "1시간 정도 추가 근무가 필요합니다.";

}

else{

    icon = "🌙";
    title = "야근 확정";
    resultColor = "#dc2626";

    message =
    "업무 처리와 협업에서 아쉬운 부분이 있었습니다.<br>" +
    "오늘의 피드백을 참고하여<br>" +
    "다음에는 칼퇴에 다시 도전해보세요!";

}
    // --------------------------
    // BEST 역량 / 성장포인트
    // --------------------------

    const skills = [

        {name:"일정관리", score:game.schedule},
        {name:"문제해결", score:game.problem},
        {name:"협업·소통", score:game.communication},
        {name:"업무보고", score:game.report},
        {name:"비즈니스매너", score:game.manner}

    ];

    const bestSkill =
    skills.reduce((a,b)=>a.score>b.score?a:b);

    const weakSkill =
    skills.reduce((a,b)=>a.score<b.score?a:b);

    let advice="";

    switch(weakSkill.name){

        case "일정관리":
            advice="업무 우선순위를 먼저 계획해보세요.";
            break;

        case "문제해결":
            advice="문제가 발생하면 다양한 해결방법을 먼저 찾아보세요.";
            break;

        case "협업·소통":
            advice="동료와 진행 상황을 자주 공유해보세요.";
            break;

        case "업무보고":
            advice="결과와 진행 상황을 조금 더 구체적으로 보고해보세요.";
            break;

        case "비즈니스매너":
            advice="인사와 기본 예절을 조금 더 신경 써보세요.";
            break;

    }

    // --------------------------
    // 종합 별점
    // --------------------------

    const totalStar = Math.round(

        (
            game.schedule +
            game.problem +
            game.communication +
            game.report +
            game.manner
        ) / 5

    );

    // --------------------------
    // 성과 리포트
    // --------------------------

    const report = `

<div style="
margin:25px 0;
padding:20px;
background:#f8fafc;
border-radius:18px;
text-align:left;
">

<h3 style="
text-align:center;
color:#2563eb;
margin-bottom:18px;
">

📊 오늘의 성과 리포트

</h3>

<div style="line-height:2.1;">

⭐ 종합역량
<span style="float:right;">
${makeStars(totalStar)}
</span>

<br>

🗓️ 일정관리
<span style="float:right;">
${makeStars(game.schedule)}
</span>

<br>

🛠️ 문제해결
<span style="float:right;">
${makeStars(game.problem)}
</span>

<br>

🤝 협업·소통
<span style="float:right;">
${makeStars(game.communication)}
</span>

<br>

📋 업무보고
<span style="float:right;">
${makeStars(game.report)}
</span>

<br>

💼 비즈니스매너
<span style="float:right;">
${makeStars(game.manner)}
</span>

</div>

</div>

`;

    // --------------------------
    // 성장 피드백
    // --------------------------

    const feedback = `

<div style="
margin-top:20px;
padding:20px;
background:#eef6ff;
border-radius:18px;
text-align:left;
">

<h3 style="
text-align:center;
color:#2563eb;
margin-bottom:15px;
">

🏅 성장 피드백

</h3>

<div style="line-height:2;">

<strong>BEST 역량</strong><br>

🏆 ${bestSkill.name}
(${makeStars(bestSkill.score)})

<br><br>

<strong>성장 포인트</strong><br>

📈 ${weakSkill.name}
(${makeStars(weakSkill.score)})

<br><br>

💡 ${advice}

</div>

</div>

`;

    // --------------------------
    // 화면 출력
    // --------------------------

    document.body.insertAdjacentHTML("beforeend",`

<div id="missionContainer">

<div class="missionCard">

<div class="missionLabel">

🎊 GAME CLEAR

</div>

<div style="font-size:90px;margin:20px 0;">

${icon}

</div>

<h2 style="color:${resultColor};">

${title}

</h2>

<p style="line-height:2;margin-top:20px;">

⭐ <b>최종 업무점수</b> : ${game.score}점<br>

❤️ <b>최종 신뢰도</b> : ${game.trust}%<br><br>

${message}

</p>

${report}

${feedback}

<button
class="choiceBtn"
onclick="location.reload()">

🔄 다시 플레이

</button>

</div>

</div>

`);

}
