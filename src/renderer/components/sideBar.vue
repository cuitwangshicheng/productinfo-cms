<template>
    <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            :router="true">
        <el-menu-item index="/add">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">项目录入</span>
        </el-menu-item>
        <el-menu-item index="/search">
            <i class="el-icon-document"></i>
            <span slot="title">项目检索/导入/导出</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    computed: {
      defaultActive () {
        return this.$route.path
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
    }
</style>