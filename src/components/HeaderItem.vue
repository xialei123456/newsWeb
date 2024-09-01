<template>
  <header class="header">
    <div class="logo">金融资讯聚合</div>

    <!-- 搜索栏 -->
    <!-- 使用 Vuetify 提供的文本输入组件, v-model 双向绑定 search 变量, append-icon 添加放大镜图标 -->
    <v-text-field clearable
      v-model="search"
      append-icon="mdi-magnify"
      @click:append="clickSearch(search)"
      label="Type the keyword of your interests"
      hide-details
      class="search-bar"
      variant="solo"

      density="compact"
      single-line
    ></v-text-field>

    <!-- 用户信息及功能菜单 -->
    <v-menu v-if="isLoggedIn" open-on-click offset-y>
      <template v-slot:activator="{ props }">  <!--新版使用props-->
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>{{loggedName}}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goStarPage()">
          <v-list-item-title>我的收藏</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout()">
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <span v-else>未登录</span>
  </header>

  <!-- 标签导航 -->
  <div style="padding:5px;margin-top:5px">
    <nav>
      <ul>
        <!-- 使用 router-link 进行导航和路由 -->
        <li><router-link to="/">首页</router-link></li>
        <li><router-link :to="{ name: 'LabelNews', params: { label: '新闻' } }">新闻</router-link></li>
        <li><router-link :to="{ name: 'LabelNews', params: { label: '证券' } }">证券</router-link></li>
        <li><router-link :to="{ name: 'LabelNews', params: { label: '理财' } }">理财</router-link></li>
        <li><router-link :to="{ name: 'LabelNews', params: { label: '其他' } }">其他</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderItem'
}
</script>

<script setup>
import { ref, watch,onMounted,computed } from 'vue'
//import { storeToRefs } from 'pinia';
//import { useUserStore } from '@/stores/user'; // 引入用户 store
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
// 创建搜索关键字的响应式变量
const search = ref('')

// 监听 search 的变化并执行搜索操作
watch(search, (newValue) => {
  //console.log('Searching for:', newValue)
  // 执行搜索时的逻辑代码, 比如调用搜索接口
})

// 触发搜索功能后，跳转搜索页面
const router = useRouter() // 获取路由实例
const clickSearch = (keywords) => {
  router.push({ name: 'SearchPage', query: { keyword: keywords } }) // 跳转, 携带 query 参数
}

// 使用 Pinia 状态系统引入
//const userStore = useUserStore();
//const { isLoggedIn, username } = storeToRefs(userStore); // 从状态管理中提取 ref

// 跳转至收藏页面的函数
const goStarPage = () => {
  router.push({ name: 'StarPage' }) // 跳转到收藏页面 NewsPage 相似
}

//登录态获取
const store = useStore();  //使用Vuex实例
let isLoggedIn = computed(() => !!store.getters.token); // 计算属性，在sidebar登录态变化时也能改变
let loggedName = computed(() => store.getters.name); 

const handleLogout = ()=>{
  store.dispatch('LogOut').then(()=>{
    console.log("登出成功");
  }).catch((error) => {
    console.error("登出失败",error);
  }
    )
  }

onMounted(()=>{
  loggedName.value = store.getters.name
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #e5e5e5;
  border-bottom: 1px solid #ddd;
}

.logo {
  font-size: 17px;

}

.search-bar {
  width: 28%;
  flex-grow: 1; /* 搜索栏占据剩余的中间空间 */
  margin: 0 auto; /* 搜索栏在页面中居中 */
  max-width: 540px;
  position: absolute;
  left: 50%;
  transform: translateX(-35%);
}

nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
}

nav ul li {
  margin-left: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}
</style>
