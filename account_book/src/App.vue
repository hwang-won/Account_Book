<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MainView from '@/views/mainView.vue';
import LoginView from '@/views/loginView.vue';
import FullCalendar from '@/views/fullCalendar.vue';
export default {
  name : "App",
  components : {MainView, LoginView, FullCalendar},
  data(){
    return{
      tabs: ""
    }
  }
}
</script>

<style>

</style>
