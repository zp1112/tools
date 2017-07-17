<template>
  <div class="qrcode-wrapper">
    <h1>二维码生成器</h1>
    <div class="input-wrapper">
      <input v-model="text" placeholder="请输入文本或网址" />
      <el-button type="success" @click="genQrCode">生成二维码</el-button>
      <iframe class="iframe" :src="src"></iframe>
    </div>
  </div>
</template>
<script type="text/babel">
  import axios from 'axios';

  export default {
    props: {},
    data() {
      return {
        text: '',
        src: ''
      };
    },
    watch: {
    },
    mounted() {
    },
    methods: {
      async genQrCode() {
        if(this.text) this.src = `http://qr.topscan.com/api.php?text=${encodeURI(this.text)}`;
        else this.src = null;
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .qrcode-wrapper{
    h1{
      margin: 60px auto;
      text-align: center;
    }
    .input-wrapper{
      text-align: center;
      input{
        width: 500px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        padding: 10px;
        border-radius: 9px;
        border: 1px solid #42D885;
        outline: none;
        margin-left: 80px;
      }
      .el-button{
        vertical-align: super;
      }
    }
    .iframe{
      width: 300px;
      height: 300px;
      border: none;
      display: block;
      margin: 70px auto;
    }
  }
</style>
