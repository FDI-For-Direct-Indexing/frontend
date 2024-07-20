import axios from "axios";
import {API_URL} from "";

export const fetchCompanies = async () => {
    try {
        const response = await axios.get(
        `${API_URL.LOCAL}/api/corporates/list`
        );
        const weightData = response.data;
        setData(weightData);
        const sortedData = rankSort(sliderValues, weightData);
        setData(sortedData);
        setSortedData(sortedData); // sortedData 설정

        const svg = d3
        .select(svgRef.current)
        .attr("width", 750)
        .attr("height", weightData.length * 50 + 50); // 데이터 길이에 따라 높이 조정
        // 군집 색상 바로;

        if (data != undefined && data.length > 0) {
        matchColor().then((d) => {
            console.log(d);
            setData(d);
            update(data, svg, ...sliderValues, "group1");
        });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};