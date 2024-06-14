<template>
    <div class="wrap">
        <h1>공지사항</h1>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notice, index) in sortDate" :key="index" @click="detailPage(notice.id)">
                        <td>{{ index + 1 }}</td>
                        <td>{{ notice.title }}</td>
                        <td>{{ notice.writer }}</td>
                        <td>{{ deleteT(notice.create_date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Notice",
    data() {
        return {
            noticeList: []
        }
    },
    computed: {
        sortDate() {
            return this.noticeList.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
        }
    },
    mounted() {
        this.getNoticelist();
    },
    methods: {
        getNoticelist() {
            axios.get("http://localhost:3001/Notice")
                .then(res => {
                    this.noticeList = res.data;
                })
                .catch(err => alert("오류 발생: " + err));
        },
        detailPage(id) {
            this.$router.push({ name: 'NoticeView', params: { 'id': id } });
        },
        deleteT(data) {
            return data.replace('T', ' ');
        }
    }
}
</script>

<style scoped>
.wrap {
    width: 1000px;
    margin: 0 auto;
    padding: 30px;
    background-color: rgb(252, 250, 241);
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.2);
}

table {
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #e0e0e0;
    border-style: hidden;
    text-align: le;

}

th,
td {
    border: 1px solid #cfcfcf;
    padding: 8px;
    border-right: none;
    border-left: none;
}

th {
    background-color: #ebebeb;
}

tr:hover {
    background-color: #ebebeb;
    cursor: pointer;
}
</style>
