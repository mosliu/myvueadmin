<template>
  <div class='chart-container'>
    <chart height='100%' width='100%' :option='option' ></chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/myChart';
// import request from '@/utils/request';
import { option } from '@/views/charts/versionchart';
import { getListByDevice } from '@/api/versions';

// function copy(obj) {
//   // JSON解析之类的其实如果给定格式不对很容易出错滴，自己做好检验~
//   console.log(JSON.stringify(obj));
//   return JSON.parse(JSON.stringify(obj));
// }


/**
 * 计算XY坐标值
*/
function calcXY(itemlist, type) {
  // 计算坐标
  // console.log(data);
  let xcount = -1; // 当前x计数
  let ycount = 0; // 当前y计数
  let yMainV = 0; // 当前主版本记录
  let prevmain = -1; // 之前点的大版本号
  let prevsub = -1; // 之前点的子版本号
  for (let i = 0; i < itemlist.length; i += 1) {
    const e = itemlist[i];
    if (e.Type !== type) {
      // console.log(curr.Type);
      // eslint-disable-next-line
      continue;
    }
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
  }
}

/**
 * 预处理返回的设备版本信息
 * 排序
 * 添加绘图用信息
 */
function parseVersions(itemlist) {
  // 预处理版本信息
  itemlist.forEach((e) => {
    e.v = e.Version;
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
  // 按版本排序
  itemlist = itemlist.sort((a, b) => {
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
  calcXY(itemlist, '电气');
  calcXY(itemlist, '软件');
  calcXY(itemlist, '机械');
  calcXY(itemlist, '资料');
}

/**
 * 构建绘制数据集
 */
function constructDrawData(itemlist, type, Yoffset) {
  const base = [];
  const all = [];
  let currseries = [];
  let premainv;
  let precustv;
  console.log(itemlist.length);
  for (let i = 0; i < itemlist.length; i += 1) {
    // console.log(i);
    const curr = itemlist[i];
    if (curr.Type !== type) {
      // console.log(curr.Type);
      // eslint-disable-next-line
      continue;
    } else {
      curr.y += Yoffset;
    }
    if (curr.custv === 0) {
      // 标准版本
      base.push(curr);
      premainv = curr;
      if (currseries.length !== 0) {
        // 这个是基本版，之前的枝干结束了。
        all.push(currseries);
        currseries = [];
      }
    } else {
      // 定制
      if (currseries.length === 0) {
        // 新的枝干
        currseries.push(premainv);
      } else if (curr.subv !== precustv.subv) {
        // 不是同一个定制枝干
        all.push(currseries);
        currseries = [];
        currseries.push(premainv);
      }
      currseries.push(curr);
      precustv = curr;
    }
  }
  if (currseries.length !== 0) {
    all.push(currseries);
  }

  all.push(base);
  // console.log('final');

  return all;
}


export default {
  name: 'myChart',
  data() {
    return {
      option,
      msg: '',
    };
  },
  components: { Chart },
  mounted() {
    // console.log('mounted');
    /* 流程分为这么几步
      1.从router中获取带入设备编号 （不存在时为undefined）√
      2.通过带入设备编号，获取该编号对应的设备版本信息 √
      3.版本号对坐标轴的映射处理 √
      4.展示，tootip显示信息 √
    */
    /* 后期如果引入其他类型的版本，不光电气，可以如此处理
      1.y坐标+10 +20 +30等
      2.去除y轴
    */
    const routerParams = this.$route.params.dataObj;

    this.getData(routerParams);
    // this.refreshData();
  },
  methods: {
    getData(routerParams) {
      if (typeof (routerParams) === 'undefined') {
        // 不获取？
        console.log('未带入参数');
      } else {
        console.log(`Got Device ID:${routerParams.DeviceId}`);
        option.title.text = routerParams.Devicename;
        getListByDevice({ id: routerParams.DeviceId }).then((response) => {
          // this.list = response.data.items;
          // console.log(response.data);
          this.list = response.data.items;
          parseVersions(this.list);
          console.log(this.list);
          let alldata = [];
          alldata = alldata.concat(constructDrawData(this.list, '电气', 0));
          alldata = alldata.concat(constructDrawData(this.list, '软件', 10));
          alldata = alldata.concat(constructDrawData(this.list, '机械', 20));
          alldata = alldata.concat(constructDrawData(this.list, '资料', 30));
          console.log(alldata);
          const data = [];
          this.option.series = [];
          alldata.forEach((e) => {
            const s = [];
            e.forEach((ele) => {
              s.push([ele.v, ele.x, ele.y, ele]);
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
                  // param = param[0];
                  // console.log(param);
                  return [
                    `版本: ${param.data[3].Version}<br/>`,
                    `作者: ${param.data[3].Author}<br/>`,
                    `时间: ${param.data[3].CreateDate}<br/>`,
                    `类型: ${param.data[3].Type}<br/>`,
                    `描述: ${param.data[3].Content}<br/>`,
                  ].join('');
                },
              },
            };
            t.data = s;
            this.option.series.push(t);
          });
          this.listLoading = false;
        });
      }

      // request({
      //   url: '/device/electric',
      //   method: 'post',
      //   data: {
      //     device: 'czy',
      //   },
      // }).then((response) => {
      //   // console.log(response);
      //   const data = response.data;
      //   // console.log(data);
      //   if (typeof data.versions === 'undefined') {
      //     console.log('no versions in data');
      //   } else {
      //     // console.log(JSON.parse(data.option));
      //     // console.log(JSON.parse(data.versions));
      //   }
      // });
    },
    refreshData() {
      this.option.series.length = 0;
      // this.$refs.childchart.clearchart();

      // const origindata2 = mockdata();
      const origindata2 = [];
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

