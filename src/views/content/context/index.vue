<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="4">
        <el-tag>您的身份为：{{ roles[Math.floor(Number(role) / 2)]}}</el-tag>
      </el-col>
      <el-col :span="4">
        <el-button size="medium" @click="dialogAddFormVisible = true" type="primary">新增</el-button>
      </el-col>
      <el-dialog title="新增原创文章" :visible.sync="dialogAddFormVisible" :before-close="handleClose">
        >
        <el-form :model="form">
          <el-form-item label="首页图：" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgurl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="image" :src="image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题：" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发布日期：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.time"
              type="date"
              value-format="yyyy.MM.dd"
              placeholder="选择日期"
            ></el-date-picker>
            <!-- <el-input v-model="form.date"></el-input> -->
            <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="文章链接：" :label-width="formLabelWidth">
            <el-input v-model="form.src" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onSubmitCancel">取 消</el-button>
          <el-button type="primary" @click="onSubmit(0)">提 交</el-button>
        </div>
      </el-dialog>
    </el-row>
    <div class="dashboard-text">线上内容管理-图文管理</div>
    <el-table
      v-loading="false"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{ scope.row.pk }}</template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">{{ scope.row.fields.title}}</template>
      </el-table-column>
      <el-table-column label="首页图" width="200" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.cover_url }}</span> -->
          <img style="width: 100px; height: 100px" :src="scope.row.fields.image" fit="contain" />
          <div class="demo-image"></div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{scope.row.fields.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接" width="250" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.fields.src" target="_blank" >{{ scope.row.fields.src }}</a>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="小程序阅读量" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.cover}}
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operation }}</span>
          <!-- <router-link :to="'/detail/' + scope.row.id"> -->
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="warning"
            size="mini"
            style="width: 100%;height: 100%;display: inline-table;"
            plain
          >修改</el-button>
          <el-dialog
            align="left"
            title="修改原创文章"
            :visible.sync="dialogModifyFormVisible"
            :before-close="handleClose"
          >
            <el-form :model="modifyform">
              <el-form-item label="首页图：" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadImgurl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="image" :src="image" class="avatar" />
                  <img v-else :src="modifyform.image" class="avatar" />
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                </el-upload>
              </el-form-item>
              <el-form-item label="标题：" :label-width="formLabelWidth">
                <el-input v-model="modifyform.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="发布日期：" :label-width="formLabelWidth">
                <el-date-picker
                  value-format="yyyy.MM.dd"
                  v-model="modifyform.time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="文章链接：" :label-width="formLabelWidth">
                <el-input v-model="modifyform.src" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="onSubmitCancel">取 消</el-button>
              <el-button type="primary" @click="onSubmit(1)">提 交</el-button>
            </div>
          </el-dialog>
          <!-- </router-link> -->
          <!-- <router-link to="/"> -->
          <el-button
            type="primary"
            size="mini"
            style="width: 100%;height: 100%;display: inline-table;"
            @click="handleDelete(scope.$index, scope.row)"
            plain
          >删除</el-button>
          <el-dialog
            title="提示"
            :visible.sync="confirmDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>是否确认删除</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="confirmDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ondeletepaper()">确 定</el-button>
            </span>
          </el-dialog>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPagepaper } from "@/api/table";
import { uploadImg } from "@/api/table";
import { setpaper } from "@/api/table";
import { updatepaper } from "@/api/table";
import { deletepaper } from "@/api/table";
export default {
  name: "Dashboard",
  data() {
    return {
      uploadImgurl: "https://xinyujiang.cn/psybot/setpicture/",
      list: [],
      image: "",
      filter_status: [["1"], ["1001", "2003"], ["2002"]],
      roles: ["内容运营", "管理员", "产品运营"],
      dialogAddFormVisible: false,
      dialogModifyFormVisible: false,
      confirmDialogVisible: false,
      form: {
        image: "",
        title: "",
        time: "",
        src: ""
      },
      displayform: {},
      modifyform: {
        image: "",
        title: "",
        time: "",
        src: "",
        id: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters(["name", "token", "role", "username"])
  },
  created() {
    this.fetchData();
    // console.log(this.data.list)
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogModifyFormVisible = true
      //row是该行tableData对应的一行
      this.modifyform = row.fields;
      this.modifyform["id"] = row.pk;
      // console.log(this.modifyform);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      //row是该行tableData对应的一行
      console.log('handledelte')
      this.confirmDialogVisible = true;
      this.modifyform = row.fields;
      this.modifyform["id"] = row.pk;
      // console.log(this.modifyform);
    },

    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       this.ondeletepaper()
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    ondeletepaper(id) {
      console.log(this.modifyform)
      this.confirmDialogVisible = false;
      console.log(this.modifyform.id);
      var params = { id: this.modifyform.id };
      deletepaper(params).then(response => {
        console.log(response);
      });
      location.reload();
    },
    clearupform() {
      this.form.title = "";
      this.form.image = "";
      this.form.src = "";
      this.form.time = "";
      this.modifyform.title = "";
      this.modifyform.image = "";
      this.modifyform.src = "";
      this.modifyform.time = "";
      this.image = "";
    },
    handleClose(done) {
      // this.clearupform();
      location.reload();
      done();
    },
    onSubmit(mode) {
      if (mode) {
        console.log("修改表单");
        var params = JSON.parse(JSON.stringify(this.modifyform));
        console.log(params);
        updatepaper(params).then(response => {
          console.log(response);
        });
      } else {
        console.log("新增表单");
        console.log(this.image);
        console.log(this.form);
        console.log("onsubmit");
        var params = JSON.parse(JSON.stringify(this.form));
        setpaper(params).then(response => {
          console.log(response);
        });
      }
      // this.clearupform();
      location.reload();
      this.dialogAddFormVisible = false;
      this.dialogModifyFormVisible = false;
    },
    onSubmitCancel() {
      this.dialogModifyFormVisible = false;
      this.dialogAddFormVisible = false;
      console.log("onsubmitcancel");
      location.reload();
      // this.clearupform();
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.form.image = res.data;
      this.modifyform.image = res.data;
      this.image = URL.createObjectURL(file.raw);
      console.log(this.image);
    },
    fileRequest(item) {},
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
      // return isJPG && isLt2M;
    },
    fetchData() {
      var index = Math.floor(Number(this.role) / 2);
      console.log("fetching", index, this.filter_status);
      for (var i in this.filter_status[index]) {
        var p = this;
        (function(i, p) {
          var params = {
            pagenumber: 1,
            pagesize: 20
            // size: 40,
            // rstatus: p.filter_status[Math.floor(Number(p.role) / 2)][i]
          };
          getPagepaper(params).then(response => {
            // console.log(response);
            for (var j in response.data.list)
              p.list.push(response.data.list[j]);
            // console.log(p.list)
            // for (var j in p.list) {
            //   p.list[j].author = p.list[j].author.substring(0, 4);
            //   p.list[j].ctime = p.list[j].ctime.substring(0, 10);
            // }
            // p.listLoading = false;
          });
        })(i, p);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
