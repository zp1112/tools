<template>
  <div class="home-wrapper">
    <div class="blur">
      <p>
        <router-link to="/app" class="blur-font" :class="{'active': active}">欢迎来到我的工具箱</router-link>
      </p>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {},
    data() {
      return {
        active: false
      };
    },
    mounted() {
      setTimeout(() => {
        this.active = true;
      }, 500)
    },
    methods: {}
  }
</script>
<style lang="less" type="text/less">
  .home-wrapper{
    height: 100%;
    position: absolute;
    width: 100%;
    background: url('../assets/homebg.jpg') no-repeat;
    background-size: cover;
    .blur{
      display: block;
      position: relative;
      width: 800px;
      overflow: hidden;
      z-index: 1;
      top: 50%;
      margin: -150px auto;
      background: hsla(0,0%,100%,.5) border-box;
      &:hover{
        p>a{
          font-size: 40px;
          color: #17e66c;
        }
      }
      &::before {
        background: url("../assets/homebg.jpg") 0 / cover fixed;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        filter: blur(4px);
        margin: -30px;
      }
      p{
        text-align: center;
        font-size: 30px;
        line-height: 300px;
        a{
          color: #fff;
          transition: all .5s;
        }
      }
    }
  }
</style>
