<!--整个路由容器-->
<template>
  <div class="app-wrapper">
    <img src="../assets/bg.jpg" v-show="init === '/app'"/>
    <img src="../assets/qrcodebg.jpg" v-show="init === '/qrcode'"/>
    <img src="../assets/kuaidibg.jpg" v-show="init === '/kuaidi'"/>
    <img src="../assets/bingbg.jpg" v-show="init === '/bing'"/>
    <div class="tab-wrapper" :class="{'center': init === '/app'}">
      <router-link to="/qrcode">二维码生成</router-link>
      <router-link to="/kuaidi">快递单号查询</router-link>
      <router-link to="/bing">bing壁纸</router-link>
      <router-link to="/">首页</router-link>
    </div>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/babel">

  export default{
    name: 'App',
    data() {
      return {
        init: true
      }
    },
    mounted() {
      this.init = this.$route.path;
    },
    beforeRouteUpdate (to, from, next) {
      this.init = to.path;
      next();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .app-wrapper{
    display: table;
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    img{
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .tab-wrapper{
      transition: all 1s;
      display: block;
      top: 60px;
      width: 100%;
      text-align: center;
      position: absolute;
      .router-link-exact-active{
        background: #29c686;
      }
      &.center{
        top: 40%;
        a{
          color: #fff;
        }
      }
      a{
        display: inline-block;
        padding: 10px 20px;
        font-size: 20px;
        color: #8c0505;
        border: 1px solid #29c686;
        &:hover{
          background: #29c686;
          color: #fff;
        }
      }
    }
    .content-wrapper{
      position: absolute;
      width: 100%;
      margin-top: 100px;
    }
  }
</style>
