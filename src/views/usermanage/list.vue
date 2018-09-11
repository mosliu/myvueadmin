<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="45">
        <template slot-scope="scope">
          {{scope.row.Id}}
        </template>
      </el-table-column>
      <el-table-column label="LoginName" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.LoginName}}
        </template>
      </el-table-column>
      <el-table-column label="RealName" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.RealName}}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="60" align="center">
        <template slot-scope="scope">
          {{scope.row.Status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="LastIp" width="130" align="center">
        <template slot-scope="scope">
          <el-tag >{{scope.row.LastIp}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="LastLogin" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.LastLogin | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Phone" align="center">
        <template slot-scope="scope">
          <p v-html='scope.row.Phone'></p>
        </template>
      </el-table-column>
      <el-table-column label="Email" align="center">
        <template slot-scope="scope">
          <p v-html='scope.row.Email'></p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" circle size="mini" icon="el-icon-edit" @click="editVersion(scope.row)"></el-button>
            <el-button type="danger" circle size="mini" icon="el-icon-delete" @click="deleteOneRecord(scope.$index,scope.row)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getList, deleteUser } from '@/api/users';
import { formatDateUTC } from '@/utils/date';

export default {
  components: { },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        form: {},
      },
      form: {
        deviceId: '',
      },
      devicesListOptions: [],
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '正常',
        '-1': '封禁',
      };
      return statusMap[status];
    },
    formatDate(timestr) {
      return formatDateUTC(timestr, 'yy-MM-dd');
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
        this.total = response.data.total;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    },
    editVersion(obj) {
      this.$router.push({
        path: '/new',
        name: 'userNew',
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
        deleteUser(obj.Id).then((response) => {
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
