import React from 'react';
import Chip from '@mui/meterial/Chip';

export default function sectorchip({color, fontColor, content}) {
  return (
    <div>
        <Chip label={content} color={color} fontColor={fontColor} />
    </div>
  )
}
