<template>
  <aside class="sidebar">
    <div class="picks">
      <p style="margin-left:2px">猜你喜欢</p>
      <v-btn v-if="!isLoggedIn" @click="showDialog = true" rounded="lg" size="small" block>登录</v-btn>
    </div>
    <!-- 登录弹出框，使用v-dialog组件实现 -->
    <v-dialog v-model="showDialog" persistent max-width="400">
      <v-card>
        <!-- 标题部分 -->
        <v-card-title>
          <span class="text-h5">登录</span>
        </v-card-title>
        <!-- 输入字段 -->
        <v-card-text>
          <!-- 这里绑定 loginFormRef -->
          <v-form ref="loginFormRef" v-model="valid" :rules="loginRules" :lazy-validation="true">
            <v-text-field v-model="loginForm.username" label="用户名" required></v-text-field>
            <v-text-field v-model="loginForm.password" label="密码" type="password" required></v-text-field>
          </v-form>
        </v-card-text>
        <!-- 按钮区域 -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- 登录按钮 -->
          <v-btn color="blue darken-1" text @click="handleLogin">登录</v-btn>
          <!-- 取消按钮 -->
          <v-btn color="grey darken-1" text @click="showDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </aside>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
//import { useRouter } from 'vue-router';
import { setCookie, getCookie } from '@/utils/support';

const showDialog = ref(false);  // 控制弹出框显示/隐藏的变量
const loginFormRef = ref(null); // 绑定表单引用

const store = useStore();  //使用Vuex实例
//const router = useRouter(); 

const loginForm = reactive({  // 格式化登录信息
  username: '',
  password: '',
});

/*--------------------登录逻辑部分-----------------*/ 
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur', min: 3 }],
});

//检查登录状态,保存到isLoggedIn里
// 计算属性，基于 Vuex 的 token 状态
const isLoggedIn = computed(() => !!store.getters.token);
//为什么不用ref? 因为ref 定义的值通常用于存储简单的数据，直接在模板中使用时会自动刷新 UI，但它不会自动响应其他状态的变化，除非手动更新。
const valid = ref(false);
//登录
const handleLogin = () => {
  loginFormRef.value.validate().then(success => {
    if (success) {
      store.dispatch('Login', loginForm).then(() => {
        setCookie('username', loginForm.username, 15);
        setCookie('password', loginForm.password, 15);
        //isLoggedIn.value = true;
        console.log("登入成功")
        showDialog.value = false;
        //router.push({ path: '/' });
      }).catch(() => {
        //isLoggedIn.value = false;
        showDialog.value = true
      });
    } else {
      console.log('参数验证不合法！');
      return false;
    }
  });
};

onMounted(() => {
  loginForm.username = getCookie('username') || 'admin';
  loginForm.password = getCookie('password') || '';
});

</script>

<style scoped>
.sidebar {
  padding: 20px;
  background-color: #ffffff;
  border-left: 1px solid #ddd;
  width: 20%;
}

.picks button {
  background-color: #bfcdff;
  color: #000000;
  border: none;
  padding: 3px 6px;
  cursor: pointer;
  font-size: 14px;
  min-width: 0;
}
</style>
