<template>
  <div class="createPost-container">
    <el-form ref="formA" :model="form" label-width="120px" :rules="formRules">
      <sticky v-if="this.status.edit" :className="'sub-navbar '+form.status">
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消编辑</el-button>
      </sticky>
      <sticky v-else :className="'sub-navbar '+form.status">
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-form-item label="Id" prop="Id" >
          <el-input v-model="form.Id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="LoginName">
          <el-input v-model="form.LoginName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="RealName">
          <el-input v-model="form.RealName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input type="password" v-model="form.Password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="RoleIds">
          <v-select :options="devicesListOptions" @search="onSearch" v-model="form.RoleIds"></v-select>
          <!-- <el-select v-model.number="form.deviceId" placeholder="please select device">
            <el-option label="CZY-6S" value="122"></el-option>
            <el-option label="XLW(PC)" value="132"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="电话" prop="Phone">
          <el-input v-model="form.Phone"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="Email">
          <el-input v-model="form.Email"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="Status">
          <el-radio-group v-model="form.Status">
            <el-radio label="正常" name="Status"></el-radio>
            <el-radio label="封禁" name="Status"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="this.status.edit">
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button @click="onCancel">取消编辑</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="onSubmit">创建</el-button>
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
import { deviceSearch } from '@/api/device';
import { userAdd, userUpdate } from '@/api/users';
// import { debounce } from '@/utils';
import _ from 'lodash';

export default {
  // components: { Tinymce, Sticky, Multiselect, 'v-select': vSelect },
  components: { Tinymce, Sticky, 'v-select': vSelect },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.status.edit) {
        callback();
        return;
      }
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      status: {
        edit: false,
        id: -1,
      },
      form: {
        Id: 0,
        LoginName: '',
        RealName: '',
        Password: '',
        RoleIds: '',
        Phone: '',
        Email: '',
        Status: '正常',
      },
      formRules: {
        LoginName: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
        RealName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        Password: [{
          required: true,
          // message: '密码不能为空',
          trigger: 'blur',
          validator: validatePassword,
        }],
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
        console.log('New User');
        // 置状态位
        this.status.edit = false;
        this.status.id = -1;
      } else {
        // this.$route.meta.title = '更新';
        console.log('Edit User');
        // console.log(dataObj);
        // TODO this.form.deviceId: '',
        this.form = dataObj;
        // this.form.version = dataObj.Version;
        // this.form.createDate = dataObj.CreateDate;
        // this.form.type = dataObj.Type;
        // this.form.content = dataObj.Content;
        // this.form.author = dataObj.Author;
        // getDeviceById(dataObj.DeviceId).then((response) => {
        //   console.log(response);
        //   if (response.code === 20000) {
        //     // console.log('get device:');
        //     // console.log(response.data.item);
        //     this.form.deviceId = response.data.item;
        //     this.form.deviceId.id = response.data.item.Id;
        //     this.form.deviceId.label = response.data.item.Devicename;
        //   } else {
        //     console.log('未获取到应对应的设备');
        //     this.form.deviceId.id = dataObj.DeviceId;
        //     this.form.deviceId.label = '未获取到';
        //   }
        // });

        // 置状态位
        this.status.edit = true;
        // this.formRules.Password.required = false;
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
          if (this.form.Status === '正常') {
            formcopy.Status = 0;
          } else {
            formcopy.Status = -1;
          }
          // formcopy.deviceId = this.form.deviceId.id;
          // this.$message('submiting!');
          let fn;
          if (this.status.edit) {
            formcopy.Id = this.status.id;
            fn = userUpdate;
          } else {
            fn = userAdd;
          }

          fn(formcopy).then((response) => {
            console.log(response);
            // TODO: 跳转失败？   还有打开状态不对
            if (response.code === 20000) {
              this.$message(`提交成功，提交后id为${response.data.version.Id}!`);
              this.$router.push({
                path: '/list',
                name: 'userList',
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
        message: '取消编辑!',
        type: 'warning',
      });
      this.$router.go(-1);
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

