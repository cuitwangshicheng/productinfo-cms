<template>
  <div id="app">
    <template v-if="isIndexPage">
      <router-view></router-view>
    </template>
    <template v-else>
      <header-nav></header-nav>
      <div class="app-content">
        <side-bar></side-bar>
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
  import HeaderNav from './components/headerNav'
  import SideBar from './components/sideBar'
  export default {
    name: 'cms',
    components: {
      HeaderNav,
      SideBar
    },
    computed: {
      isIndexPage () {
        if (this.$route.path === '/') {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss">
  .app-content {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 50px;
    padding-left: 180px;
    padding-top: 50px;
  }
</style>
