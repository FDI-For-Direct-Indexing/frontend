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
const GROWTH = "#91D600";
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
const ELECTRIC = { color: "#FCD5D9", font: "#F0142F" }; // 전기전자
const SERVICE = { color: "#FFC9C9", font: "#A33F3F" }; // 서비스업
const OTHER_FINANCE = { color: "#FEC9FF", font: "#C700F9" }; // 기타금융
const CHEMISTRY = { color: "#F6DCFF", font: "#D830F4" }; // 화학
const CONSTRUCTION = { color: "#FFE6C9", font: "#F95A00" }; // 건설업
const TELECOMMUNICATION = { color: "#FFDEAD", font: "#C48100" }; // 통신업
const MEDICINE = { color: "#FFE16D", font: "#F99600" }; // 의약품
const FOOD = { color: "#FFF4C9", font: "#F99600" }; // 음식료품
const MANUFACTURE = { color: "#FFF0A2", font: "#A8A05C" }; // 비금속광물
const OTEHR_MANUFACTURE = { color: "#FFFDD0", font: "#CFBB03" }; // 기타제조업
const CLOTHING = { color: "#D0FFE0", font: "#05B25F" }; // 섬유의복
const TRANSPORTATION = { color: "#41FFD1", font: "#2B7A38" }; // 운수장비
const WAREHOUSING = { color: "#C9F2FF", font: "#03A0B5" }; // 운수창고업
const DISTRIBUTION = { color: "#D9E4FF", font: "#1E5EFF" }; // 유통업
const PRECISION_MEDICINE = { color: "#C9D1FF", font: "#0019F9" }; // 의료정밀
const ELECTRIC_GAS = { color: "#E6E9F4", font: "#5A607F" }; // 전기가스업
const STEEL = { color: "#E1C9FF", font: "#8B00F9" }; // 철강금속
const MACHINE = { color: "#E4E4E4", font: "#808080" }; // 기계

export const colorMapping = {
  전기전자: ELECTRIC,
  서비스업: SERVICE,
  기타금융: OTHER_FINANCE,
  화학: CHEMISTRY,
  건설업: CONSTRUCTION,
  통신업: TELECOMMUNICATION,
  의약품: MEDICINE,
  음식료품: FOOD,
  비금속광물: MANUFACTURE,
  기타제조업: OTEHR_MANUFACTURE,
  섬유의복: CLOTHING,
  운수장비: TRANSPORTATION,
  운수창고업: WAREHOUSING,
  유통업: DISTRIBUTION,
  의료정밀: PRECISION_MEDICINE,
  전기가스업: ELECTRIC_GAS,
  철강금속: STEEL,
  기계: MACHINE,
};
