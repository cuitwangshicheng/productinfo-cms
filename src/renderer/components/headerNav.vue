<template>
    <div class="header-nav">
        <router-link class="index-link" to="/">重庆市气象行业项目信息管理系统</router-link>
    </div>
</template>

<script>
  export default {
    name: 'header-nav'
  }
</script>

<style scoped lang="scss">
    .header-nav {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        background-color: #545c64;
        .index-link {
            color: #fff;
            text-decoration: none;
            font-size: 20px;
        }
    }
</style>