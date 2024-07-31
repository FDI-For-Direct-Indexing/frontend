import React, { useState } from "react";
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";
import { CLUSTER } from "../../../constants/color";
import { CustomTooltip } from "./customTooltip";
import CustomLineHighlight from "./customLineHighlight";

const handleLegendClick = (legend, highlightedGroup, setHighlightedGroup) => {
  if (highlightedGroup === legend.data.id) {
    setHighlightedGroup(null); // 강조된 상태라면 해제
  } else {
    setHighlightedGroup(legend.data.id); // 강조되지 않은 상태라면 강조
  }
};

export const ParallelCoordinate = ({ data }) => {
  const [highlightedGroup, setHighlightedGroup] = useState(null);

  return (
    data && (
      <ResponsiveParallelCoordinates
        isInteractive
        data={data}
        variables={[
          {
            group: 0, id: "수익성", value: "수익성", ticksPosition: "after",
            legendPosition: "start", legendOffset: 30, min: 0, max: 100,
          },
          {
            group: 1, id: "안정성", value: "안정성", ticksPosition: "after",
            legendPosition: "start", legendOffset: -10, min: 0, max: 100,
          },
          {
            group: 2, id: "활동성", value: "활동성", ticksPosition: "after",
            legendPosition: "start", legendOffset: -10, min: 0, max: 100,
          },
          {
            group: 3, id: "생산성", value: "생산성", ticksPosition: "after",
            legendPosition: "start", legendOffset: -10, min: 0, max: 100,
          },
          {
            group: 4, id: "오공지수", value: "오공지수", ticksPosition: "after",
            legendPosition: "start", legendOffset: -10, min: 0, max: 100,
          },
        ]}
        groupBy="group"
        margin={{ top: 5, right: 25, bottom: 23, left: 0 }}
        curve="linear"
        colors={CLUSTER}
        colorBy="group"
        lineWidth={3}
        lineOpacity={0.5}
        pixelRatio={1.25}
        layers={[
          "axes",
          "legends",
          (props) => (
            <CustomLineHighlight
              {...props}
              highlightedGroup={highlightedGroup}
            />
          ),
          "mesh",
          "annotations",
        ]}
        tooltip={(line) => <CustomTooltip line={line} />}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 29,
            translateY: 36,
            itemsSpacing: 2,
            itemWidth: 68,
            itemHeight: 40,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 13,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                  itemTextColor: "#000",
                },
              },
            ],
            itemTextColor: "#999",
            symbolShape: "circle",
            onClick: (legend) =>
              handleLegendClick(legend, highlightedGroup, setHighlightedGroup),
          },
        ]}
      />
    )
  );
};
