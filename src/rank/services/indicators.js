import axios from "axios";
import { LLM_API } from "../../common/api";

export const getIndicatorsResult = () => {
  return axios
    .get(`${LLM_API.LOCAL}/ai/get-final-response`) // /${userId}
    .then((response) => {
      // console.log(response.data[0]);
      const rates = processValues(response.data[0]);
      // const rates = stringToObject(response.data[0]);
      // console.log(rates);
      return rates;
    })
    .catch((error) => {
      console.error("Error Get Result of LLM :", error);
    });
};

function processValues(inputString) {
  // 기본 키 목록
  const keys = ['수익성', '성장성', '안전성', '활동성', '언급량', '감성지수'];

  // 문자열에서 입력 값을 객체로 변환하는 함수
  function parseStringToObject(str) {
    // 문자열의 대괄호 제거 후, 항목 분리
    const cleanedString = str.slice(1, -1); // Remove '[' and ']'
    const pairs = cleanedString.split(', ');
    const result = {};

    pairs.forEach(pair => {
      const [key, value] = pair.split(' : ');
      result[key] = parseFloat(value);
    });

    return result;
  }

  // 문자열을 객체로 변환
  const values = parseStringToObject(inputString);

  // console.log("객체  변함 ", values);
  // 모든 기본 키에 대해 값이 존재하지 않으면 0으로 설정
  const completeValues = keys.reduce((acc, key) => {
    // console.log(key, ":", values[key], values[key] !== undefined);
    acc[key] = ((values[key] !== undefined) ? values[key] : 0);
    // console.log(key, acc[key]);
    return acc;
  }, {});

  // 각 값을 100배로 변환하여 최종 객체 생성
  const resultObject = Object.fromEntries(
    Object.entries(completeValues).map(([key, value]) => [key, value * 100])
  );

  return resultObject;
}

// function processValues(inputString) {
//   // 기본 키 목록
//   const keys = ['수익성', '성장성', '안전성', '활동성', '언급량', '감정지수'];

//   // 문자열에서 입력 값을 객체로 변환하는 함수
//   function parseStringToObject(str) {
//     // 문자열의 대괄호 제거 후, 항목 분리

//     console.log(str);
//     const cleanedString = str.slice(1, -1); // Remove '[' and ']'
//     console.log(cleanedString);
//     const pairs = cleanedString.split(', ');
//     const result = {};

//     pairs.forEach(pair => {
//       console.log("foreach", pair);
//       const [key, value] = pair.split(': ');
//       result[key] = parseFloat(value);
//     });
//     console.log("result ", result);


//     return result;

//   }

//   const values = parseStringToObject(inputString);

//   keys.forEach(key => {
//     if (!(key in result)) {
//       result[key] = 0;
//     }
//   });

//   console.log("final result", result);

//   // 각 값을 100배로 변환하여 최종 객체 생성
//   const resultObject = Object.fromEntries(
//     Object.entries(completeValues).map(([key, value]) => [key, value * 100])
//   );


//   return resultObject;
// }