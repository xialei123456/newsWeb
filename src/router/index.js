// 导入必要的模块和组件
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue' // 引入首页组件
import NewsPage from '../components/NewsPage.vue' // 引入新闻详情组件
import LabelNews from '../components/LabelNews.vue' // 引入LabelNews组件
import StarPage from '../components/StarPage.vue' // 引入StarPage组件
import SearchPage from '../components/SearchPage.vue' // 引入搜索页面

// 定义路由
const routes = [
  {
    path: '/', // 首页路由
    name: 'Home',
    component: HomePage // 跳转到首页组件
  },
  {
    path: '/news/:id', // 新闻详情页面路由, 可含动态参数
    name: 'NewsPage',
    component: NewsPage // 跳转到新闻详情组件
  },
  {
    path: '/:label', // 标签分类路由页面，表示不同标签下的新闻
    name: 'LabelNews',
    component: LabelNews
  },
  {
    path: '/star', // 用户收藏页面
    name: 'StarPage',
    component: StarPage
  },
  {
    path: '/search', // 搜索页面
    name: 'SearchPage',
    component: SearchPage
  }
]

// 创建并配置router对象
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 历史模式
  routes // 使用定义的路由
})

export default router // 导出路由配置
