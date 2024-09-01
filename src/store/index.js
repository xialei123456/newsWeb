//import Vue from 'vue'
//import Vuex from 'vuex'
import { createStore } from 'vuex' //vue3新写法

//import app from './modules/app'
import user from './modules/user'
//import permission from './modules/permission'
import getters from './getters'

//创建了vuex实例，用来保存token和其他全局信息
const store = createStore({
  modules: {
    //app,
    user //具体定义在js文件中
    //permission
  },
  getters
})

export default store
