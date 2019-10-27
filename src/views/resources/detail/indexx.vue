<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-tag>你好 {{username}} 您的身份为：{{ roles[role_index]}}</el-tag>
        <h3>标题：{{detail.desc}}</h3>
        <el-row>
          <div class="header">
            <el-col :span="3">
              <div size="mini">资源id: {{detail.id}}</div>
            </el-col>
            <el-col :span="4">
              <div>来源: {{source[detail.source]}}</div>
            </el-col>
            <el-col :span="5">
              <div>发布者: AAAA</div>
            </el-col>
            <el-col :span="5">
              <div>初始分类: {{detail.category1}}</div>
            </el-col>
            <el-col :span="7">
              <div>入库时间:{{detail.ctime}}</div>
            </el-col>
          </div>
        </el-row>
        <div class="blog-content">
          <div class="dialog-h5" v-html="detail.text"></div>
        </div>
        <!-- <br>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde deleniti ratione doloremque pariatur! Ad provident deleniti soluta vitae atque eligendi delectus placeat, maxime nisi laboriosam corrupti cumque assumenda laudantium ut!
    <br>
    <img src='https://ossimg.xinli001.com/20191010/9e1292451707af2e26a634934a8140e3.jpeg!120x120'>
    <br>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima minus, expedita earum odit ab quam distinctio. Non error delectus nostrum explicabo nam harum omnis quod nesciunt eum, corporis sequi illo.
        <br><br>-->
        <el-row :gutter="20">
          <el-col :span="6" v-for="opr in operations[role_index]" :key="opr">
            <el-button
              @click="post_form(opr)"
              type="primary"
              style="width: 100%;height: 100%;display: inline-table;"
            >{{opr}}</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div v-if="role_index==2" style="margin-top: 0px">
          <el-button type="text">*话题：</el-button>
          <el-input v-model="topic" :value="topic" style="width: 150px" placeholder="请输入话题"></el-input>
          <!-- <el-checkbox-group v-model="topic_list">
          </el-checkbox-group>-->
        </div>
        <!-- <div style="margin-top: 20px"><el-button type="text" >*一级分类</el-button>
  <el-checkbox-group v-model="first_category_list">
    <el-checkbox border label="科普"></el-checkbox>
    <el-checkbox border label="生活"></el-checkbox>
    <el-checkbox border label="职场"></el-checkbox>
    <el-checkbox border label="教育"></el-checkbox>
    <el-checkbox border label="文化"></el-checkbox>
  </el-checkbox-group>
        </div>-->
        <div v-if="role_index==0" style="margin-top: 40px">
          <el-button type="text">*一级分类</el-button>
          <div>
            <el-radio
              border
              v-model="first_category"
              v-for="(type,i) in category_1"
              :key="type"
              :label="type"
              @change="(value) => checkin_first_category(i)"
            >{{type}}</el-radio>
          </div>
          <!-- <el-checkbox-group  v-model="first_category_list">
  <el-checkbox border v-for="type in category_1"  :key="type" :label="type" @change="(value) => checkin_first_category(type)">{{type}}</el-checkbox>
          </el-checkbox-group>-->
        </div>
        <div v-if="category_index <= 4" style="margin-top: 40px">
          <el-button type="text">*二级分类</el-button>
          <div>
            <el-radio
              border
              v-model="second_category"
              v-for="(type,i) in category_2[category_index]"
              :key="type"
              :label="i"
            >{{type}}</el-radio>
          </div>

        </div>
        <div v-if="role_index==2" style="margin-top: 40px">
          <el-button type="text">*内容分级</el-button>
          <div>
            <el-radio
              border
              v-model="class_list"
              v-for="type in classes"
              :key="type"
              :label="type"
            >{{type}}</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getDetail, getCategory, postMsg } from "@/api/detail";
import { Base64 } from "js-base64";
import { cpus } from "os";
export default {
  name: "Dashboard",
  data() {
    return {
      category_1: [],
      roles: ["内容运营", "管理员", "产品运营"],
      source: ["", "壹心理"],
      classes: ["普通", "推荐", "不推荐"],
      operations: [
        ["提交审核", "删除"],
        ["上架", "驳回"],
        ["下架", "修改话题"]
      ],
      category_index: 5,
      role_index: 0,
      category_2: [[], [], [], [], [], []],
      topic_list: [],
      topic: "",
      first_category: "",
      second_category: "",
      class_list: "",
      detail: {}
    };
  },
  computed: {
    ...mapGetters(["name", "token", "role", "username"])
  },
  created() {
    this.fetchDetail();
    this.role_index = Math.floor(Number(this.role) / 2);
  },
  methods: {
    fetchDetail() {
      getCategory().then(response => {
        for (var i in response.data.categories) {
          this.category_1.push(response.data.categories[i].name);
          var p = this.category_2;
          (function(i, p) {
            var params = { sub: 1, father_id: Number(i) + 1 };
            getCategory(params).then(response => {
              for (var j in response.data.categories) {
                p[i].push(response.data.categories[j].name);
              }
            });
          })(i, p);
        }
      });
      this.listLoading = true;
      var params = { id: this.$route.params.resid };
      getDetail(params).then(response => {
        this.detail = response.data.articles[0];
        this.detail.ctime = this.detail.ctime.substring(0, 10);
        this.detail.text = Base64.decode(this.detail.text);
        // console.log(this.detail)
        this.listLoading = false;
      });
    },
    checkin_first_category(itemName) {
      console.log(itemName);
      this.category_index = itemName
    },
    post_form(event) {
      console.log(event);
      switch (event) {
        case "提交审核": {
          console.log("提交审核");
          const params = {
            username: this.username,
            contentid: this.$route.params.resid,
            action: 1001,
            category1: this.category_index,
            category2: this.second_category
          };
          console.log(params);
          postMsg(params).then(response => {
            console.log(response);
          });
          break;
        }
        case "删除": {
          console.log("删除");
          const params = {
            username: this.username,
            contentid: this.$route.params.resid,
            action: 1002
          };
          console.log(params);
          postMsg(params).then(response => {
            console.log(response);
          });
        }
        case "上架": {
          console.log("上架");
          const params = {
            username: this.username,
            contentid: this.$route.params.resid,
            action: 2002
          };
          console.log(params);
          postMsg(params).then(response => {
            console.log(response);
          });
          break;
        }
        case "驳回": {
          console.log("驳回");
          const params = {
            username: this.username,
            contentid: this.$route.params.resid,
            action: 2003
          };
          console.log(params);
          postMsg(params).then(response => {
            console.log(response);
          });
          break;
        }
        case "下架": {
          console.log("下架");
          const params = {
            username: this.username,
            contentid: this.$route.params.resid,
            action: 3001
          };
          console.log(params);
          postMsg(params).then(response => {
            console.log(response);
          });
          break;
        }
        case "修改话题": {
          console.log("修改话题");
          const params = {
            username: this.username,
            contentid: this.$route.params.resid,
            action: 3001
          };
          console.log(params);
          postMsg(params).then(response => {
            console.log(response);
          });
          break;
        }
      }
      // console.log("topic", this.topic);
      // console.log("first_category", this.first_category);
      // console.log("second_category", this.second_category);
      // console.log("class_list", this.class_list);
    }
  }
};
</script>
<style>
.header {
  color: #909399;
  font-size: 13px;
}
.blog-content {
  overflow-y: auto;
  overflow-x: hidden;
  color: black;
  font-size: 12px;
}
.dialog-h5 >>> img,
p,
span {
  width: 100%;
  height: 100%;
}
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
</style>
<style lang="scss" scoped>
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
