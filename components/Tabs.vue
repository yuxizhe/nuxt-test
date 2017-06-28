<template>
  <div class="tabs__container">
    <router-link :to="home" class="tabs__item">
      <p class="img home"></p>
      <p>首页</p>
    </router-link>
    <router-link :to="orders" class="tabs__item">
      <p class="img my" ></p>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tabsList',
    data () {
      return {
        home: '/',
        orders: 'orders'
      }
    },
    created () {
      const query = this.$route.query
      if (query.from) {
        this.home = '/?from=' + query.from + '&channel=' + query.channel
        this.orders = 'orders?from=' + query.from + '&channel=' + query.channel
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
.tabs__container{
  position: fixed;
  bottom: 0px;
  height: 50px;
  max-width: 600px;
  width: 100%;
  background: #ffffff;
  display: flex;
  text-align: center;
  box-shadow: 0 0 4px 0 #DADEE5;
  p{
    font-size: 10px;
    line-height: 1rem;
  }
}
.tabs__item{
  flex: 1;
  color: #666666;
  padding: 0.5rem;
  .img{
    height: 1.51rem; 
    margin-bottom: 0.3rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    &.home{
      background-image: url("../assets/home_off@3x.png");
    }
    &.my{
      background-image: url("../assets/my_off@3x.png");
    }
  }
  &.router-link-exact-active{
    color: #3FADC5;
    .img{
      &.home{
        background-image: url("../assets/home_on@3x.png");
      }
      &.my{
        background-image: url("../assets/my_on@3x.png");
      }
    }
  }
}

</style>
