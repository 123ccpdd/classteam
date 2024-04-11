<template>
  <div class="login-container">
    <h1>登录</h1>
	<img src="@/static/login.jpg" alt="" />
    <form @submit.prevent="login">
      <label for="username">用户名（手机号）:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">密码:</label>
      <input type="password" id="password" v-model="password" required>
	  <view>
		<label class="radio"><radio value="r2" />选中视为同意有关用户相关协议</label>
	  </view>
      <navigator url="/pages/index/index">
		  <button type="submit">登录</button>
	  </navigator>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      // Add your login logic here
      if (this.username === 'admin' && this.password === 'password') {
        // Successful login, redirect or do something else
        console.log('Login successful');
      } else {
        this.error = 'Invalid username or password';
      }
    }
  }
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc
}

button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.radio{
	border-top: 10px;
	border-bottom: 10px;
}
</style>
