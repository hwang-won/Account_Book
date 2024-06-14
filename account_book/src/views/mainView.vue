<template>
  <div class="main-container">
    <Header class="header" @toggle_aside="toggle_aside" />
    <Aside class="aside" v-if="asideOpen" @tab_value="update_body" @tab_home="update_home"
      v-bind:create_tab="create_tab" />
    <div class="content" :class="{ 'content-with-aside': asideOpen }">
      <component :is="tabs" ref="listComponent"></component>
    </div>
    <Toggle class="toggle" @add-transaction="handleAddTransaction" />
  </div>
</template>

<script>
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import Body from '@/components/body/body.vue';
import Client from '@/components/body/client.vue';
import Detail from '@/components/body/detail.vue';
import List from '@/components/body/list.vue';
import Notice from '@/components/body/notice.vue';
import Toggle from '@/components/body/addToggle.vue';

export default {
  name: "MainView",
  components: { Header, Aside, Body, Client, Detail, List, Notice, Toggle },
  data() {
    return {
      tabs: "Body",
      create_tab: "Body",
      asideOpen: false,
      checkLoginInterval: null
    };
  },

  mounted() {
    this.checkloginStatus();
    this.startLoginCheckTimer();
  },

  beforeDestroy() {
    this.stopLoginCheckTimer();
  },
  methods: {
    checkloginStatus() {
      const value = localStorage.getItem("loginKey");
      if (value) {
        console.log("LocalStorage에 값이 있습니다:", value);
      } else {
        console.log("LocalStorage에 값이 없습니다.");
        this.$router.push("/");
      }
    },
    update_body(e) {
      this.tabs = e;
      this.create_tab = this.tabs;
    },
    update_home(e) {
      this.tabs = e;
      this.create_tab = this.tabs;
    },
    toggle_aside() {
      this.asideOpen = !this.asideOpen;
    },
    handleAddTransaction(transactionData) {
      if (this.tabs === "Body" && this.$refs.listComponent) {
        this.$refs.listComponent.addTransactionToRecentList(transactionData);
      }
      if (this.tabs === "List" && this.$refs.listComponent) {
        this.$refs.listComponent.handleAddTransaction(transactionData);
      }
    },
    startLoginCheckTimer() {
      console.log("로그인체크")
      this.checkLoginInterval = setInterval(this.checkloginStatus, 5000); // 900000
    },
    stopLoginCheckTimer() {
      if (this.checkLoginInterval) {
        clearInterval(this.checkLoginInterval);
        this.checkLoginInterval = null;
      }
    }

  }
};
</script>

<style scoped>
.header {
  z-index: 4;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  height: 100vh;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1500px;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.content-with-aside {
  margin-left: 150px;
}

.aside {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}

.toggle {
  position: fixed;
  z-index: 5;
}
</style>
