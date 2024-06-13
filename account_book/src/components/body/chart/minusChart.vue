<template>
    <div class="chart-container">
      <div class="chart-header">
        <p class="chart-label">월간 인출</p>
        <p class="chart-total">{{ totalWithdrawals.toLocaleString() }} \</p>
      </div>
      <div ref="withdrawChart"></div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            monthlyWithdrawals: [],
            totalWithdrawals: 0,
        };
    },
    async mounted() {
        const user = JSON.parse(localStorage.getItem("loginKey"));
        if (user) {
            await this.fetchChartData(user.user_id);
        }
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(this.drawChart);
    },
    methods: {
        async fetchChartData(userId) {
            try {
                const response = await axios.get(
                    `http://localhost:3001/Minus?user_id=${userId}`
                );
                const withdraws = response.data;

                const minusData = withdraws.filter(withdraw => {
                    const year = new Date(withdraw.update_date).getFullYear();
                    return year === 2024;
                });

                const monthlyData = minusData.reduce((acc, withdraw) => {
                    const month = new Date(withdraw.update_date).getMonth() + 1;
                    acc[month] = (acc[month] || 0) + withdraw.money;
                    return acc;
                }, {});

                this.chartData = Object.entries(monthlyData).map(([month, amount]) => [parseInt(month), amount]);

                this.totalWithdrawals = Object.values(monthlyData).reduce((acc, amount) => acc + amount, 0);
            } catch (error) {
                console.error("차트 데이터 불러오기 실패", error);
            }
        },
        drawChart() {
            const data = new google.visualization.DataTable();
            data.addColumn("string", "Month");
            data.addColumn("number", "인출");

            const monthNames = [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
            ];
            this.chartData.forEach(([month, amount]) => {
                data.addRow([monthNames[month - 1] + "월", amount]);
            });

            const options = {
                titleTextStyle: { fontSize: 20 },
                curveType: "function",
                legend: { position: "bottom" },
                chartArea: { width: "80%", height: "80%" },
                colors: ["red"],
            };

            const chart = new google.visualization.LineChart(this.$refs.withdrawChart);
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