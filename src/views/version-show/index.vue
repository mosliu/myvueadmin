<template>
  <div class="createPost-container">
    <el-form ref="formA" :model="form" label-width="120px" :rules="formRules">
      <sticky v-if="this.status.edit" :className="'sub-navbar '+form.status">
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </sticky>
      <sticky v-else :className="'sub-navbar '+form.status">
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-form-item label="设备名" prop="deviceId">
          <v-select :options="devicesListOptions" @search="onSearch" v-model="form.deviceId"></v-select>
          <!-- <el-select v-model.number="form.deviceId" placeholder="please select device">
            <el-option label="CZY-6S" value="122"></el-option>
            <el-option label="XLW(PC)" value="132"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="form.version"></el-input>
        </el-form-item>
        <el-form-item label="作者:" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Pick a date" v-model="form.createDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="版本类型"  prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="电气" name="type"></el-radio>
            <el-radio label="软件" name="type"></el-radio>
            <el-radio label="机械" name="type"></el-radio>
            <el-radio label="资料" name="type"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="版本描述" prop="content">
          <div class="editor-container" >
            <tinymce :height=400 ref="editor" v-model="form.content"></tinymce>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce';
import Sticky from '@/components/Sticky'; // 粘性header组件
import vSelect from 'vue-select';
// import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
// import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
import { deviceSearch, getDeviceById } from '@/api/device';
import { versionAdd } from '@/api/versions';
// import { debounce } from '@/utils';
import _ from 'lodash';

export default {
  // components: { Tinymce, Sticky, Multiselect, 'v-select': vSelect },
  components: { Tinymce, Sticky, 'v-select': vSelect },
  data() {
    // const validateRequire = (rule, value, callback) => {
    //   // console.log('validateRequire invoked');
    //   if (value === '') {
    //     this.$message({
    //       message: `${rule.field}为必传项`,
    //       type: 'error',
    //     });
    //     callback(null);
    //   } else {
    //     callback();
    //   }
    // };
    const validateVersion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('版本号不能为空'));
      } else {
        // eslint-disable-next-line
        let regex = /^v?\d+(\.?\d+)+[^\.]?/gim
        // console.log(value);
        value = value.match(regex);
        value = value === null ? null : value[0];
        // console.log(value);
        if (value === null) {
          callback(new Error('版本号不符合格式'));
          // this.$refs.ruleForm.validateField('checkPass');
        } else {
          // console.log(this.form);
          this.form.version = value;
        }
        callback();
      }
    };
    return {
      status: {
        edit: false,
        id: -1,
      },
      form: {
        deviceId: '',
        version: '',
        createDate: '',
        type: [],
        content: '',
        author: '',
      },
      formRules: {
        deviceId: [{ required: true, message: '设备不能为空', trigger: 'blur' }],
        version: [
          { required: true, validator: validateVersion, trigger: 'blur' },
        ],
        author: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '版本号不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
      },
      devicesListOptions: [],
    };
  },
  mounted() {
    const dataObj = this.$route.params.dataObj;
    this.initByCurr(dataObj);
    console.log(this.status.edit);
    console.log(this.status.id);
  },
  methods: {
    initByCurr(dataObj) {
      if (typeof (dataObj) === 'undefined') {
        // 不获取？
        // this.$route.meta.title = '新建';
        console.log('New Version');
        // 置状态位
        this.status.edit = false;
        this.status.id = -1;
      } else {
        // this.$route.meta.title = '更新';
        console.log('Edit Version');
        // console.log(dataObj);
        // TODO this.form.deviceId: '',
        this.form.version = dataObj.Version;
        this.form.createDate = dataObj.CreateDate;
        this.form.type = dataObj.Type;
        this.form.content = dataObj.Content;
        this.form.author = dataObj.Author;
        getDeviceById(dataObj.DeviceId).then((response) => {
          console.log(response);
          if (response.code === 20000) {
            // console.log('get device:');
            // console.log(response.data.item);
            this.form.deviceId = response.data.item;
            this.form.deviceId.id = response.data.item.Id;
            this.form.deviceId.label = response.data.item.Devicename;
          } else {
            console.log('未获取到应对应的设备');
            this.form.deviceId.id = dataObj.DeviceId;
            this.form.deviceId.label = '未获取到';
          }
        });

        // 置状态位
        this.status.edit = true;
        this.status.id = dataObj.Id;
      }
    },
    onSubmit() {
      // console.log(this.form);

      // eslint-disable-next-line
      this.$refs.formA.validate((valid) => {
        // console.log(valid);
        if (valid) {
          this.loading = true;
          const formcopy = Object.assign({}, this.form);
          formcopy.deviceId = this.form.deviceId.id;
          // formcopy.deviceId = parseInt(formcopy.deviceId);
          // this.$message('submiting!');
          versionAdd(formcopy).then((response) => {
            console.log(response);
            if (response.code === 20000) {
              this.$message(`提交成功，提交后id为${response.data.version.Id}!`);
              this.$router.push({
                path: '/list',
                name: 'versionList',
              });
            } else {
              this.$message(`提交失败，提交后id为${response.data.error}!`);
            }
            // if (!response.data.devices) return;
            // vm.devicesListOptions = response.data.devices.map(v => ({
            //   key: v.name,
            // }));
            // vm.devicesListOptions = response.data.devices;
            // console.log(vm.devicesListOptions);
            this.loading = false;
            // this.$router.push({ path: '/' });
          }).catch(() => {
            this.loading = false;
          });
        } else {
          // eslint-disable-next-line
          console.log('error submit!!');
          return false;
        }
      });
    },
    onCancel() {
      // TODO: 未实装
      this.$message({
        message: 'cancel!',
        type: 'warning',
      });
    },

    onSearch(search, loading) {
      console.log('onSearch');
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce((loading, search, vm) => {
      deviceSearch(search).then((response) => {
        if (!response.data.devices) return;
        // vm.devicesListOptions = response.data.devices.map(v => ({
        //   key: v.name,
        // }));
        // console.log(response.data.devices);
        vm.devicesListOptions = response.data.devices.map(
          e => ({ id: e.Id, label: e.Devicename }),
        );
        // console.log(vm.devicesListOptions);
        loading(false);
      });
      // console.log(vm.devicesListOptions);

      // fetch(
      //   `https://api.github.com/search/repositories?q=${escape(search)}`,
      // ).then((res) => {
      //   // eslint-disable-next-line
      //   res.json().then(json => (vm.devicesListOptions = json.items));
      //   console.log(vm.devicesListOptions);
      //   loading(false);
      // });
    }, 350),

  },
  watch: {

  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.line {
  text-align: center;
}
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>

