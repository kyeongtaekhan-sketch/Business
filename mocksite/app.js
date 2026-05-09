// NAV 스크롤 효과
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.08)'
    : 'none';
});

// 섹션 등장 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.step, .earn-card, .level-card, .testi-card, .ff-item, .plan'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// 숫자 카운트업 (히어로 통계)
function countUp(el, target, suffix = '') {
  const isWon = String(target).includes('38');
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    if (isWon) {
      el.textContent = '₩' + Math.floor(start).toLocaleString();
    } else {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = document.querySelectorAll('.stat-num');
      countUp(nums[0], 2400, '명');
      countUp(nums[1], 38200, '');
      countUp(nums[2], 1200, '개교');
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// 피드 탭 전환
document.querySelectorAll('.feed-tab').forEach((tab, idx) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// 수입 달성 공유 버튼
const shareBtn = document.querySelector('.share-btn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    const msg = '나 이번 달 WildSpark에서 처음으로 3만 원 벌었어! 🎉\n#나의첫수입 #WildSpark3만원';
    if (navigator.share) {
      navigator.share({ text: msg });
    } else {
      navigator.clipboard.writeText(msg);
      alert('공유 텍스트가 클립보드에 복사됐어요!');
    }
  });
}

// CSS: fade-up 애니메이션 주입
const style = document.createElement('style');
style.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .step:nth-child(1)  { transition-delay: 0.05s; }
  .step:nth-child(3)  { transition-delay: 0.15s; }
  .step:nth-child(5)  { transition-delay: 0.25s; }
  .step:nth-child(7)  { transition-delay: 0.35s; }
  .earn-card:nth-child(2) { transition-delay: 0.08s; }
  .earn-card:nth-child(3) { transition-delay: 0.16s; }
  .earn-card:nth-child(4) { transition-delay: 0.08s; }
  .earn-card:nth-child(5) { transition-delay: 0.16s; }
  .earn-card:nth-child(6) { transition-delay: 0.24s; }
  .level-card:nth-child(2) { transition-delay: 0.12s; }
  .level-card:nth-child(3) { transition-delay: 0.24s; }
  .plan:nth-child(2) { transition-delay: 0.08s; }
  .plan:nth-child(3) { transition-delay: 0.16s; }
  .plan:nth-child(4) { transition-delay: 0.24s; }
`;
document.head.appendChild(style);
