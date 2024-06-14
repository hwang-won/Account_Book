<template>
    <div class="chart-container">
      <div class="chart-header">
        <p class="chart-label">월간 순수익</p>
        <p class="chart-total">{{ totalIncome.toLocaleString() }} \</p>
      </div>
      <div ref="incomeChart"></div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
        monthlyIncome: [],
        totalIncome: 0,
        };
    },
    async mounted() {
        const user = JSON.parse(localStorage.getItem("loginKey"));
        if (user) {
        await this.fetchMonthlyIncomeData(user.user_id);
        }
    },
    methods: {
        async fetchMonthlyIncomeData(userId) {
        try {
            const plusResponse = await axios.get(
            `http://localhost:3001/Plus?user_id=${userId}`
            );
            const minusResponse = await axios.get(
            `http://localhost:3001/Minus?user_id=${userId}`
            );

            const plusData = plusResponse.data.filter(function (entry) {
            return new Date(entry.update_date).getFullYear() === 2024;
            });

            const minusData = minusResponse.data.filter(function (entry) {
            return new Date(entry.update_date).getFullYear() === 2024;
            });
            const incomeData = this.calculateIncomeData(plusData, minusData);

            this.monthlyIncome = Object.entries(incomeData).map(function (entry) {
            return [parseInt(entry[0]), entry[1]];
            });

            this.totalIncome = Object.values(incomeData).reduce(function (
            accumulator,
            amount
            ) {
            return accumulator + amount;
            },
            0);

            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(this.drawChart.bind(this));
        } catch (error) {
            console.error("총 수익 차트 데이터 불러오기 실패", error);
        }
        },

        calculateIncomeData(plusData, minusData) {
        const incomeData = {};

        plusData.forEach(function (plus) {
            const month = new Date(plus.update_date).getMonth() + 1;
            incomeData[month] = (incomeData[month] || 0) + plus.money;
        });

        minusData.forEach(function (minus) {
            const month = new Date(minus.update_date).getMonth() + 1;
            incomeData[month] = (incomeData[month] || 0) - minus.money;
        });

        return incomeData;
        },
        drawChart() {
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Month");
        data.addColumn("number", "총수익");

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
        this.monthlyIncome.forEach(function ([month, amount]) {
            data.addRow([monthNames[month - 1] + "월", amount]);
        });

        const options = {
            titleTextStyle: { fontSize: 20 },
            curveType: "function",
            legend: { position: "bottom" },
            chartArea: { width: "80%", height: "70%" },
            colors: ["green"],
        };

        const chart = new google.visualization.LineChart(
            this.$refs.incomeChart
        );
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
  width: 100%;
}

.chart-header {
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
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
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}
</style>
