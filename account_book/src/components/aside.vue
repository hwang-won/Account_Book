<template>
    <div class="sidebar">
        <ul class="menu">
            <br>
            <b style="font-size: 20px;">잔고 {{ total }}원</b>
            <li @click="changeTab('Body')" :class="{ checked: tab === 'Body' }">
                <p>Home</p>
            </li>
            <li @click="changeTab('List')" :class="{ checked: tab === 'List' }">
                <p>거래내역</p>
            </li>
            <li @click="changeTab('Notice')" :class="{ checked: tab === 'Notice' }">
                <p>공지사항</p>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Aside",
    data() {
        return {
            total: 0,
            user_id: JSON.parse(localStorage.getItem("loginKey")).user_id,
            content: [],
            tab: "Body"
        }
    },
    props: {
        create_tab: String
    },
    created() {
        this.tab = this.create_tab;
        this.$emit("tab_value", this.tab);
    },
    mounted(){
        this.user_id = JSON.parse(localStorage.getItem("loginKey")).user_id
        let params = {"user_id" : this.user_id};
        axios.get(("http://localhost:3001/Plus"), {params})
            .then((response) => {
                response.data.forEach(ele =>{
                    this.total += ele.money
                    })
            })
            .catch((error) => {
                alert(error)
            })
        axios.get(("http://localhost:3001/Minus"), {params})
            .then((response) => {
                response.data.forEach(ele =>{
                    this.total -= ele.money
                    })
                })
            .catch((error) => {
                alert(error)
            })
    },
    methods: {
        changeTab(name) {
            if (this.$route.path !== "/main") {
                this.$router.push("/main");
            } else {
                this.tab = name;
                this.$emit("tab_value", this.tab);
            }
        }
    }
}
</script>
<style scoped>
.sidebar {
    margin-top: 60px;
    width: 250px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: beige;
    border-right: 1px solid #e9e9e9ee;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}
li {
    margin: 20px;
    background-color: white;
    border-radius: 10px;
    transition: background-color 0.3s, transform 0.3s;
    cursor: pointer;
}
p {
    margin: 0;
    padding: 16px;
    font-size: 16px;
    text-align: center;
    color: black;
}
li:hover {
    background-color: #E7E3D2;
}
li.checked {
    background-color: #FFE45B;
    font-weight: bold;
}
li.checked p {
    color: #333;
}
</style>
