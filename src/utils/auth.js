import Cookies from 'js-cookie'

const TokenKey = 'loginToken'
const NameKey = 'username' //存一下用户名

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}
export function setName(name) {
  return Cookies.get(NameKey,name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}