<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      user_id:'',
      password:'',
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.get(
          `http://localhost:3001/User?user_id=${this.user_id}&password=${this.password}`
        );
        if (response.data.length > 0) {
          const user = response.data[0];
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/main");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
