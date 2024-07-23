import { Chip } from '@mui/material';
import React from 'react';

export default function sectorchip({color, fontColor, content}) {
  return (
    <div>
        <Chip label={content} color={color} fontColor={fontColor} />
    </div>
  )
}
