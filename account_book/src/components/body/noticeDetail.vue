<template>
    <div class="wrap">
        <table>
            <tr>
                <th>제목</th>
                <td colspan="3">{{ notice.title }}</td>
            </tr>
            <tr class="second-row">
                <th>작성자</th>
                <td>{{ notice.writer }}</td>
                <th>작성일</th>
                <td>{{ date }}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td colspan="3">{{ notice.content }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NoticeDetail',
    data() {
        return {
            notice: {},
            date: ""
        }
    },
    mounted() {
        this.getNoticeDetail();
    },
    methods: {
        getNoticeDetail() {
            const id = this.$route.params.id;
            axios.get(`http://localhost:3001/Notice/${id}`)
                .then(res => {
                    this.notice = res.data;
                    this.date = res.data.create_date.replace('T', ' ');

                })
                .catch(err => alert("오류 발생: " + err));
        }
    }
}
</script>

<style>
.wrap {
    width: 800px; /* 너비를 줄이기 위해 800px로 변경 */
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
}

th,
td {
    border: 1px solid #cfcfcf;
    padding: 24px; /* 높이를 더 늘리기 위해 패딩을 24px로 변경 */
    border-right: none;
    border-left: none;
    vertical-align: middle; /* 내용이 수직 중앙에 정렬되도록 설정 */
    text-align: center; /* 내용이 수평 중앙에 정렬되도록 설정 */
}

th {
    background-color: #ebebeb;
}

.second-row th,
.second-row td {
    width: 25%; /* 두 번째 행의 각 열의 너비를 동일하게 설정 */
}
</style>
