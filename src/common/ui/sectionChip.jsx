import React from 'react';
import { colorMapping } from '../../constants/color';

export default function SectionChip({ sector }) {
  const { color, font } = colorMapping[sector] || { chip: "#000000", font: "#ffffff" }; // 기본 색상 설정

  return (
    <div style={{ width: 'fit-content', backgroundColor: `${color}`, color: `${font}`, borderRadius: '9px', padding: '0 5px', textAlign: 'center' }}>{sector}</div>
  )
}
