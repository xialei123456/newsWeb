<template>
    <div class="home-page">
      <NewsList :newsList="homeNews"/>
      <SideBar />
    </div>
  </template>
  
  <script>
  import NewsList from './NewsList.vue'
  import SideBar from './SideBar.vue'
  
  export default {
    name: 'HomePage',
    components: {
      NewsList,
      SideBar
    }
  }
  </script>
  
  <script setup>
  import { ref } from 'vue';
  // 假设是新闻资讯列表的props=newsList
  let homeNews = ref([
    {
      id: 1,
      title: '保护环境从垃圾分类做起，16城试点！“年轻不拼命，',
      description: '垃圾分类，自主运营已满8周年，积累了大量的数据和反馈...',
      source: '垃圾分类', pic:'test_1.jpg',
      url: 'https://finance.sina.com.cn/jjxw/2024-08-09/doc-ihchfyg653217.shtml'
    },
    {
      id: 2,
      title: '马斯克再发声，承诺v10 51核安全版本，或支持车队全新智慧战略，',
      description: '围绕新的一场科技革命的导火线：科技革新中的车队新战略...',
      source: '新科技', pic:'test_1.jpg',
      url: 'https://cj.sina.com.cn/articles/view/7295529504/1bd1ca6820012dks?from=finance'
    },
    {
      id: 3,
      title: '三星上市新产品：目10月2日推出！全新核心范畴，',
      description: '8月1日起，各级政策，实行新标准持续深入推进区域经济共同发展，确保12月前启用。',
      source: '科技前沿',pic:'test_1.jpg',
      url: 'https://finance.sina.com.cn/roll/2024-08-12/doc-incipit7862900.shtml'
    },
  ]);
  </script>
  
  <style scoped>
  .home-page {
    display: flex;
    margin: auto;
    justify-content: center; /* 排列路由器view居中显示在页面，App组件使用一个大的框架，所以需要在这里调整位置和样式 */
  }
  </style>
  