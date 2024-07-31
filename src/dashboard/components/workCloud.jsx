// import React, { useEffect, useState } from "react";
// import ReactWordCloud from "react-wordcloud";
// import axios from "axios";
// import { API_URL } from "../../common/api";

// export default function WordCloud({ stockName }) {
//   const [relatedKeywords, setRelatedKeywords] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(`${API_URL.LOCAL}/api/associate?keywords=${stockName}`);
//         if (response.data) {
//           const formattedData = response.data.map((keyword) => ({
//             text: keyword.label,
//             value: keyword.frequency,
//           }));
//           setRelatedKeywords(formattedData);
//         }
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     }

//     fetchData();
//   }, [stockName]);

//   const options = {
//     rotations: 2,
//     rotationAngles: [0, -90],
//     fontSizes: [20, 60],
//     padding: 1,
//     scale: "sqrt",
//     fontFamily: "sans-serif",
//     fontStyle: "normal",
//     fontWeight: "bold",
//     transitionDuration: 1000,
//   };

//   const size = [300, 300];

//   return (
//     <div className="wordcloud-container" style={{ width: "300px", height: "300px" }}>
//       <ReactWordCloud words={relatedKeywords} options={options} size={size} />
//     </div>
//   );
// }
