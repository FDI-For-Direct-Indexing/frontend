import React, {useRef, useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

export default function DashedChart({highlightGroupIdx}) {
    // const [highlightGroupIdx, setHighlightGroupIdx] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const originalStroke = [5, 7, 5, 7, 7];
    const originalDashArray = [5, 8, 0, 2, 1];

    const sixRates = [
        {
          name: "그룹 1",
          data: [45, 52, 38, 24, 33, 26],
          color: '#FF4560' 
        },
        {
          name: "그룹 2",
          data: [35, 41, 62, 42, 13, 18],
          color: '#008FFB'
        },
        {
          name: '그룹 3',
          data: [87, 57, 74, 99, 75, 38],
          color: '#00E396'
        },
        {
          name: "그룹 4",
          data: [75, 31, 92, 32, 83, 8],
          color: '#775DD0' 
        },
        {
          name: "그룹 5",
          data: [5, 21, 32, 22, 73, 98],
          color: '#546E7A'
        },
    ];

    const getUpdatedSeries = () => {
        if (highlightGroupIdx === null) {
            // 강조가 해제된 상태: 원래 시리즈
            return sixRates.map((series, index) => ({
                ...series,
                color: series.color, // 원래 색상
                strokeWidth: originalStroke[index],
                opacity: 1,
                dashArray: originalDashArray[index]
            }));
        } else {
            return sixRates.map((series, index) => ({
                name: series.name,
                data: series.data,
                color: index === highlightGroupIdx ? series.color : '#CCCCCC',
                strokeWidth: index === highlightGroupIdx ? 8 : originalStroke[index],
                opacity: index === highlightGroupIdx ? 1 : 0.5,
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
          tooltipHoverFormatter: function(val, opts) {
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
          labels: {
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
      <div >
        <div id="chart" ref={chartRef}></div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setHighlightGroupIdx(0)}>그룹 1 강조</button>
            <button onClick={() => setHighlightGroupIdx(1)}>그룹 2 강조</button>
            <button onClick={() => setHighlightGroupIdx(2)}>그룹 3 강조</button>
            <button onClick={() => setHighlightGroupIdx(3)}>그룹 4 강조</button>
            <button onClick={() => setHighlightGroupIdx(4)}>그룹 5 강조</button>
            <button onClick={() => setHighlightGroupIdx(null)}>강조 해제</button>
        </div> */}
      </div>
  )
}
