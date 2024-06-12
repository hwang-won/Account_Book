<template>
  <div class="chart-container">
    <div class="chart-header">
      <p class="chart-label">월간 수입</p>
      <p class="chart-total">{{ totalDeposit.toLocaleString() }} \</p>
    </div>
    <div ref="incomeChart"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      chartData: [],
      totalDeposit: 0,
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem("loginKey"));
    if (user) {
      await this.fetchChartData(user.user_id);
    }
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  },
  methods: {
    async fetchChartData(userId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/Plus?user_id=${userId}`
        );
        const deposits = response.data;
        const plusData = deposits.filter(function (deposit) {
          const year = new Date(deposit.update_date).getFullYear();
          return year === 2024;
        });

        const monthlyData = plusData.reduce(function (acc, deposit) {
          const month = new Date(deposit.update_date).getMonth() + 1;
          acc[month] = (acc[month] || 0) + deposit.money;
          return acc;
        }, {});

        this.chartData = Object.entries(monthlyData).map(function ([
          month,
          amount,
        ]) {
          return [parseInt(month), amount];
        });

        this.totalDeposit = Object.values(monthlyData).reduce(function (
          acc,
          amount
        ) {
          return acc + amount;
        },
        0);
      } catch (error) {
        console.error("수입 차트 데이터 불러오기 실패", error);
      }
    },
    drawChart() {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Month");
      data.addColumn("number", "수입");

      const monthNames = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      this.chartData.forEach(function ([month, amount]) {
        data.addRow([monthNames[month - 1] + "월", amount]);
      });

      const options = {
        titleTextStyle: { fontSize: 20 },
        curveType: "function",
        legend: { position: "bottom" },
        chartArea: { width: "80%", height: "70%" },
      };

      const chart = new google.visualization.LineChart(this.$refs.incomeChart);
      chart.draw(data, options);
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  height: auto;
  width: 100%;
}

.chart-header {
  margin-bottom: 8px;
  text-align: left;
}

.chart-label {
  font-size: 14px;
  margin: 0;
  color: #666;
}

.chart-total {
  font-size: 24px;
  margin: 4px 0;
  font-weight: bold;
}

#incomeChart {
  width: 100%;
  height: 100%;
}
</style>
