<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MainView from '@/views/mainView.vue';
import LoginView from '@/views/loginView.vue';
import noticeView from '@/views/noticeView.vue';
export default {
  name : "App",
  components : {MainView, LoginView, noticeView},
  data(){
    return{
      tabs: ""
    }
  }
}
</script>

<style>

</style>
