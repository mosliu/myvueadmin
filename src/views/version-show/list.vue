<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading"
      element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.Id}}
        </template>
      </el-table-column>
      <el-table-column label="Devicename" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.Devicename}}
        </template>
      </el-table-column>
      <el-table-column label="Type" width="60" align="center">
        <template slot-scope="scope">
          {{scope.row.Type}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Version" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Version | statusFilter">{{scope.row.Version}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.CreateDate | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Content"  align="center">
        <template slot-scope="scope">
          <p v-html='scope.row.Content'></p>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="90" align="center">
        <template slot-scope="scope">
          {{scope.row.Author}}
        </template>
      </el-table-column>
      <el-table-column label="操作"   align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" circle size="mini" icon="el-icon-edit" @click="editVersion(scope.row)"></el-button>
            <el-button type="success" circle size="mini"  @click="gotoChart(scope.row)">图</el-button>
            <el-button type="danger" circle size="mini" icon="el-icon-delete" @click="deleteOneRecord(scope.$index,scope.row)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, deleteVersion } from '@/api/versions';
import { formatDateUTC } from '@/utils/date';

export default {
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      };
      return statusMap[status];
    },
    formatDate(timestr) {
      return formatDateUTC(timestr, 'yyyy-MM-dd');
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then((response) => {
        this.list = response.data.items;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    editVersion(obj) {
      this.$router.push({
        path: '/new',
        name: 'versionNew',
        params: {
          name: 'name',
          dataObj: obj,
        },
        query: {
          id: obj,
        },
      });
    },
    gotoChart(obj) {
      this.$message(`Device:${obj.Devicename}`);
      this.$router.push({
        path: '/chart',
        name: 'versionChart',
        params: {
          name: 'name',
          dataObj: obj,
        },
        query: {
          id: obj,
        },
      });
    },
    deleteOneRecord(rowid, obj) {
      console.log(obj);
      console.log(`Id:${obj.Id}`);
      this.$confirm('此操作将永久删除该版本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteVersion(obj.Id).then((response) => {
          // console.log(response);
          if (response.code === 20000) {
            this.$message('删除成功!');
            this.list.splice(rowid, 1);
          } else {
            this.$message('提交失败!');
          }
          // if (!response.data.devices) return;
          // vm.devicesListOptions = response.data.devices.map(v => ({
          //   key: v.name,
          // }));
          // vm.devicesListOptions = response.data.devices;
          // console.log(vm.devicesListOptions);
          // this.loading = false;
          // this.$router.push({ path: '/' });
        }).catch(() => {
          // this.loading = false;
        });

        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
};
</script>
