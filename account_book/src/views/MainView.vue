<template>
  <div>
    <h2 v-if="user">Welcome, {{ user.username }}</h2>
    <Dchart v-if="user" />
    <Wchart v-if="user" />
    <Ichart v-if="user" />
    <p v-if="!user">Loading...</p>
  </div>
</template>
<script>
import Login from "../components/Login.vue";
import Dchart from "../components/Dchart.vue";
import Wchart from "../components/Wchart.vue";
import Ichart from "../components/Ichart.vue";

export default {
  components: {
    Dchart,
    Wchart,
    Ichart,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      this.$router.push("/");
    } else {
      try {
        this.user = { id: userId, username: "User" };
      } catch (error) {
        console.error(error)
      }
    }
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
