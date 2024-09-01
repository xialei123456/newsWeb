<template>
  <div class="news-item">
    <div class="content">
      <h2 @click="navigateToNews(news.id)">{{ news.title }}</h2> <!--新闻标题-->
      <p>{{ news.description }}</p> <!--新闻摘要-->
      <div style="display:flex;justify-content: space-between;align-items: center;">
        <small>{{ news.source }}</small>
        <v-btn @click="changeStar(collected, news)" variant="plain" :ripple="false"> <!--收藏按钮-->
          <v-icon v-if="collected.state==0" color="info">mdi-star-outline</v-icon>
          <v-icon v-if="collected.state==1" color="red">mdi-star</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="pic">
      <img v-if="news.pic" :src="require(`@/assets/${news.pic}`)" alt="新闻图片" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
}
</script>

<script setup>
import { reactive, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'

let collected = reactive({
  state: 1
})

const props = defineProps({
  news: Object
})

onMounted(() => {
  getCollectSat(props.news)
})

const getCollectSat = (news) => {
  collected.state = 0
  console.log(news.id, '收藏状态为：', collected.state)
}

const changeStar = (collected, news) => {
  if (collected.state === 0) {
    collected.state = 1
    console.log('已收藏', news.id, '的新闻')
  } else {
    collected.state = 0
    console.log('已取消收藏')
  }
}


const router = useRouter()
const navigateToNews = (id) => {
  router.push({ name: 'NewsPage', params: { id } }) // 跳转到 NewsPage 页面
}
</script>

<style scoped>
.news-item {
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
.news-item h2 {
  font-size: 18px;
  margin: 0 0 10px;
}
.news-item p {
  margin: 0 0 5px;
}
.news-item small {
  color: #888;
}
.content {
  flex: 1;
  margin-right: 5px;
}
.pic {
  flex: 1;
  max-height: 200px;
}
img {
    width: 100%; /* 图片自适应宽度 */
    height: 100%; /* 图片自适应高度 */
    object-fit: cover; /* 图片铺满容器 */
  }
.news-item .content button {
  min-width: 0;
  border: none;
}
</style>
