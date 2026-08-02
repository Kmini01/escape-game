
// ==========================
// MISSION : 칼퇴 대작전
// Version 0.1
// ==========================

let gender = "";

// 성별 선택
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

// 게임 시작

document.getElementById("startButton").addEventListener("click", () => {

    const name = document.getElementById("playerName").value.trim();

    if(name === ""){

        alert("이름을 입력해주세요.");

        return;

    }

    if(gender === ""){

        alert("성별을 선택해주세요.");

        return;

    }

    localStorage.setItem("playerName",name);

    localStorage.setItem("gender",gender);

    alert(

        name +

        "님,\n\nMISSION : 칼퇴 대작전을 시작합니다!"

    );
document
.getElementById("idCardButton")
.addEventListener("click",()=>{

    const company=document
    .getElementById("companyName")
    .value
    .trim();

    const name=document
    .getElementById("playerName")
    .value
    .trim();

    if(company===""){

        alert("회사명을 입력해주세요.");

        return;

    }

    if(name===""){

        alert("이름을 입력해주세요.");

        return;

    }

    if(gender===""){

        alert("성별을 선택해주세요.");

        return;

    }

    alert(
`━━━━━━━━━━━━━━

사원증 발급 완료

회사
${company}

이름
${name}

환영합니다!

━━━━━━━━━━━━━━`
    );

});
});
