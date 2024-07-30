import React, { useState, useContext, useEffect } from "react";
import { ParallelCoordinate } from "./parallelCoordinate";
import { PlotContext } from "../../../contexts/plotProvider";

export default function Parallel() {
  const { parallelData } = useContext(PlotContext);
  const [showParallel, setShowParallel] = useState(true);

  return (
    <div className='basicBox'>
      {showParallel && <ParallelCoordinate data={parallelData} />}
    </div>
  )
}
