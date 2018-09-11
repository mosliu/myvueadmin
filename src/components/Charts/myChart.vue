<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts';
import resize from './mixins/resize';
// // 引入基本模板
// const echarts = require('echarts/lib/echarts');
// // 引入柱状图组件
// require('echarts/lib/chart/bar');
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    id: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '200px',
    },
    height: {
      type: String,
      default: '200px',
    },
    option: {
      type: Object,
      // Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
      // 使用闭包保证一个vue实例拥有自己的一份props
      default() {
        return {

        };
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    // style() {
    //   return {
    //     height: this.height,
    //     width: this.width,
    //   };
    // },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    // 观察option的变化
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            console.log('new option');
            this.chart.setOption(newVal);
          } else {
            console.log('old option');
            this.chart.setOption(oldVal);
          }
        } else {
          this.init();
        }
      },
      deep: true, // 对象内部属性的监听，关键。
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      // console.log(this.title);
      // console.log(this.option.title);
      this.chart.setOption(this.option);
    },
  },
};
</script>
