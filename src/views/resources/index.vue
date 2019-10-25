<template>
  <div class="app-container">
    <dir>资源管理-图文资源</dir>
    <panel-group />
    <el-row :gutter="5">
      <el-col :span="4">
        <span style="font-size:12px">图文来源</span>
        <el-dropdown>
          <el-button type="primary" size="mini">
            壹心理
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" size="mini">
            <el-dropdown-item>简单心理</el-dropdown-item>
            <el-dropdown-item>豆瓣</el-dropdown-item>
            <el-dropdown-item>国壳</el-dropdown-item>
            <el-dropdown-item>525心理网</el-dropdown-item>
            <el-dropdown-item>天天心理</el-dropdown-item>
            <el-dropdown-item>心理学空间</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <div class="block">
          <!-- <span style="font-size:12px">入库时间</span> -->
          <el-date-picker
            v-model="value1"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="5">
        <!-- <span style="font-size:12px">视频id</span> -->
        <el-input size="mini" v-model="videoid" placeholder="请输入视频id"></el-input>
      </el-col>
      <el-col :span="5">
        <!-- <span style="font-size:12px">用户id</span> -->
        <el-input size="mini" v-model="videokeyword" placeholder="请输入视频标题关键字"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="资源ID" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="封面图" width="200" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.cover_url }}</span> -->
          <img style="width: 100px; height: 100px" :src="scope.row.cover" fit="contain" />
          <div class="demo-image"></div>
        </template>
      </el-table-column>
      <el-table-column label="摘要信息">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="图文来源" width="110" align="center">
        <template slot-scope="scope">
          {{ sources[scope.row.source - 0]}}
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="作者ID" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.org_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者名" width="110" align="center">
        <template slot-scope="scope">{{scope.row.author}}</template>
      </el-table-column>
      <el-table-column label="分类" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operation }}</span>
          <router-link :to="'/detail/' + scope.row.id">
            <el-button
              type="warning"
              size="mini"
              style="width: 100%;height: 100%;display: inline-table;"
              plain
            >编辑</el-button>
          </router-link>
          <router-link to="/">
            <el-button
              type="primary"
              size="mini"
              style="width: 100%;height: 100%;display: inline-table;"
              plain
            >删除</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
<script>
// export default {
//   name: 'DashboardAdmin',

//   data() {
//     return {
//       lineChartData: lineChartData.newVisitis
//     }
//   },
//   methods: {
//     handleSetLineChartData(type) {
//       this.lineChartData = lineChartData[type]
//     }
//   }
// }
//
</script>
<script>
import { getList } from "@/api/table";
import { mapGetters } from "vuex";
import PanelGroup from "./components/PanelGroup";
export default {
  name: "ResourceDashboard",
  components: {
    PanelGroup
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      filter_status: [["1"], ["1001", "2003"], ["2002"]],
      videoid: "",
      videokeyword: "",
      value1: "",
      list: [],
      listLoading: true,
      sources: ["", "壹心理"]
    };
  },
  computed: {
    ...mapGetters(["name", "token", "role"])
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var index = Math.floor(Number(this.role)) / 2;
      for (var i in this.filter_status[index]) {  
        var p = this.list
        var index = Math.floor(Number(this.role) / 2)
        var rstatus = this.filter_status[index][i]
        (function(i, rstatus, p) {
          var params = { size: 35, rstatus:  rstatus};
        getList(params).then(response => {
          for(var j in response.data.articles)
            p.push(response.data.articles[j])
          console.log(params);
          console.log(p)
          for (var i in p) {
            p[i].author = p[i].author.substring(0, 4);
            p[i].ctime = p[i].ctime.substring(0, 10);
          }
        });
        })(i, rstatus, p);

      }
    }
  }
};
</script>
