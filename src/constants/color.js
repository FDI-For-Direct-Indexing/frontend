// FDI 주요 색깔
const DEEP_BLUE = "#5661F6";
const SKY_BLUE = "#56ECF6";
const BLACK = "#000000";
const GREEN = "#1FD286";

// 컴포넌트에 사용될 지정 색 
// 여기 아래 색깔들을 주로 사용하기!
// (색이 변경될 경우 한꺼번에 변경하기 위함)

// 글자
export const CHAT_SAY = "#5A607F";
export const DESCRIPTION = "#5A607F";

// 배경
export const BACKGROUND = "#F5F5F5";

// 컴포넌트
export const BOX = "#FFFFFF";
export const USER_CHAT = DEEP_BLUE;
export const PROGRESS_ICON = DEEP_BLUE;

// 첫사용자 가이드 팁
export const GUIDE_BOX = "#1E5EFF";
export const GUIDE_NEXT_BUTTON = "#D9E4FF";
export const GUIDE_NEXT_FONT = "#1E5EFF";
export const GUIDE_HIDE_FONT = "#D9E4FF";

// 버튼
export const BASIC_BUTTON = "#FFFFFF";
export const HIGHLIST_BUTTON = DEEP_BLUE;
export const ALART_BUTTON = "#1E5EFF";

export const HEADER_BADGE = "#1E5EFF";
export const CART_EMPTY = "#7E84A3";
export const CART_FULL = "#2678F3";

// 주식 비율 지표
const PROFIT = "#FF7676";
const SAFETY = "#FFDD87";
const GROWTH = "#91D600"
const EFFICIENCY = "#87D4FF";
const SENTIMENT = "#C376FF";

export const INDICATORS = [PROFIT, SAFETY, GROWTH, EFFICIENCY, SENTIMENT];

// 클러스터링 그룹
export const CLUSTER = [
  "#000000",
  "#548CFF",
  "rgba(134, 204, 128, 1)",
  "rgba(255, 165, 0, 1)",
  "#FF85B3",
];

// 주식 상승/하락
export const STOCK_GAIN = "#FF0E0E";
export const STOCK_SINKS = "";

// 종목 섹터 칩
const ENERGY = { color: "#FCD5D9", font: "#F0142F" };                  // 에너지
const MATERIAL = { color: "#FEC9FF", font: "#C700F9" };                // 소재
const INDUSTRIAL = { color: "#E1C9FF", font: "#8B00F9" };              // 산업재
const CONSUMER_DISCRETIONARY = { color: "#E4E4E4", font: "#808080" };  // 자유소비재
const CONSUMER_STAPLES = { color: "#D0FFE0", font: "#05B25F" };        // 필수소비재
const HEALTH = { color: "#C9D1FF", font: "#0019F9" };                  // 건강관리
const FINANCE = { color: "#FFE6C9", font: "#F95A00" };                 // 금융
const SWHW = { color: "#D9E4FF", font: "#1E5EFF" };                    // SW/HW
const SEMICONDUCTOR = { color: "#E6E9F4", font: "#5A607F" };           // 반도체
const COMMUNICATION = { color: "#FFFDD0", font: "#CFBB03" };           // 커뮤니케이션
const UTILITY = { color: "#FFF4C9", font: "#F99600" };                 // 유틸리티
const PROPERTY = { color: "#FFC9C9", font: "#F90000" };                // 부동산

export const colorMapping = {
  "에너지": ENERGY,
  "소재": MATERIAL,
  "산업재": INDUSTRIAL,
  "자유소비재": CONSUMER_DISCRETIONARY,
  "필수소비재": CONSUMER_STAPLES,
  "건강관리": HEALTH,
  "금융": FINANCE,
  "SW/HW": SWHW,
  "반도체": SEMICONDUCTOR,
  "커뮤니케이션": COMMUNICATION,
  "유틸리티": UTILITY,
  "부동산": PROPERTY
};