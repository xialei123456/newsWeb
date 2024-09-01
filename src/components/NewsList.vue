<template>
    <div class="news-list">
      <NewsItem 
        v-for="news in newsList" 
        :key="news.id" 
        :news="news" 
      />
    </div>
</template>
  
<script>
import NewsItem from './NewsItem.vue'
  
export default {
  name: 'NewsList',
  components: {
    NewsItem
  },
  props:{
    newsList: Object
  }
}
</script>
  <style scoped>
  .news-list {
    padding: 20px;
  }
  </style>
  