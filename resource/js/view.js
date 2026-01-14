// URL에서 date 파라미터 가져오기
const params = new URLSearchParams(window.location.search);
const date = params.get("date");

// date가 없으면 목록으로 이동
if (!date) {
  location.href = "./list.html";
}

// JSON 불러오기
fetch("../data/weekly.json")
  .then(res => res.json())
  .then(data => {
    const week = data.weeks.find(w => w.date === date);

    if (!week) {
      alert("해당 날짜의 주보를 찾을 수 없습니다.");
      return;
    }

    /* ===== 상단 ===== */
    document.getElementById("weekDate").textContent = format(date);
    document.getElementById("sermonTitle").textContent = week.title;
    document.getElementById("preacher").textContent = week.preacher;

    /* ===== 말씀 ===== */
    document.getElementById("verseText").innerHTML =
      week.verse.replace(/\n/g, "<br>");
    document.getElementById("verseRef").textContent = week.bible;

    /* ===== 예배 순서 ===== */
    renderOrder(week.order);

    /* ===== 공지 ===== */
    renderNotice(week.notice);

    /* ===== 다음주 ===== */
    renderNext(week.next);
  })
  .catch(err => {
    console.error("JSON 불러오기 실패:", err);
  });


/* =====================
   예배 순서
===================== */
function renderOrder(order) {
  document.querySelectorAll('#orderList .who').forEach(el => {
    const key = el.dataset.key;
    const value = order[key];
    el.textContent = value && value.trim() ? value : '다같이';
  });
}

/* =====================
   공지
===================== */
function renderNotice(notice) {
  const ul = document.getElementById("noticeList");
  ul.innerHTML = "";

  notice.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}

/* =====================
   다음주
===================== */
function renderNext(next) {
  document.getElementById("nextDate").textContent = format(next.date);

  document.querySelectorAll('#nextList .who').forEach(el => {
    const key = el.dataset.key;
    const value = next.members[key];
    el.textContent = value && value.trim() ? value : '-';
  });
}

/* =====================
   날짜 포맷
===================== */
function format(d) {
  const date = new Date(d);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}
