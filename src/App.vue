<template>
  <!--顶部组件-->
  <HeaderItem /> <!--头部-->

  <div class="content"> <!--内容-->
    <!-- <NewsList /> -->
    <!-- <Sidebar /> -->
    <router-view> </router-view> <!--使用路由的渲染组件-->
  </div>

</template>

<script>
import HeaderItem from './components/HeaderItem.vue' //导入头部组件

export default {
  name: 'App',
  components: {
    HeaderItem, //注册组件
  }
}
</script>

<style>
.content {
  /* display: flex; */ /* 使router-view中div显示为行，不是flex */
  margin: auto; /* 实现页面居中 */
  /* justify-content: space-between; */ /* 使路由view居右为一个整体元素 */
  width: 98%;
  max-width: 1080px;
}
</style>