<template>
    <div class="sidebar">
        <ul class="menu">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/list">거래내역</router-link>
            </li>
            <li>
                <router-link to="/notice">공지사항</router-link>
            </li>
            <li>
                <router-link to="/client">고객문의</router-link>
            </li>
        </ul>
    </div>
</template>

<style>
.sidebar {
    margin-top: 60px;
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff2d1;
    border-right: 1px solid #e9e9e9ee;
}

.menu {
    list-style: none;
    padding: 0;
}

.menu li {
    padding: 12px;
    margin: 10px;
    background-color: white;
    border-radius: 10px;
}

.menu li a {
    text-decoration: none;
    color: black;
    font-size: 16px;
}

.router-link-active {
    font-weight: 600;
}
</style>
