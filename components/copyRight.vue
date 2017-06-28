<template>
  <div class="copyright">
    <p class='info'>雪球保险产品由雪球和小雨伞合作出售</p>
    <img src="https://xqimg.imedao.com/15ccf7657b5c63feb7f23b56.png">
    <p v-if="env == 'inWeixin'">更多服务请关注公共号：
      <a @click="explain = 1">雪球保</a>
      <img src="https://xqimg.imedao.com/15caae4f08f6203fb1c1e45e.png"></img>
    </p>
    <p v-else>联系我们：<a href="https://xueqiu.com/3748823499">@雪球保险</a></p>
    <div v-if="explain" id="overlay">
      <div class="explain__content">
        <h2>关注公共号 保障更方便</h2>
        <img src="https://xqimg.imedao.com/15caae4f08f6203fb1c1e45e.png"></img>
        <p>长按识别二维码即可关注</p>
        <a href="javascript:;" class="btn btn_close" @click="explain = 0">关闭</a>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'copyRight',
    data () {
      return {
        explain: 0,
        env: ''
      }
    },
    mounted () {
      if (this.$route.query.subscribe === '0') {
        this.explain = 1
      }
      // 环境判断
      if (navigator.userAgent.match(/MicroMessenger/i)) {
        this.env = 'inWeixin'
      }
    }
  }
</script>

<style scoped lang='scss'>
  .copyright {
    text-align: center;
    padding: 2rem 0;
    font-size: 0.93rem;
    color: #151515;
    background-color: rgb(243,245,247);
    margin-bottom: 50px;
  }
  .copyright img {
    width: 231px;
    margin: 1rem 0 0.7rem 0;
  }
  .copyright p {
    font-size: 0.93rem;
    color: #151515;
  }
  .copyright p.info:before{
    display: inline-block;
    position: relative;
    top:-4px;
    right: 10px;
    content: "";
    width: 20px;
    height: 0px;
    border-bottom: 1px solid #aaa;
  }
  .copyright p.info:after{
    display: inline-block;
    position: relative;
    top:-4px;
    left: 10px;
    content: "";
    width: 20px;
    height: 0px;
    border-bottom: 1px solid #aaa;
  }
    #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background-color: rgba(0,0,0,0.5); /*dim the background*/
  }
  .explain__content{
    position: relative;
    width: 25rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    border-radius: .2rem;
    padding-top: 2.1rem;
    padding-bottom: 2.5rem;
    h2{
      font-size: 1.6rem;
      color: #3c3c3c;
    }
    img{
      margin: auto;
    }
    p{
      font-size: 1rem;
      color: #646464;
      width: 80%;
      text-align: center;
      margin: 1.5rem auto;
    }
    .btn{
      font-size: 1.2rem;
    }
  }
</style>
