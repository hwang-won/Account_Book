<template>
  <div id="app">
    <Header/>
      <router-view/>
  </div>
</template>

<script>
import mainView from '@/views/mainView.vue';
import Header from './components/header.vue';
export default {
  name : "App",
  components : {mainView,Header}
}
</script>
<style>
  
</style>