<template>
  <div class="graph-container">
    <div class="chart-item">
      <PlusChart v-if="user" />
    </div>
    <div class="chart-item">
      <MinusChart v-if="user" />
    </div>
    <div class="chart-item">
      <SumChart v-if="user" />
    </div>
  </div>
</template>

<script>
import PlusChart from "@/components/body/chart/plusChart.vue";
import MinusChart from "@/components/body/chart/minusChart.vue";
import SumChart from "@/components/body/chart/sumChart.vue";

export default {
  components: {
    PlusChart,
    MinusChart,
    SumChart,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      const loginKey = localStorage.getItem("loginKey");
      if (!loginKey) {
        this.$router.push("/");
      } else {
        this.user = JSON.parse(loginKey);
      }
    },
  },
};
</script>

<style scoped>
.graph-container {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  width: 1600px;
}

.chart-item {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 300px;
  transition: all 0.3s ease;
}

@media (max-width: 1500px) {
  .graph-container {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 40px;
    gap: 80px;
  }
  .chart-item {
    width: 30%;
    height: 240px;
  }
}

@media (max-width: 1340px) {
  .graph-container {
    flex-direction: column;
    align-items: center;
    gap: 120px;
    margin-top: 40px;
    margin-bottom: 60px;
  }
  .chart-item {
    width: 30%;
    height: 200px;
  }
}

@media (max-width: 950px) {
  .graph-container {
    flex-direction: column;
    align-items: center;
    gap: 170px;
    margin-top: 70px;
    margin-bottom: 90px;
  }

  .chart-item {
    width: 50%;
    height: 150px;
  }
}

@media (max-width: 435px) {
  .graph-container {
    flex-direction: column;
    align-items: center;
    margin-top: 90px;
    margin-bottom: 120px;
    gap: 200px;
  }
  .chart-item {
    width: 80%;
    height: 100px;
    margin-bottom: 20px;
  }
}
</style>
