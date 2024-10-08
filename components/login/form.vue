<script setup lang="ts">
import { message } from 'ant-design-vue'
import pkg from 'lodash'
import { storeToRefs } from 'pinia'
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfoApi, loginWithPasswordApi } from '~/api/user'
import { useUserStore } from '~/stores/modules/userStore'
const { debounce } = pkg

const router = useRouter()
const loading = ref(false)
const userStore = useUserStore()
const { rememberMe, loginInfo } = storeToRefs(userStore)
const remember = ref(rememberMe.value)
const inputUsername = ref()
const inputPassword = ref()
const adminLogin = debounce(login, 300, { leading: true, trailing: false })

async function login() {
  if (inputUsername.value === '' || inputPassword.value === '') {
    message.error('请输入用户名和密码')
    return
  }

  loading.value = true
  const res = await loginWithPasswordApi({
    login_type: 'password',
    password_params: {
      username: inputUsername.value,
      password: inputPassword.value
    }
  })
  if (res.code === 200) {
    message.success(`登录成功`)
    userStore.setToken(res.data.access_token)
    userStore.setRememberMe(unref(remember))
    getUserInfoApi().then((res) => {
      //增加密码存储
      const updatedUserInfo = {
        ...res.data, // 复制res.data中的所有属性
        password: inputPassword.value // 添加密码属性
      };
      // 存储更新后的用户信息
      userStore.setUserInfo(updatedUserInfo);
    })
    if (unref(remember)) {
      userStore.setLoginInfo({
        username: inputUsername.value,
        password: inputPassword.value,
      })
    } else {
      userStore.setLoginInfo({ password: '', username: '' })
    }

    router.push('/')
  } else {
    message.error(res.message)
  }

  loading.value = false
}

// 获取存储的账号密码
function initLoginInfo() {
  if (rememberMe.value) {
    const { username, password } = loginInfo.value
    inputUsername.value = username
    inputPassword.value = password
  }
}

onMounted(() => {
  initLoginInfo()
})
</script>

<template>
  <div class="login-box w-full px-6 mb-6 md:px-0 md:w-3/5 h-full flex justify-center items-center"
    @keydown.enter="adminLogin">
    <form class="form">
      <div class="check-box">
        <!-- <button class="btn btn-primary btn-sm w-20 rounded rounded-r-none rounded-l-lg">
          登录
        </button> -->
        <!-- <button class="btn  btn-sm w-20 rounded rounded-l-none rounded-r-lg">
          注册
        </button> -->
      </div>
      <div class="flex-column">
        <label>Username</label>
      </div>
      <div class="inputForm">
        <svg t="1715312405389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4269" width="20" height="20">
          <path
            d="M691.2 608c-57.4 0-85 32-179.2 32-94.2 0-121.6-32-179.2-32C184.4 608 64 728.4 64 876.8V928c0 53 43 96 96 96h704c53 0 96-43 96-96v-51.2c0-148.4-120.4-268.8-268.8-268.8zM864 928H160v-51.2c0-95.2 77.6-172.8 172.8-172.8 29.2 0 76.6 32 179.2 32 103.4 0 149.8-32 179.2-32 95.2 0 172.8 77.6 172.8 172.8V928zM512 576c159 0 288-129 288-288S671 0 512 0 224 129 224 288s129 288 288 288z m0-480c105.8 0 192 86.2 192 192s-86.2 192-192 192-192-86.2-192-192 86.2-192 192-192z"
            p-id="4270" />
        </svg>
        <input v-model="inputUsername" type="text" class="input" placeholder="Enter your Username">
      </div>

      <div class="flex-column">
        <label>Password</label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
          <path
            d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
        </svg>
        <input v-model="inputPassword" type="password" class="input" placeholder="Enter your Password">
        <!-- <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z">
                    </path>
                </svg> -->
      </div>
      <div class="flex-row">
        <div>
          <a-checkbox v-model:checked="remember">
            Remember me
          </a-checkbox>
        </div>
        <!-- <span class="span">Forgot password?</span> -->
      </div>
      <div class="btn btn-primary text-white w-full" @click="adminLogin">
        Sign In <a-spin :spinning="loading" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  border-radius: 19px;
  background: #e0e0e0;
  box-shadow: 33px 33px 83px #c3c3c3, -33px -33px 83px #fdfdfd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 500px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form button {
  align-self: flex-end;
}

.flex-column>label {
  color: #151717;
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 85%;
  height: 100%;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row>div>label {
  font-size: 14px;
  color: black;
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #252727;
}

.p {
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}
</style>
