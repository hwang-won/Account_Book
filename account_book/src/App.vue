<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MainView from '@/views/mainView.vue';
import LoginView from '@/views/loginView.vue';

export default {
  name: "App",
  components: { MainView, LoginView },
  data() {
    return {
      tabs: ""
    };
  },
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload(event) {
      const message = '종료 전 확인메세지';
      event.returnValue = message; 
      return message; 
    }
  }
}
</script>

<style>

</style>
