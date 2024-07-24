import React from 'react';
import { colorMapping } from '../../constants/color';
import { Chip } from '@mui/material';

export default function SectionChip({ sector }) {
  // const { color, font } = colorMapping[sector] || { chip: "#000000", font: "#ffffff" }; // 기본 색상 설정
  const { color, font } = { color: colorMapping[sector].chip, font: colorMapping[sector].font } || { chip: "#000000", font: "#ffffff" }; // 기본 색상 설정

  return (
    <div>
      <div style={{ backgroundColor: `${color}`, color: `${font}`, borderRadius: '9px', border: '1px' }}>{sector}</div>
    </div>
  )
}
