import React, { useState, useContext, useEffect } from "react";
import { ParallelCoordinate } from "./parallelCoordinate";
import { PlotContext } from "../../../contexts/plotProvider";

export default function Parallel() {
  const { parallelData } = useContext(PlotContext);
  const [showParallel, setShowParallel] = useState(true);

  useEffect(() => {
    console.log("<< Parallel Data Transformed: ", parallelData);
  }, [parallelData]);

  const handleButtonClick = () => {
    setShowParallel(false);
  };

  return (
    <div className='basicBox'>
      {showParallel && <ParallelCoordinate data={parallelData} />}
    </div>
  )
}
