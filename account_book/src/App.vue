<template>
  <div id="app">
    <header/>
    <aside/>
    <router-view/>
  </div>
</template>

<script>
import mainView from '@/views/mainView.vue';
import aside from './components/aside.vue';
import header from './components/header.vue';
export default {
  name : "App",
  components : {mainView, aside, header}
}
</script>
<style>
  
</style>