//自定义vuex实例的getters属性
//后续可以使用类似store.getters.token直接访问
const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
  }
  export default getters