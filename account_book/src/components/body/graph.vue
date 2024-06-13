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
    MinusChart,
    PlusChart,
    SumChart,
},
data() {
    return {
    user: null,
    };
},
mounted() {
    const loginKey = localStorage.getItem("loginKey");
    if (!loginKey) {
    this.$router.push("/");
    } else {
    this.user = JSON.parse(loginKey);
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    flex: 1;
    justify-items: center;
    align-items: center;
    transition: margin-left 0.3s;
    }

    .chart-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    }
</style>