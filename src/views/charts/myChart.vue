<template>
  <div class='chart-container'>
    <chart height='100%' width='100%' :option='option' ></chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/myChart';
import request from '@/utils/request';
import { option } from '@/views/charts/versionchart';

// function copy(obj) {
//   // JSON解析之类的其实如果给定格式不对很容易出错滴，自己做好检验~
//   console.log(JSON.stringify(obj));
//   return JSON.parse(JSON.stringify(obj));
// }

function mockdata() {
  let data = [
    { v: 'v1.0', d: 'no1' },
    { v: 'v1.1.3', d: '版本1 定制3' },
    { v: 'v1.1.0', d: '版本1' },
    { v: 'V1.3.5', d: 'no1' },
    { v: 'v1.4.0', d: 'no1' },
    { v: 'v3', d: 'no1' },
    { v: '3.6.7', d: 'no1' },
    { v: '3.6.0', d: 'no1' },
    { v: '6', d: 'no1' },
    { v: 'v1.2.0', d: 'no1' },
    { v: 'ver1.5.1', d: 'no1' },
    { v: 'v1.5.0', d: 'no1' },
    { v: 'v1.5.2', d: 'no1' },
    { v: 'v1.17.2', d: 'no1' },
    { v: 'v1.5.4', d: 'no1' },
    { v: 'v2.0.0', d: 'no1' },
    { v: 'v2.1.0.1', d: 'no1' },
    { v: 'v2.1.0.2beta', d: 'no1' },
    { v: 'v2.1.3.8(3)', d: 'no1' },
    { v: 'v2.2.3.8', d: 'no1' },
    { v: 'v2.2.43.8', d: 'no1' },
    { v: 'v4.2.43.328', d: 'no1' },
  ];
  data.forEach((e) => {
    // eslint-disable-next-line
    e.v = e.v.replace(/[^\.\d]/g, '');

    let v = e.v.split('.');
    // console.log(v)
    switch (v.length) {
      case 1:
        e.v = `${v[0]}.0.0`;
        break;
      case 2:
        e.v = `${v[0]}.${v[1]}.0`;
        break;
      case 3:
        // 格式正确，do nothing
        break;
      case 4:
        e.v = `${v[0]}.${v[1]}.${v[2] * 1000}${v[3]}`;
        break;
      default:
        console.log('error');
    }
    v = e.v.split('.');
    e.mainv = parseInt(v[0]);
    e.subv = parseInt(v[1]);
    e.custv = parseInt(v[2]);
  });
  data = data.sort((a, b) => {
    if (a.mainv === b.mainv) {
      // 主版本相同，判断子版本
      if (a.subv === b.subv) {
      // 子版本相同，判断定制版本
        if (a.custv === b.custv) {
          return 0;
        } else if (a.custv > b.custv) {
          return 1;
        }
        return -1;
      } else if (a.subv > b.subv) {
        return 1;
      }
      return -1;
    } else if (a.mainv > b.mainv) {
      return 1;
    }
    return -1;
  });
  console.log(data);
  let xcount = -1; // 当前x计数
  let ycount = 0; // 当前y计数
  let yMainV = 0; // 当前主版本记录
  let prevmain = -1; // 之前点的大版本号
  let prevsub = -1; // 之前点的子版本号
  for (let i = 0; i < data.length; i += 1) {
    const e = data[i];
    if (prevmain === e.mainv) {
      // 已存在大版本
      // xcount++;
      if (prevsub === e.subv) {
        // 已存在子版本
        // 重复or定制
        ycount += 1;
      } else {
        // 新子版本
        prevsub = e.subv;
        xcount += 1;
        ycount = yMainV;
      }
    } else {
      // console.log(e.mainv);
      // 新大版本。
      yMainV += 1;// 每次大版本，基础值爬升1
      xcount += 1;
      ycount = yMainV;
      // ycount = 0;
      prevmain = e.mainv;
      prevsub = -1;
      // 新的大版本
    }

    e.x = xcount;
    e.y = ycount;
    if (e.custv !== 0) {
      e.y += 2;
    }
    // if (e.custv !== 0 && ycount === 0) {
    //   e.y += 1;
    // }
    // if (e.custv !== 0 && ycount === 1) {
    //   e.y += 1;
    // }
  }
  // data.forEach((e) => {console.log(e.v+":"+e.x+','+e.y)})
  // console.log(data)

  const base = [];
  const all = [];
  let currseries = [];
  let premainv;
  let precustv;
  for (let i = 0; i < data.length; i += 1) {
    console.log(i);
    const curr = data[i];
    if (curr.custv === 0) {
      base.push(curr);
      premainv = curr;
      if (currseries.length !== 0) {
        all.push(currseries);
        currseries = [];
      }
    } else {
      // 定制
      if (currseries.length === 0) {
        currseries.push(premainv);
      } else if (curr.subv !== precustv.subv) {
        all.push(currseries);
        currseries = [];
        currseries.push(premainv);
      }
      currseries.push(curr);
      precustv = curr;
    }
  }
  all.push(base);
  console.log('final');

  return all;
}

export default {
  name: 'myChart',
  data() {
    return {
      option,
    };
  },
  components: { Chart },
  mounted() {
    console.log('mounted');
    this.getData();
    this.refreshData();
  },
  methods: {
    getData() {
      request({
        url: '/device/electric',
        method: 'post',
        data: {
          device: 'czy',
        },
      }).then((response) => {
        // console.log(response);
        const data = response.data;
        // console.log(data);
        if (typeof data.versions === 'undefined') {
          console.log('no versions in data');
        } else {
          // console.log(JSON.parse(data.option));
          // console.log(JSON.parse(data.versions));
        }
      });
    },
    refreshData() {
      this.option.series.length = 0;
      // this.$refs.childchart.clearchart();

      const origindata2 = mockdata();
      console.log(origindata2);
      const data = [];
      origindata2.forEach((e) => {
        const s = [];
        e.forEach((ele) => {
          s.push([ele.v, ele.x, ele.y]);
        });
        let symbol;
        // console.log(e[0]);
        if (e.length > 1 && e[1].custv === 0) {
          symbol = 'circle';
        } else {
          // symbol = 'emptyCircle';
          symbol = 'diamond';
        }
        data.push(s);
        // console.log(s);
        // console.log(data);
        const t = {
          // id: 'a',
          type: 'line',
          smooth: false,
          symbol,
          symbolSize: 20,
          // data: [['1.1.0', 2, 1], ['1.1.3', 2, 2], ['1.17.2', 3, 2]],
          encode: {
            x: [1], // 表示维度 3、1、5 映射到 x 轴。
            y: 2, // 表示维度 2 映射到 y 轴。
            tooltip: [0], // 表示维度 3、2、4 会在 tooltip 中显示。
          },
          tooltip: {
            formatter(param) {
              // console.log(param);
              // param = param[0];
              return [
                `版本: ${param.data[0]}<br/>`,
                `信息: ${param.data[1]}<br/>`,
                `Lowest: ${param.data[2]}<br/>`,
              ].join('');
            },
          },
        };
        t.data = s;
        this.option.series.push(t);
      });
      // this.option = this.option;
      // console.log('set whole option');

      // this.option.series.push()
      // this.option = {
      //   series: {
      //     data: data[0],
      //   },
      //   // dataset: {
      //   //   source: data,
      //   // },
      // };
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}
</style>

