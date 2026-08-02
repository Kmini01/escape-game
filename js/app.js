// ==========================
// MISSION : 칼퇴 대작전
// Version 0.2
// ==========================

// 선택된 성별 저장
let gender = "";

// --------------------------
// 성별 선택
// --------------------------

const genderButtons = document.querySelectorAll(".genderBtn");

genderButtons.forEach(button => {

    button.addEventListener("click", () => {

        genderButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        gender = button.dataset.gender;

    });

});

// --------------------------
// 사원증 발급
// --------------------------

document.getElementById("idCardButton").addEventListener("click", () => {

    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("이름을 입력해주세요.");
        return;
    }

    if (gender === "") {
        alert("성별을 선택해주세요.");
        return;
    }

    const employeeNo =
        "EMP-" + Math.floor(1000 + Math.random() * 9000);

    localStorage.setItem("playerName", name);
    localStorage.setItem("gender", gender);
    localStorage.setItem("employeeNo", employeeNo);

    alert(

`🪪 사원증 발급 완료

이름 : ${name}

직급 : 신입사원

사번 : ${employeeNo}

게임을 시작할 준비가 되었습니다!`

    );

});

// --------------------------
// 게임 시작
// --------------------------

document.getElementById("startButton").addEventListener("click", () => {

    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("이름을 입력해주세요.");
        return;
    }

    if (gender === "") {
        alert("성별을 선택해주세요.");
        return;
    }

    localStorage.setItem("playerName", name);
    localStorage.setItem("gender", gender);

    alert(

`${name}님,

MISSION : 칼퇴 대작전을 시작합니다!

무사히 퇴근하세요!`

    );

    // 다음 버전에서는 여기서 Mission1 화면으로 이동합니다.
    // window.location.href = "mission1.html";

});
