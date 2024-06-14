<template>
    <div class="sidebar">
        <ul class="menu">
            <li @click="changeTab('Body')" :class="{ checked: tab === 'Body' }">
                <p>Home</p>
            </li>
            <li @click="changeTab('List')" :class="{ checked: tab === 'List' }">
                <p>거래내역</p>
            </li>
            <li @click="changeTab('Notice')" :class="{ checked: tab === 'Notice' }">
                <p>공지사항</p>
            </li>
            <li @click="changeTab('Client')" :class="{ checked: tab === 'Client' }">
                <p>고객문의</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Aside",
    data() {
        return {
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
    background-color: #e7e3d2; 
}
li.checked {
    background-color: #ffe45b; 
    font-weight: bold;
}
li.checked p {
    color: #333;
}
</style>
