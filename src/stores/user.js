// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    username: '',
    password: ''
  }),
  actions: {
    login(username, password) {
      this.isLoggedIn = true;
      this.username = username;
      this.password = password;
      console.log('登录成功');
    },
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      this.password = '';
      console.log('已退出登录');
    }
  },
});
