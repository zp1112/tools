<template>
  <div class="kuaidi-wrapper">
    <h1>全国快递单号查询</h1>
    <div class="list-wrapper">
      <ul>
        <li v-for="item in classes" :key="item.value" @click="name = item.value" :class="{'active': item.value ===
        name}">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="info-wrapper">
      <div class="input-wrapper">
        <input placeholder="请输入物流号" v-model="mailNum"/>
        <el-button type="success" @click="checkInfo">查询物流</el-button>
      </div>
      <div class="info">
        <Timeline>
          <TimelineItem v-for="item in infos">
            <span slot="time">{{item.date}}</span>
            <span slot="des">{{item.desc}}</span>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import axios from 'axios';
  import Timeline from '../commons/timeline.vue';
  import TimelineItem from '../commons/timelineItem.vue';

  export default {
    props: {},
    components: { Timeline, TimelineItem },
    data() {
      return {
        infos: [],
        name: '',
        mailNum: '',
        classes: [
          { name: '申通', value: 'shentong' },
          { name: 'EMS', value: 'ems' },
          { name: '顺丰', value: 'shunfeng' },
          { name: '圆通', value: 'yuantong' },
          { name: '中通', value: 'zhongtong' },
          { name: '如风达', value: 'rufengda' },
          { name: '韵达', value: 'yunda' },
          { name: '天天', value: 'tiantian' },
          { name: '百世', value: 'huitongkuaidi' },
          { name: '全峰', value: 'quanfengkuaidi' },
          { name: '德邦', value: 'debangwuliu' },
          { name: '宅急送', value: 'zhaijisong' }
        ]
      };
    },
    mounted() {
    },
    methods: {
      async checkInfo() {
        const result = await
          axios.get(`/kuaidi?type=${this.name}&postid=${this.mailNum}`);
        const data = result.data.data;
        for(const item of data) {
          this.infos.push({
            date: item.time,
            desc: item.context
          })
        }
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .kuaidi-wrapper{
    h1{
      margin: 60px auto;
      text-align: center;
      color: #fff;
    }
    .list-wrapper{
      ul{
        overflow: hidden;
        padding: 0 100px 36px;
        li{
          float: left;
          padding: 10px 30px;
          margin: 10px;
          font-size: 20px;
          color: #fff;
          background: #4e1f1f;
          cursor: pointer;
          border-radius: 10px;
          &:hover{
            background: #42D885;
          }
          &.active{
            background: #42D885;
          }
        }
      }
    }
    .info-wrapper{
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
        }
        .el-button{
          vertical-align: super;
        }
      }
      .info{
        width: 600px;
        margin: 20px auto;
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        background: rgba(255,255,255,.6);
        padding: 20px 60px;
        border-radius: 10px;
      }
    }
  }
</style>
