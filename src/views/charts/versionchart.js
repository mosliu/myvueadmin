// const origindata = [
// { v: '1.0.0', d: 'no1', mainv: 1, subv: 0, custv: 0, x: 1, y: 0 },
// { v: '1.1.0', d: '版本1', mainv: 1, subv: 1, custv: 0, x: 2, y: 1 },
// { v: '1.1.3', d: '版本1 定制3', mainv: 1, subv: 1, custv: 3, x: 2, y: 2 },
// { v: '1.17.2', d: 'no1', mainv: 1, subv: 17, custv: 2, x: 3, y: 2 },
// { v: '1.2.0', d: 'no1', mainv: 1, subv: 2, custv: 0, x: 4, y: 1 },
// { v: '1.3.5', d: 'no1', mainv: 1, subv: 3, custv: 5, x: 5, y: 2 },
// { v: '1.4.0', d: 'no1', mainv: 1, subv: 4, custv: 0, x: 6, y: 1 },
// { v: '1.5.0', d: 'no1', mainv: 1, subv: 5, custv: 0, x: 7, y: 1 },
// { v: '1.5.1', d: 'no1', mainv: 1, subv: 5, custv: 1, x: 7, y: 2 },
// { v: '1.5.2', d: 'no1', mainv: 1, subv: 5, custv: 2, x: 7, y: 3 },
// { v: '1.5.4', d: 'no1', mainv: 1, subv: 5, custv: 4, x: 7, y: 4 },
// { v: '2.0.0', d: 'no1', mainv: 2, subv: 0, custv: 0, x: 8, y: 0 },
// { v: '2.1.01', d: 'no1', mainv: 2, subv: 1, custv: 1, x: 9, y: 2 },
// { v: '2.1.02', d: 'no1', mainv: 2, subv: 1, custv: 2, x: 9, y: 2 },
// { v: '2.1.300083',
//   d: 'no1',
//   mainv: 2,
//   subv: 1,
//   custv: 300083,
//   x: 9,
//   y: 3 },
// { v: '2.2.30008',
//   d: 'no1',
//   mainv: 2,
//   subv: 2,
//   custv: 30008,
//   x: 10,
//   y: 2 },
// { v: '2.2.430008',
//   d: 'no1',
//   mainv: 2,
//   subv: 2,
//   custv: 430008,
//   x: 10,
//   y: 2 },
// { v: '3.0.0', d: 'no1', mainv: 3, subv: 0, custv: 0, x: 11, y: 0 },
// { v: '4.2.43000328',
//   d: 'no1',
//   mainv: 4,
//   subv: 2,
//   custv: 43000328,
//   x: 12,
//   y: 1 },
// { v: '6.0.0', d: 'no1', mainv: 6, subv: 0, custv: 0, x: 13, y: 0 }];

// const origindata2 = [
//   [
//     { v: '1.1.0', d: '版本1', mainv: 1, subv: 1, custv: 0, x: 2, y: 1 },
//     { v: '1.1.3', d: '版本1 定制3', mainv: 1, subv: 1, custv: 3, x: 2, y: 2 },
//     { v: '1.17.2', d: 'no1', mainv: 1, subv: 17, custv: 2, x: 3, y: 2 },
//   ],
//   [
//     { v: '1.2.0', d: 'no1', mainv: 1, subv: 2, custv: 0, x: 4, y: 1 },
//     { v: '1.3.5', d: 'no1', mainv: 1, subv: 3, custv: 5, x: 5, y: 2 },
//   ],
//   [
//     { v: '1.5.0', d: 'no1', mainv: 1, subv: 5, custv: 0, x: 7, y: 1 },
//     { v: '1.5.1', d: 'no1', mainv: 1, subv: 5, custv: 1, x: 7, y: 2 },
//     { v: '1.5.2', d: 'no1', mainv: 1, subv: 5, custv: 2, x: 7, y: 3 },
//     { v: '1.5.4', d: 'no1', mainv: 1, subv: 5, custv: 4, x: 7, y: 4 },
//   ],
//   [
//     { v: '2.0.0', d: 'no1', mainv: 2, subv: 0, custv: 0, x: 8, y: 0 },
//     { v: '2.1.01', d: 'no1', mainv: 2, subv: 1, custv: 1, x: 9, y: 2 },
//     { v: '2.1.02', d: 'no1', mainv: 2, subv: 1, custv: 2, x: 9, y: 2 },
//     { v: '2.1.300083',
//       d: 'no1',
//       mainv: 2,
//       subv: 1,
//       custv: 300083,
//       x: 9,
//       y: 3 },
//     { v: '2.2.30008',
//       d: 'no1',
//       mainv: 2,
//       subv: 2,
//       custv: 30008,
//       x: 10,
//       y: 2 },
//     { v: '2.2.430008',
//       d: 'no1',
//       mainv: 2,
//       subv: 2,
//       custv: 430008,
//       x: 10,
//       y: 2 },
//   ],
//   [
//     { v: '1.0.0', d: 'no1', mainv: 1, subv: 0, custv: 0, x: 1, y: 0 },
//     { v: '1.1.0', d: '版本1', mainv: 1, subv: 1, custv: 0, x: 2, y: 1 },
//     { v: '1.2.0', d: 'no1', mainv: 1, subv: 2, custv: 0, x: 4, y: 1 },
//     { v: '1.4.0', d: 'no1', mainv: 1, subv: 4, custv: 0, x: 6, y: 1 },
//     { v: '1.5.0', d: 'no1', mainv: 1, subv: 5, custv: 0, x: 7, y: 1 },
//     { v: '2.0.0', d: 'no1', mainv: 2, subv: 0, custv: 0, x: 8, y: 0 },
//     { v: '3.0.0', d: 'no1', mainv: 3, subv: 0, custv: 0, x: 11, y: 0 },
//     { v: '4.2.43000328',
//       d: 'no1',
//       mainv: 4,
//       subv: 2,
//       custv: 43000328,
//       x: 12,
//       y: 1 },
//     { v: '6.0.0', d: 'no1', mainv: 6, subv: 0, custv: 0, x: 13, y: 0 },
//   ],
// ];

// const data = [];
// origindata2.forEach(
//   (e) => {
//     const s = [];
//     e.forEach((ele) => { s.push([ele.v, ele.x, ele.y]); });
//     data.push(s);
//     console.log(s);
//     // console.log(data);
//   },

// );
// console.log(data);
// const data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];


const symbolSize = 20;
// eslint-disable-next-line
export const option = {
  // backgroundColor: '#394056',
  title: {
    text: '版本信息',
    x: '20',
    top: '20',
    textStyle: {
      fontWeight: 'normal',
      color: '#F1F1F3',
      fontSize: '22',
    },
    subtextStyle: {
      color: '#90979c',
      fontSize: '16',
    },
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      textStyle: {
        color: '#fff',
      },
    },
  },
  grid: {
    borderWidth: 0,
    top: 110,
    bottom: 95,
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    // x: '5%',
    // top: '10%',
    // textStyle: {
    //   color: '#90979c',
    // },
    // data: [],
    // formatter(params) {
    //   return `X: ${params.data[0].toFixed(2)}<br>Y: ${params.data[1].toFixed(2)}`;
    // },
  },
  calculable: true,
  xAxis: [{
    min: -1,
    // max: 120,
    type: 'value',
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#90979c',
      },
    },
  }],
  yAxis: [{
    min: -1,
    // max: 20,
    type: 'value',
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#90979c',
      },
    },
  }],
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'empty',
      handleStyle: {
        color: '#d3dee5',
      },
      textStyle: {
        color: '#fff',
      },
      borderColor: '#90979c',
    },
    {
      type: 'slider',
      yAxisIndex: 0,
      filterMode: 'empty',
      handleStyle: {
        color: '#d3dee5',
      },
      textStyle: {
        color: '#fff',
      },
      borderColor: '#90979c',
    },
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'empty',
    },
    {
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'empty',
    },
  ],
  series: [{
    // id: 'a',
    type: 'line',
    smooth: true,
    symbolSize,
    // data: [['1.1.0', 2, 1], ['1.1.3', 2, 2], ['1.17.2', 3, 2]],
    encode: {
      x: [1], // 表示维度 3、1、5 映射到 x 轴。
      y: 2, // 表示维度 2 映射到 y 轴。
      tooltip: [0], // 表示维度 3、2、4 会在 tooltip 中显示。
    },
    tooltip: {
      formatter(param) {
        console.log(param);
        // param = param[0];
        return [
          `Open: ${param.data[0]}<br/>`,
          `Close: ${param.data[1]}<br/>`,
          `Lowest: ${param.data[2]}<br/>`,
        ].join('');
      },
    },
  }],
};


// eslint-disable-next-line
export const option_old = {
  backgroundColor: '#344b58',
  title: {
    text: 'statistics',
    x: '20',
    top: '20',
    textStyle: {
      color: '#fff',
      fontSize: '22',
    },
    subtextStyle: {
      color: '#90979c',
      fontSize: '16',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      textStyle: {
        color: '#fff',
      },
    },
  },
  grid: {
    borderWidth: 0,
    top: 110,
    bottom: 95,
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    x: '5%',
    top: '10%',
    textStyle: {
      color: '#90979c',
    },
    data: ['female', 'male', 'average'],
  },
  calculable: true,
  xAxis: [{
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#90979c',
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitArea: {
      show: false,
    },
    axisLabel: {
      interval: 0,
    },
    data: [
      '1month', '2month', '3month',
      '4month', '5month', '6month',
      '7month', '8month', '9month',
      '10month', '11month', '12month',
    ],
  }],
  yAxis: [{
    type: 'value',
    splitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#90979c',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 0,
    },
    splitArea: {
      show: false,
    },
  }],
  dataZoom: [{
    show: true,
    height: 30,
    xAxisIndex: [0],
    bottom: 30,
    start: 10,
    end: 80,
    // eslint-disable-next-line
    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '110%',
    handleStyle: {
      color: '#d3dee5',
    },
    textStyle: {
      color: '#fff',
    },
    borderColor: '#90979c',

  }, {
    type: 'inside',
    show: true,
    height: 15,
    start: 1,
    end: 35,
  }],
  series: [],
};
