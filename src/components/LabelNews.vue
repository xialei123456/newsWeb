<template>
    <div class="label-news">
      <h1>{{ labelTitle }} 标签的热点新闻</h1>
      <p>来自标签的新闻集合</p>
      <!-- 使用TableTitle获取labelNews,并传入子组件的newsList属性中 -->
      <NewsList :newsList="labelNews"/>
    </div>
</template>
  
  <script>
  import NewsList from './NewsList.vue'
  export default {
    name: 'LabelNews',
    components: {
      NewsList
    }
  }
  </script>
  
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
  // 获取路由信息
  const route = useRoute()
  
  // 定义一个响应式变量并存储当前路由标签
  let labelTitle = ref('')
  
  //定义新闻列表，需根据实际需求获取，传入子组件的props或者获取后端数据
  let labelNews = ref([])
  
  // 更新新闻信息的函数
  const updateLabelNews = (labelTitle) => {
    //假设是从后端获取信息，这里使用静态数据
    labelNews = [
      {
        id: 1, 
        title: labelTitle.value+'的标题',
        description: '这是一个示例描述',
        source: '来源标记',
        url: 'https://finance.sina.com.cn/jjxw/2024-08-09/doc-ihchfyg653217.shtml'
      }
    ]
    console.log(labelTitle.value, '已获取')
  }
  
  // 组件被挂载时，根据路由参数更新标签
  onMounted(() => {
    labelTitle.value = route.params.label
    updateLabelNews(labelTitle) // 更新新闻列表
  })
  
  // 监听路由path变化来更新新闻信息

  const router = useRouter()
  watch(() => router.currentRoute.value.path, () => {
    labelTitle.value = route.params.label
    updateLabelNews(labelTitle) //更新新闻列表
  }, { immediate: true, deep: true })
  </script>
  
  <style scoped>
  .label-news {
    padding: 20px;
  }
  </style>
  