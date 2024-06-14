<template>
  <div class="chart-container">
    <!-- 차트 총 지출 표시 -->
    <div class="chart-header">
      <p class="chart-label">월간 지출</p>
      <p class="chart-total">{{ totalWithdrawals.toLocaleString() }} \</p>
    </div>
    <!-- 차트 구현 부분 -->
    <div ref="withdrawChart"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            monthlyWithdrawals: [], // 월간 지출 데이터
            totalWithdrawals: 0,    // 총 지출 금액
        };
    },
    async mounted() {
        // 사용자 정보에서 차트에 필요한 정보 가져오기 
        const user = JSON.parse(localStorage.getItem("loginKey"));
        if(user) {
        await this.fetchChartData(user.user_id);
        }

        // Google Charts 로드 
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(this.drawChart);
    },
    methods: {
        async fetchChartData(userId) {
        try {
            // 서버에서 데이터 가져오기
            const response = await axios.get(
            `http://localhost:3001/Minus?user_id=${userId}`
            );
            const withdraws = response.data;

            // 2024년 데이터 필터링
            const minusData = withdraws.filter((withdraw) => {
            const year = new Date(withdraw.update_date).getFullYear();
            return year === 2024;
            });
            
            // 월별 데이터 집계
            const monthlyData = minusData.reduce((acc, withdraw) => {
            const month = new Date(withdraw.update_date).getMonth() + 1;
            acc[month] = (acc[month] || 0) + withdraw.money;
            return acc;
            }, {});

            // 차트 데이터 형식으로 변환 
            this.chartData = Object.entries(monthlyData).map(([month, amount]) => [
            parseInt(month),
            amount,
            ]);

            // 총 지출 금액 계산
            this.totalWithdrawals = Object.values(monthlyData).reduce(
            (acc, amount) => acc + amount, 0);
        } catch (error) {
            console.error("지출 차트 데이터 불러오기 실패", error);
            }
        },
        drawChart() {
            const data = new google.visualization.DataTable();
            // 차트에 컬럼 추가
            data.addColumn("string", "Month");
            data.addColumn("number", "인출");

            const monthNames = [
                    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
            ];
        
            // 차트 데이터 추가
            this.chartData.forEach(([month, amount]) => {
                data.addRow([monthNames[month - 1] + "월", amount]);
            });

            // 차트 세부 속성값 설정
            const options = {
                titleTextStyle: { fontSize: 20 },
                curveType: "function",
                legend: { position: "top" },
                chartArea: { width: "80%", height: "80%" },
                colors: ["red"],
            };

            const chart = new google.visualization.LineChart(this.$refs.withdrawChart);
            // 차트 그리기 
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
