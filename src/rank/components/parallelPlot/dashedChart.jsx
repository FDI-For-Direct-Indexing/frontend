import React, { useRef, useEffect, useContext } from 'react';
import ApexCharts from 'apexcharts';
import { CLUSTER, DESCRIPTION } from "../../../constants/color";
import { PlotContext } from "../../../contexts/plotProvider";

export default function DashedChart({ highlightGroupIdx }) {
  const { parallelData } = useContext(PlotContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const colorList = CLUSTER;
  const originalStroke = [5, 5, 5, 5, 5];
  const originalDashArray = [0, 0, 0, 0, 0];

  const getUpdatedSeries = () => {
    if (highlightGroupIdx === null) {
      // 강조가 해제된 상태: 원래 시리즈
      return parallelData.map((series, index) => ({
        ...series,
        name: `그룹 ${index + 1}`,
        color: colorList[index], // 원래 색상
        strokeWidth: originalStroke[index],
        opacity: 1,
        dashArray: originalDashArray[index]
      }));
    } else {
      console.log("체크", highlightGroupIdx);
      return parallelData.map((series, index) => ({
        name: `그룹 ${index + 1}`,
        data: series.data,
        color: highlightGroupIdx.includes(index) ? colorList[index] : '#CCCCCC',
        strokeWidth: highlightGroupIdx.includes(index) ? 6 : originalStroke[index],
        opacity: highlightGroupIdx.includes(index) ? 1 : 0.5,
        dashArray: originalDashArray[index]
      }));
    }
  };


  useEffect(() => {
    const options = {
      series: getUpdatedSeries(),
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        animations: {
          enabled: false,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        id: 'chart'
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px',
          fontFamily: 'SpoqaHanSansNeo-Regular',
        }
      },
      stroke: {
        width: originalStroke, // [5, 7, 5, 7, 7],
        curve: 'straight',
        dashArray: originalDashArray // [5, 8, 0, 2, 1]
      },
      // title: {
      //   text: 'Page Statistics',
      //   align: 'left'
      // },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return val + ' : <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        },
        fontFamily: 'SpoqaHanSansNeo-Bold',
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['수익성', '안정성', '활동성', '성장성', '언급량', '감정지수'],
        labels: {
          style: {
            fontFamily: 'SpoqaHanSansNeo-Bold',
            fontSize: '12px',
          }
        },
        title: {
          style: {
            fontFamily: 'SpoqaHanSansNeo-Bold',
            fontSize: '14px',
          }
        }
      },
      yaxis: {
        min: 0, // y축 최소값 설정
        max: 100, // y축 최대값 설정
        labels: {
          formatter: function (val) {
            return Math.round(val);
          },
          style: {
            fontFamily: 'SpoqaHanSansNeo-Bold' // Y축 라벨 폰트 설정
          }
        },
        title: {
          style: {
            fontFamily: 'SpoqaHanSansNeo-Bold' // Y축 제목 폰트 설정
          }
        }
      },
      tooltip: {
        style: {
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
        y: [
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    };

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();


    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      const updatedSeries = getUpdatedSeries();
      chartInstance.current.updateOptions({
        series: updatedSeries,
        stroke: {
          width: updatedSeries.map(series => series.strokeWidth),
          dashArray: updatedSeries.map(series => series.dashArray)
        },
        colors: updatedSeries.map(series => series.color),
        plotOptions: {
          bar: {
            borderRadius: [highlightGroupIdx !== null ? 0 : 2] // 강조 시 테두리 설정
          }
        }
      }, true);
    }
  }, [highlightGroupIdx]);

  return (
    <div className='basicBox' style={{ marginTop: '20px', minHeight: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p style={{ fontSize: '18px', fontFamily: 'SpoqaHanSansNeo-Bold', textWrap: 'inherit', marginBottom: '5px' }}>평행 그래프</p>
        <p style={{ color: DESCRIPTION, fontSize: '14px', paddingLeft: '10px', marginBottom: '2px' }}>그룹의 평균 값을 확인해보자</p>
      </div>
      <div id="chart" ref={chartRef} style={{ margin: 'auto' }}></div>
    </div>
  )
}
