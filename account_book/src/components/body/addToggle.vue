<template>
    <div>
      <button @click="toggleForm" class="toggle-button">+</button>
      <div v-if="formVisible" class="transaction-form">
        <h2>신규 가계부 작성</h2>
        <form @submit.prevent="submitForm">
          <label for="type">유형:</label>
          <select v-model="type" id="type">
            <option value="Plus">수입</option>
            <option value="Minus">지출</option>
          </select>
          <label for="date">날짜:</label>
            <input type="date" v-model="date" id="date" name="date"><br><br>
          <label for="amount">금액:</label>
            <input type="number" v-model="amount" id="amount" name="amount"><br><br>
          <label for="category">카테고리:</label>
            <input type="text" v-model="category" id="category" name="category"><br><br>
          <label for="memo">메모:</label>
            <input type="text" v-model="memo" id="memo" name="memo"><br><br>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        formVisible: false,
        type: 'Plus',  
        date: new Date().toISOString().substring(0, 10),
        amount: '',  
        category: '',  
        memo: ''  
        };
    },
    methods: {
      toggleForm() {
        this.formVisible = !this.formVisible;
      },
      submitForm() {
        const userJsonString = localStorage.getItem("loginKey");
        const user = userJsonString ? JSON.parse(userJsonString) : null;
        const userId = user ? user.user_id : null;

        let params = {
          id: String(Date.now()),
          user_id: userId, 
          money: parseInt(this.amount),
          create_date: this.date,
          update_date: this.date,
          category: this.category,
          memo: this.memo
        };

        const url = `http://localhost:3001/${this.type}?user_id=${user}`;

        axios.post(url,params)
            .then(response=> {
                this.resetForm();
                this.formVisible = false;
                // 부모 컴포에 데이터를 보내는 방식으로 변경 
                this.$emit('add-transaction', { type: this.type, transaction: response.data });
            })
            .catch(error => {
                console.error(error);
            })
      },
      resetForm() {
        this.type ='Plus';
        this.date = new Date().toISOString().substring(0, 10),
        this.amount='';
        this.category='';
        this.memo='';
      }
    }
  };
  </script>
  
  <style scoped>

  .toggle-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffcc00;
    color: white;
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .transaction-form {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>