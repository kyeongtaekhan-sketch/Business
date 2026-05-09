# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

**WildSpark** — 청소년(만 13~19세) 대상 첫 수입 경험 플랫폼 기획 및 목업 사이트 저장소.

핵심 컨셉: 청소년이 재능을 활용해 월 3만 → 5만 → 10만 원의 실제 수입을 만드는 단계별 비즈니스 경험 플랫폼. Peer Effect(친구 수입이 내 동기가 되는 소셜 수입 피드)가 핵심 성장 엔진이다.

---

## 저장소 구조

```
Business/
├── service-planning-wild-imagination.md    # 서비스 기획서 (메인 문서, v3.0)
├── service-planning-wild-imagination.docx  # 기획서 Word 변환본
└── mocksite/                               # 정적 랜딩 페이지 목업
    ├── index.html                          # 단일 페이지 전체 구조
    ├── style.css                           # 모든 스타일 (CSS 변수 기반)
    └── app.js                              # 인터랙션 (빌드 없음, 바닐라 JS)
```

빌드 도구·패키지 매니저·테스트 프레임워크 없음. 목업 사이트는 `index.html`을 브라우저에서 직접 열면 동작한다.

---

## 기획서 핵심 구조 (v3.0)

기획서는 아래 순서로 구성되어 있으며, 섹션 번호가 의사결정 계층을 반영한다.

| 섹션 | 내용 | 변경 시 주의 |
|------|------|-------------|
| §4 수입 구조 설계 | Level 1·2·3 단계별 방법·금액·기간 정의 | 목업 `#levels` 섹션과 동기화 필요 |
| §5 Peer Effect 설계 | 4가지 메커니즘 (가시성·랭킹·팀·투자코인) | 홍보 전략 §A-2·B와 연동 |
| §7 수익 모델 | 거래 수수료 15% + 구독 플랜 4종 (전부 ₩3만 이하) | 목업 `#pricing`과 동기화 필요 |
| §10-1 홍보 전략 | 청소년·부모·학교 3개 대상별 채널 분리 | 대상별 메시지 프레이밍이 다름 |

---

## 목업 사이트 아키텍처

### CSS 설계 원칙

`style.css` 상단 `:root`에 모든 디자인 토큰이 정의되어 있다. 색상·수치 변경은 여기서만 한다.

```css
--primary: #7B61FF      /* 브랜드 메인 */
--accent:  #00C896      /* 강조 (초록) */
--lv1: #34C759          /* Level 1 색상 (초록) */
--lv2: #007AFF          /* Level 2 색상 (파랑) */
--lv3: #FF9500          /* Level 3 색상 (주황) */
```

레벨 색상(`--lv1/2/3`)은 `index.html`의 태그 클래스(`.lv1-tag`, `.lv2-tag`, `.lv3-tag`)와 `style.css`의 카드 배경(`.lv1`, `.lv2`, `.lv3`) 양쪽에 적용되므로, 변경 시 두 곳 모두 확인한다.

### JS 인터랙션 구조

`app.js`는 3가지 역할을 한다.

1. **IntersectionObserver** — `.step`, `.earn-card`, `.level-card` 등에 `.fade-up` 클래스를 부여해 스크롤 등장 애니메이션 처리. 애니메이션 CSS는 런타임에 `<style>` 태그로 주입된다.
2. **countUp()** — 히어로 통계(`.stat-num`) 숫자를 뷰포트 진입 시 카운트업. `isWon` 판별은 `38200` 값의 포함 여부로 하드코딩되어 있으므로, 수치 변경 시 함께 수정한다.
3. **공유 버튼** — `.share-btn` 클릭 시 `navigator.share` 또는 클립보드 복사.

### 반응형 브레이크포인트

- `900px` 이하: 3열 그리드 → 1~2열, 폰 목업 숨김
- `600px` 이하: 단일 열, 히어로 버튼 세로 배치

---

## docx 변환 방법

기획서 `.md`를 수정한 뒤 `.docx`를 재생성할 때는 `python-docx`를 사용한다 (`pandoc` 미설치).

```bash
# python-docx 설치 확인
python3 -c "import docx; print('ok')"

# 변환 스크립트는 이전 대화 세션에서 작성된 인라인 Python으로 실행
# 주요 처리: H1~H4 스타일, 표 헤더 배경, 코드블록 Consolas 폰트, 인용문 이탤릭
```

---

## 브랜치 전략

개발 브랜치: `claude/service-planning-document-r5Sao`

커밋 메시지 패턴 (기존 이력 기준):
- `feat:` 새 기능·섹션 추가
- `docs:` 문서 변환 (docx 등)
