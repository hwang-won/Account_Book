<template>
  <div id="app">
    <Header/>
      <router-view/>
        <Toggle/>
  </div>
</template>

<script>
import mainView from '@/views/mainView.vue';
import Header from './components/header.vue';
import Toggle from './components/body/addToggle.vue';
export default {
  name : "App",
  components : {mainView,Header,Toggle}
}
</script>
<style>
  
</style>