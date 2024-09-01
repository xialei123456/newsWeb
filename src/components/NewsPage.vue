<template>
    <div class="news-page">
      <h1>{{ news.title }}</h1> <!-- 新闻标题展示 -->
      <p>{{ news.content }}</p> <!-- 新闻内容显示 -->
    
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  // 获取路由信息并解析
  const route = useRoute()
  
  // 定义响应式对象来存储新闻内容
  const news = ref({ title: '', content: '' }) // 初始状态为空的新闻对象
  
  // 获取新闻详细信息的函数
  const fetchNewsDetails = (id) => {
    const mockNewsData = {
      1: { title: 'News 1', content: 'Content for News 1' },
      2: { title: 'News 2', content: 'Content for News 2' },
      3: { title: 'News 3', content: 'Content for News 3' }
    }
    return mockNewsData[id] || { title: 'Not Found', content: 'No content available.' }
  }
  
  // 组件挂载时获取新闻信息
  onMounted(() => {
    const newsId = route.params.id
    news.value = fetchNewsDetails(newsId)
  })
  
  // 返回按钮功能
  // const goBack = () => {
  //   router.push('/') // 返回应用的首页或新闻列表页
  // }
  </script>
  
  <style scoped>
  .news-page {
    display: absolute;
    margin: auto; /* 页中页居中布局 */
    padding: 20px; /* 添加内边距以提升可读性 */
    align-items: center;
  }
  
  .news-page button {
    margin: auto;
    padding: 2px 4px;
    background-color: #1a7e38;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .news-page button:hover {
    background-color: #0c5bbf;
  }
  </style>
  