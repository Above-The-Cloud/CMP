<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">token: {{ token }}</div>
    <div class="dashboard-text">role: {{ roles[Math.floor(Number(role) / 2)]}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      roles: ["内容运营", "管理员", "产品运营"]
    };
  },
  computed: {
    ...mapGetters(["name", "token", "role", "avatar"])
  },
  created() {
    
  }
};
</script>

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
