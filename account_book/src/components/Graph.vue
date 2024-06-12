<template>
  <div class="graph-container">
    <div class="chart-item">
      <Dchart v-if="user" />
    </div>
    <div class="chart-item">
      <Wchart v-if="user" />
    </div>
    <div class="chart-item">
      <Ichart v-if="user" />
    </div>
  </div>
</template>
<script>
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
        console.error("Error fetching user data:", error);
      }
    }
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.graph-container {
  display: flex; 
  justify-content: space-around;
  width: 100%;
  height: 100%; 
  padding: 10px;
  box-sizing: border-box; 
}

.chart-item {
  flex: 1; 
  margin: 0 10px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}
</style>
