<template>
    <div class="chart-container">
      <!-- 차트 총 수익 표시 -->
      <div class="chart-header">
        <p class="chart-label">월간 순수익</p>
        <p class="chart-total">{{ totalIncome.toLocaleString() }} \</p>
      </div>
      <!-- 차트 구현 부분 -->
      <div ref="incomeChart"></div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
      data() {
          return {
          monthlyIncome: [], // 월간 순수익 데이터
          totalIncome: 0, // 총 순수익 금액
          };
      },
      async mounted() {
          // 사용자 정보에서 차트에 필요한 정보 가져오기
          const user = JSON.parse(localStorage.getItem("loginKey"));
          if(user) {
              await this.fetchMonthlyIncomeData(user.user_id);
          }
      },
      methods: {
          async fetchMonthlyIncomeData(userId) {
          try {
              // 서버에서 데이터 가져오기
              const plusResponse = await axios.get(
              `http://localhost:3001/Plus?user_id=${userId}`
              );
              const minusResponse = await axios.get(
              `http://localhost:3001/Minus?user_id=${userId}`
              );
  
              // 2024년 데이터 필터링
              const plusData = plusResponse.data.filter(function (entry) {
              return new Date(entry.update_date).getFullYear() === 2024;
              });
  
              const minusData = minusResponse.data.filter(function (entry) {
              return new Date(entry.update_date).getFullYear() === 2024;
              });
  
              // 총 합 데이터 계산
              const incomeData = this.calculateIncomeData(plusData, minusData);
  
              // 월별 데이터 집계
              this.monthlyIncome = Object.entries(incomeData).map(function (entry) {
              return [parseInt(entry[0]), entry[1]];
              });
  
              // 총 합 계산
              this.totalIncome = Object.values(incomeData)
                  .reduce(function (accumulator,amount) 
                      { return accumulator + amount; },
                  0);
  
              // Google Charts 로드
              google.charts.load("current", { packages: ["corechart"] });
              google.charts.setOnLoadCallback(this.drawChart.bind(this));
              } catch (error) {
                  console.error("총 수익 차트 데이터 불러오기 실패", error);
              }
          },
          calculateIncomeData(plusData, minusData) {
              const incomeData = {};
  
              // 수입 데이터 집계
              plusData.forEach(function (plus) {
                  const month = new Date(plus.update_date).getMonth() + 1;
                  incomeData[month] = (incomeData[month] || 0) + plus.money;
              });
  
              // 지출 데이터 집계
              minusData.forEach(function (minus) {
                  const month = new Date(minus.update_date).getMonth() + 1;
                  incomeData[month] = (incomeData[month] || 0) - minus.money;
              });
  
              return incomeData;
          },
          drawChart() {
              const data = new google.visualization.DataTable();
              // 차트에 컬럼 추가
              data.addColumn("string", "Month");
              data.addColumn("number", "총수익");
  
              const monthNames = [
                      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
              ];
  
              // 차트 데이터 추가
              this.monthlyIncome.forEach(function ([month, amount]) {
                  data.addRow([monthNames[month - 1] + "월", amount]);
              });
  
              // 차트 세부 속성값 설정
              const options = {
                  titleTextStyle: { fontSize: 20 },
                  curveType: "function",
                  legend: { position: "top" },
                  chartArea: { width: "80%", height: "70%" },
                  colors: ["green"],
              };
  
              // 차트 그리기
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
  