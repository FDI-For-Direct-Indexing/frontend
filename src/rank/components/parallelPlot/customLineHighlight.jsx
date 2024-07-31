import React, { createElement, useCallback, useState } from "react";
import { useTooltip } from "@nivo/tooltip";
import { useSpring, animated } from "@react-spring/web";
import { useAnimatedPath, useMotionConfig } from "@nivo/core";
import { CustomTooltip } from "./customTooltip";

const CustomLineHighlight = ({ computedData, variables, lineGenerator, highlightedGroup }) => {
  const [activeData, setActiveData] = useState(-1);

  return (
    <g key="lines">
      {computedData.map((datum) => (
        <ParallelCoordinatesLine
          key={`${"group" in datum ? datum.group.id : ""}${datum.id}`}
          datum={datum}
          variables={variables}
          lineGenerator={lineGenerator}
          lineWidth={activeData === -1 ? 1.5 : activeData === datum.id ? 5 : 1}
          tooltip={(line) => <CustomTooltip line={line} />}
          opacity={activeData === -1 ? 1 : activeData === datum.id ? 1 : 0.3}
          onMouseEnter={(e) => setActiveData(datum.id)}
          onMouseMove={(e) => setActiveData(datum.id)}
          onMouseLeave={(e) => setActiveData(-1)}
          // 강조된 그룹과 현재 그룹을 비교하여 강조 여부 결정
          highlight={highlightedGroup === null || highlightedGroup === datum.group.id}
        />
      ))}
    </g>
  );
};

export const ParallelCoordinatesLine = ({
  datum,
  variables,
  lineGenerator,
  lineWidth,
  opacity,
  tooltip,
  testIdPrefix,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  highlight,
}) => {
  const { showTooltipFromEvent, hideTooltip } = useTooltip();
  const handleMouseHover = useCallback(
    (event) => {
      showTooltipFromEvent(createElement(tooltip, { datum, variables }), event);
    },
    [showTooltipFromEvent, datum, variables]
  );

  const { animate, config: springConfig } = useMotionConfig();
  const animatedPath = useAnimatedPath(lineGenerator(datum.points));
  const animatedProps = useSpring({
    color: datum.color,
    opacity: highlight ? opacity : 0.1,
    config: springConfig,
    immediate: !animate,
  });

  return (
    <animated.path
      d={animatedPath}
      stroke={animatedProps.color}
      strokeWidth={highlight ? lineWidth : 1}
      strokeLinecap="round"
      opacity={animatedProps.opacity}
      fill="none"
      onMouseEnter={(e) => {
        onMouseEnter(e);
        handleMouseHover(e);
      }}
      onMouseMove={(e) => {
        onMouseMove(e);
        handleMouseHover(e);
      }}
      onMouseLeave={(e) => {
        onMouseLeave(e);
        hideTooltip(e);
      }}
      data-test-id={
        testIdPrefix ? `${testIdPrefix}.line_${datum.id}` : undefined
      }
    />
  );
};

export default CustomLineHighlight;