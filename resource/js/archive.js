const archiveList = document.getElementById('archiveList');
const btnMore = document.getElementById('btnMore');
const STEP = 5;

if (archiveList) {
  fetch('../data/weekly.json')
    .then(res => res.json())
    .then(data => {
      data.weeks
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(w => {
          const li = document.createElement('li');

          li.innerHTML = `
            <a href="../sub/view.html?date=${w.date}">
              <div class="date">${format(w.date)}</div>
              <div class="title">${w.title || ''}</div>
            </a>
          `;

          archiveList.appendChild(li);
        });

      // ✅ 렌더링 끝난 뒤 더보기 초기화
      initMore();
    });
}

function initMore() {
  const items = Array.from(document.querySelectorAll('#archiveList > li'));
  if (!btnMore) return;

  // 5개 이하면 버튼 숨김
  if (items.length <= STEP) {
    btnMore.style.display = 'none';
    return;
  }

  let visibleCount = STEP;

  // 처음엔 5개만
  items.forEach((li, i) => {
    li.style.display = i < visibleCount ? '' : 'none';
  });

  // 버튼 표시
  btnMore.style.display = '';

  btnMore.onclick = () => {
    visibleCount += STEP;

    items.forEach((li, i) => {
      if (i < visibleCount) li.style.display = '';
    });

    // 전부 보이면 버튼 숨김
    if (visibleCount >= items.length) {
      btnMore.style.display = 'none';
    }
  };
}

function format(d) {
  const date = new Date(d);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}
