<template>
    <div>
      <h1 style="display:flex;">{{ keywords }}搜索结果</h1>
      <!-- 从TableTitle获取labelNews,并作为参数传递给newsList使用 -->
      <NewsList :newsList="keyNews"/>
    </div>
  </template>
  
  <script>
  import NewsList from './NewsList.vue'
  
  export default {
    name: 'SearchPage',
    components: {
      NewsList
    }
  }
  </script>
  
  <script setup>
  import { ref } from 'vue'
  import { onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  let keyNews = ref([]) // 初始化关键字，keyNews将作为SearchNews的标题一部分，显示在搜索结果页的标题处
  
  // 初始化搜索结果数据
  const SearchNews = (keywords) => {
    keyNews = ref([{
      id: 1, 
      title: keywords + '相关新闻', 
      description: '这是一段描述',
      source: '来源标记', 
      pic: 'test_1.jpg',
      url: 'https://finance.sina.com.cn/jjxw/2024-08-09/doc-ihchfyg653217.shtml'
    }])
    console.log(keywords, '已完成搜索')
  }
  

  //定义关键词获取和更新
  let route = useRoute()
  let keywords = route.query.keyword
  
  onMounted(() => {
    console.log('关键词搜索：', keywords)
    SearchNews(keywords)
  })
  
  watch(() => route.query.keyword, 
    (newValue, oldValue) => {
      keywords = newValue // 更新搜索关键字
      console.log(newValue, oldValue)
      SearchNews(newValue) // 执行新的搜索
  }, { immediate: true })
  </script>

  