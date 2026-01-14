
fetch('./data/weekly.json')
  .then(res => res.json())
  .then(data => {
    const weeks = data.weeks;

    // 날짜 내림차순 (최신 → 과거)
    weeks.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 항상 최신 주보 표시
    const current = weeks[0];

    renderMain(current);
  });

function format(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function renderMain(w) {
  // 상단
  document.getElementById('weekDate').textContent = format(w.date);
  document.getElementById('sermonTitle').textContent = w.title;
  document.getElementById('preacher').textContent = w.preacher;

  // 말씀
  document.getElementById('verseText').innerHTML =
    w.verse.replace(/\n/g, '<br>');
  document.getElementById('verseRef').textContent = w.bible;

  // 예배 순서
  renderOrder(w.order);

  // 공지
  renderNotice(w.notice);

  // 다음주
  renderNext(w.next);
}

function renderOrder(order) {
  document.querySelectorAll('#orderList .who').forEach(el => {
    const key = el.dataset.key;
    const value = order[key];

    el.textContent = value && value.trim() ? value : '다같이';
  });
}


function renderNotice(notice) {
  const ul = document.getElementById('noticeList');
  ul.innerHTML = '';

  notice.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  });
}

function renderNext(next) {
  document.getElementById('nextDate').textContent = format(next.date);

  document.querySelectorAll('#nextList .who').forEach(el => {
    const key = el.dataset.key;
    const value = next.members[key];

    el.textContent = value && value.trim() ? value : '-';
  });
}


document.addEventListener('DOMContentLoaded', function () {

  /* =====================
     링크 복사 버튼
  ===================== */
  const copyBtn = document.querySelector('.copyText');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const text = this.dataset.copy || window.location.href;

      navigator.clipboard.writeText(text).then(() => {
        this.classList.add('copied');
        this.innerText = '주소가 복사되었습니다';

        setTimeout(() => {
          this.innerText = '온라인 주보 주소 복사하기';
          this.classList.remove('copied');
        }, 1500);
      });
    });
  }

  /* =====================
     맨 위로 버튼
  ===================== */
  const toTop = document.getElementById('toTop');

  if (toTop) {
    // 처음엔 숨김
    toTop.style.display = 'none';

    window.addEventListener('scroll', function () {
      if (window.scrollY > 200) {
        toTop.style.display = 'flex';
      } else {
        toTop.style.display = 'none';
      }
    });

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
