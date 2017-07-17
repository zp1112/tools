<template>
  <div class="bing-wrapper">
    <h1>bing每日壁纸</h1>
    <div class="content-wrapper">
      <input v-model="picNums" placeholder="请输入获取图片数量"/>
      <input v-model="dayBefore" placeholder="请输入想要获取几天前的图片"/>
    </div>
    <div class="button-wrapper">
      <el-button type="success" @click="genBingPics">获取图片</el-button>
    </div>
    <div class="img-wrapper" v-show="show" v-loading="loading">
      <i class="icon icon-close" @click="show = false"></i>
      <el-carousel :interval="4000" type="card" height="450px">
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item" v-if="item"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script type="text/babel">
  import axios from 'axios';

  export default {
    props: {},
    data() {
      return {
        loading: false,
        picNums: '',
        dayBefore: '',
        images: [],
        show: false
      };
    },
    mounted() {
    },
    methods: {
      async genBingPics() {
        this.show = true;
        this.loading = true;
        this.images = [];
        const result = await axios.get(`/bing?format=js&idx=${this.dayBefore}&n=${this.picNums}&mkt=zh-CN`);
        const images = result.data ? result.data.images : [];
        for (const item of images) {
          const url = 'https://www.bing.com';
          this.images.push(`${url}${item.url}`)
        }
        if (!this.images.length) this.show = false;
        this.loading = false;
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .bing-wrapper{
    h1{
      margin: 60px auto;
      text-align: center;
    }
    .content-wrapper{
      text-align: center;
      margin: 0 auto;
      input{
        width: 300px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        padding: 10px;
        border-radius: 9px;
        border: 1px solid #42D885;
        outline: none;
        margin: 0 40px;
      }
      .el-button{
        vertical-align: super;
      }
    }
    .button-wrapper{
      width: 100%;
      text-align: center;
      margin: 120px auto 20px;
    }
    .img-wrapper{
      background: rgba(255,255,255, .3);
      padding: 60px 0;
      position: fixed!important;
      left: 0;
      top: 160px;
      width: 100%;
      .icon-close{
        display: inline-block;
        position: absolute;
        right: 50px;
        top: 30px;
        font-size: 30px;
        cursor: pointer;
      }
      .el-carousel__arrow{
        width: 80px;
        height: 80px;
        background-color: rgba(31,45,61,.5);
        font-size: 30px;
      }
    }
  }
</style>
