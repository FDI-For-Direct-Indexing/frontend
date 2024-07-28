import React, { useContext } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { BasicTooltip } from "@nivo/tooltip";
import { useBlinkNode } from "../hooks/scatter";
import { PlotContext } from "../../contexts/plotProvider";
import LoadingPage from "../../common/ui/loadingpage";
import { CLUSTER, DESCRIPTION } from "../../constants/color";

export default function Clustering() {
  const { scatterData, loading } = useContext(PlotContext);
  const { setHoveredNode, RenderingNode } = useBlinkNode();
  const colorList = CLUSTER;
  
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className='basicBox' style={{ width: '100%', height: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p style={{ fontSize: '18px', fontFamily: 'SpoqaHanSansNeo-Bold', textWrap: 'inherit', marginBottom: '5px' }}>클러스터링</p>
        <p style={{ color: DESCRIPTION, fontSize: '14px', paddingLeft: '10px', marginBottom: '2px' }}>그룹화된 정보를 확인해보자</p>
      </div>

      <div style={{ padding: '0 30px', height: '270px' }}> 
        <ResponsiveScatterPlot
          data={scatterData}
          margin={{ top: 30, right: 10, bottom: 30, left: 10 }}
          xScale={{ type: "linear", min: 0, max: 100 }}
          xFormat=" >-0,.2f"
          yScale={{ type: "linear", min: 0, max: 100 }}
          yFormat=">-.2f"
          colors={(point) => colorList[point.serieId]}
          blendMode="multiply"
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          // axisBottom={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 46,
            truncateTickAt: 0,
            format: () => '',
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -60,
            truncateTickAt: 0,
          }}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: true,
            precision: 0.01,
            velocity: 0,
          }}
          onMouseEnter={(node) => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          // nodeComponent={RenderingNode}
          tooltip={({ node }) => (
            <BasicTooltip value={node.data.name} color={node.color} enableChip />
          )}
        />
      </div>
    </div>
  )
}
