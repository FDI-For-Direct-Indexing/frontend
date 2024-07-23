import React from 'react';
import { colorMapping } from '../../constants/color';
import { Chip } from '@mui/material';

export default function SectionChip({content}) {
  const { color, fontColor } = colorMapping[content] || { chip: "#ffffff", font: "#000000" }; // 기본 색상 설정

  return (
    <div>
        <Chip label={content} color={color} fontColor={fontColor} />
    </div>
  )
}
