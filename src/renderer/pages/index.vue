<template>
  <div class="page">
    <div class="title">重庆市气象行业项目信息管理系统</div>
    <div class="content">
      <table border="none" class="menu">
        <tr>
          <td>
            <div class="menu_item add_item" @click="goAddPage">
              <img src="../assets/images/add_icon.png" class="item_image"/>
              <div class="item_name">信息录入</div>
            </div>
          </td>
          <td>
            <div class="menu_item" @click="goSearchPage">
              <img src="../assets/images/search_icon.png" class="item_image"/>
              <div class="item_name">信息检索</div>
            </div>
          </td>
          <td>
            <div class="menu_item">
              <img src="../assets/images/static_icon.png" class="item_image"/>
              <div class="item_name">信息统计</div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="copy_right">CUIT_MOON提供技术支持</div>
  </div>
</template>
<script>
export default {
  name: 'index_page',
  methods: {
    goAddPage () {
      this.$router.push('/add')
    },
    goSearchPage () {
      this.$router.push('/search')
    }
  }
}
</script>
<style lang='scss' scoped>
  .page {
    width:100%;
    height: 100%;
    position:absolute;
    background-image:url('../assets/images/index_bg.jpg');
    background-size:100% 100%;
    background-repeat:no-repeat;
    background-position:left top;
    .title{
      margin-top:10%;
      line-height: 20%;
      font-size:50px;
      width:100%;
      text-align:center;
      color:#fff;
      font-family: '楷书'
    }
    .content{
      width:100%;
      height: 40%;
      //background:red;
      margin-top:7.5%;
      .menu{
        width:1120px;
        text-align: center;
        margin-left:auto;
        margin-right:auto;
        height:100%;
        border:none;
        tr{
          td{
            border:none;
            text-align: center;
            margin-left:auto;
            margin-right:auto;
            .menu_item{
              background:rgba(255,255,255,.9);
              width:260px;
              border-radius:130px;
              height:260px;
              text-align: center;
              margin-left:auto;
              margin-right:auto;
              box-shadow: 0px 0px 10px #fff;
              cursor: pointer;
              &:hover{
                box-shadow: 0px 0px 20px #fefefe;
              }
              .item_image{
                width:100px;
                height:100px;
                margin-top:60px;
              }
              .item_name{
                color:#1097e4;
                font-size:30px;
                margin-top:20px;
              }
            }
          }
        }
      }
    }
    .copy_right{
      text-align: center;
      margin-top:10%;
      color:#fff;
    }
  }
</style>