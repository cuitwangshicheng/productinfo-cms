<template>
    <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            :router="true">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>项目管理</span>
            </template>
            <el-menu-item index="/project">
                <i class="el-icon-document"></i>
                <span slot="title">项目信息</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    computed: {
      defaultActive () {
        return `/${this.$route.path.split('/')[1]}`
      }
    }
  }
</script>

<style scoped lang="scss">
    .el-menu-vertical-demo {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        width: 180px;
        .el-submenu .el-menu-item {
            min-width: 180px;
        }
    }
</style>