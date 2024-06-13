<template>
  <div class="">
    <button @click="toggleForm" class="toggle-button">+</button>
    <div v-if="formVisible" class="transaction-form">
      <h2>가계부 작성</h2>
      <form @submit.prevent="submitForm">
        <div class="wrap">
          <div>
            <label for="type">유형</label>
            <select v-model="type" id="type">
              <option value="Plus">수입</option>
              <option value="Minus">지출</option>
          </select>
          </div>
          <div>
            <label for="date">날짜</label>
            <input type="datetime-local" v-model="date" id="date" name="date"><br><br>
          </div>
          <div>
            <input type="number" v-model="amount" id="amount" name="amount" placeholder="금액"><br><br>
          </div>
          <div>
            <input type="text" v-model="category" id="category" name="category" placeholder="카테고리"><br><br>
          </div>
          <div>
            <input type="text" v-model="memo" id="memo" name="memo" placeholder="메모"><br><br>
          </div>
        </div>

        <button class="Btn" type="submit">등록</button>
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
  bottom: 50px;
  right: 50px;
  background-color: #ffcc00;
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 40px;
  padding: 0 0 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.2);
}

.transaction-form {
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0 20px rgba(0, 0, 0, 0.2);
}

.wrap {
  display: flex;
  flex-direction: column;
}

input[type="datetime-local"],
select {
  padding: 6px;
  border-radius: 5px;
  border: 1px solid rgb(182, 182, 182);
  margin-top: 16px;
}

input[type=text], input[type=number] {
width: 200px;
padding: 10px;
font-size: 16px;
border-radius: 5px;
box-sizing: border-box;
border: 1px solid rgb(173, 173, 173);
}
input[type=text]:focus, input[type=number]:focus {
outline: none;
border: 1px solid black;
}

.Btn {
  width: 100px;
  border-radius: 5px;
  background-color: rgb(255, 204, 0);
  color: rgb(66, 66, 66);
  font-size: 16px;
  font-weight: 600;
}
</style>
