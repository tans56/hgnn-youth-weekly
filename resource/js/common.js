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