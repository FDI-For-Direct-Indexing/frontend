import React from "react";
import { BasicTooltip, TableTooltip } from "@nivo/tooltip";

export const CustomTooltip = ({ line }) => {
  const { datum, color } = line;

  return (
    <div style={{ padding: '5px', background: 'white', borderRadius: '3px', boxShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <BasicTooltip
          value={line.datum.data.name}
          color={line.datum.color}
          enableChip />
      </div>
      <TableTooltip
        rows={[
          ['수익성', datum.data.수익성],
          ['안정성', datum.data.안정성],
          ['활동성', datum.data.활동성],
          ['생산성', datum.data.생산성],
          ['오공지수', datum.data.오공지수],
        ]}
      />
    </div>
  );
};