import React, { useContext } from 'react'
import Clustering from './clustering'
import DashedChart from './parallelPlot/dashedChart'
import { PlotContext } from '../../contexts/plotProvider';
import { Skeleton } from '@mui/material';

export default function Plots({ highlightGroupIdx }) {
  const { loading } = useContext(PlotContext);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <Skeleton variant="rounded" animation="wave" width="100%" height='400px' style={{ marginBottom: '20px', backgroundColor: 'white' }} />
        <Skeleton variant="rounded" animation="wave" width="100%" height='400px' style={{ backgroundColor: 'white' }} />
      </div>
    );
  }

  return (
    <div>
      <Clustering />
      <DashedChart highlightGroupIdx={highlightGroupIdx} />
    </div>
  )
}
