// import React, { useState, useRef, useContext } from "react";
// import "../../styles/customgraph.css";
// import { WeightContext } from "../../../contexts/weightProvider";
// import { INDICATORS } from "../../../constants/color";

// function CustomGraph({ title }) {
//   const { sliderValues, setSliderValues } = useContext(WeightContext);
//   const [sections, setSections] = useState([
//     { name: "수익성", color: INDICATORS[0], percentage: sliderValues[0] },
//     { name: "안정성", color: INDICATORS[1], percentage: sliderValues[1] },
//     { name: "성장성", color: INDICATORS[2], percentage: sliderValues[2] },
//     { name: "활동성", color: INDICATORS[3], percentage: sliderValues[3] },
//     { name: "감정지수", color: INDICATORS[4], percentage: sliderValues[4] },
//   ]);

//   const graphContainerRef = useRef(null);

//   const handleMouseMove = (event, index) => {
//     event.preventDefault();
//     if (!graphContainerRef.current) {
//       return;
//     }
//     const totalWidth = graphContainerRef.current.offsetWidth;
//     const deltaX =
//       event.clientX - graphContainerRef.current.getBoundingClientRect().left;

//     let sumPercentage = 0;
//     for (let i = 0; i < index; i++) {
//       sumPercentage += sections[i].percentage;
//     }

//     let updatedSections = [...sections];
//     let currentPercentage =
//       Math.round((deltaX / totalWidth) * 100) - sumPercentage;
//     let adjustedPercentage = 0;

//     if (index < updatedSections.length - 1) {
//       const nextIndex = index + 1;
//       const currentTotal =
//         updatedSections[index].percentage +
//         updatedSections[nextIndex].percentage;

//       adjustedPercentage = Math.max(
//         0,
//         Math.min(currentTotal, currentPercentage)
//       );

//       updatedSections[index].percentage = adjustedPercentage;
//       updatedSections[nextIndex].percentage = currentTotal - adjustedPercentage;
//     }

//     const total = updatedSections.reduce(
//       (acc, section) => acc + section.percentage,
//       0
//     );
//     const difference = 100 - total;
//     updatedSections[updatedSections.length - 1].percentage += difference;

//     setSections(updatedSections);
//     // setSliderValues(updatedSections.map((section) => section.percentage));

//     // // 추가된 부분: sliderValues 상태 확인
//     // console.log(
//     //   "Updated Slider Values: ",
//     //   updatedSections.map((section) => section.percentage)
//     // );
//   };

//   const startDrag = (index) => {
//     const moveHandler = (event) => {
//       handleMouseMove(event, index);
//     };

//     const upHandler = () => {
//       window.removeEventListener("mousemove", moveHandler);
//       window.removeEventListener("mouseup", upHandler);
//       setSliderValues(sections.map((section) => section.percentage));
//     };

//     window.addEventListener("mousemove", moveHandler);
//     window.addEventListener("mouseup", upHandler);
//   };

//   return (
//     <div className="main-body">
//       <h3>{title}</h3>
//       <div className="index-info">
//         <div className="index-name">
//           <div className="profit">
//             <div className="profit-color"></div>
//             <p>수익성</p>
//           </div>
//           <div className="stability">
//             <div className="stability-color"></div>
//             <p>안정성</p>
//           </div>
//           <div className="activity">
//             <div className="activity-color"></div>
//             <p>성장성</p>
//           </div>
//           <div className="productivity">
//             <div className="productivity-color"></div>
//             <p>활동성</p>
//           </div>
//           <div className="ogong">
//             <div className="ogong-color"></div>
//             <p>오공 지수</p>
//           </div>
//         </div>
//       </div>
//       <div className="custom-graph" ref={graphContainerRef}>
//         {sections.map((section, index) => (
//           <div
//             key={index}
//             className="custom-graph-section"
//             style={{
//               background: section.color,
//               width: `${section.percentage}%`,
//             }}
//           >
//             {section.percentage.toFixed(0)}%
//             {index < sections.length - 1 && (
//               <div className="handle" onMouseDown={() => startDrag(index)} />
//             )}
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// }

// export default CustomGraph;