<template>
    <div>
          <button @click="toggleForm" class="toggle-button">+</button>
              <div :class="{'transaction-form': true, 'show': formVisible}">
              <div class="header">
                  <h2>&emsp;&nbsp;가계부 작성</h2>
                  <img :src="`/image/bearKB.jpg`" alt="KB귀요미 곰" class="header-image">
              </div>
              <form @submit.prevent="submitForm">
                  <div class="wrap">
                      <div>
                          <select v-model="type" id="type">
                              <option value="Plus">수입</option>
                              <option value="Minus">지출</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <input type="datetime-local" v-model="date" id="date" name="date" class="custom-datetime" >
                      </div>
                      <div class="form-group">
                          <input type="number" v-model="amount" id="amount" name="amount" placeholder="금액">
                      </div>
                      <div class="form-group">
                          <input type="text" v-model="category" id="category" name="category" placeholder="카테고리">
                      </div>
                          <div class="form-group">
                              <input type="text" v-model="memo" id="memo" name="memo" placeholder="메모">
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
        // 토글 버튼으로 폼을 확인/숨김
        toggleForm() {
          this.formVisible = !this.formVisible;
        },
        // 폼 데이터 전송 (비동기)
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

          // 폼 데이터 post 요청
          axios.post(url,params)
              .then(response=> {
                // 성공 시 폼 초기화 및 숨김 
                  this.resetForm();
                  this.formVisible = false;
                  this.$emit('add-transaction', { type: this.type, transaction: response.data });
                }
              )
              .catch(error => {
                  console.error(error);
              })
        },
        // 폼 초기 상태로 리셋 
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
  transition: transform 0.2s;
}

.toggle-button:hover {
  transform: scale(1.1);
}

.transaction-form {
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0 20px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, transform 0.3s;
  opacity: 0;
  transform: translateY(20px);
  display: none;
}

.transaction-form.show {
  opacity: 1;
  transform: translateY(0);
  display: block;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-image {
  width: 60px;
  height: 80px;
  object-fit: cover;
}

.wrap {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.custom-datetime {
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 8px;
}

.custom-datetime:focus {
  border-color: #007bff;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
}

input[type="datetime-local"],
select,
input[type="text"],
input[type="number"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #b6b6b6;
  font-size: 14px; 
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input[type="datetime-local"]:focus,
select:focus,
input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #000;
}

.Btn {
  width: 100%;
  padding: 10px;
  margin-top: 15px; 
  border-radius: 5px;
  background-color: #ffcc00;
  color: #424242;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.Btn:hover {
  background-color: #e6b800;
}
</style>