<script setup>
import router from './router';
import {useRoute} from 'vue-router'

const route = useRoute();
</script>

<template>


    <div class="main-content">
      <router-view></router-view>
    </div>
</template>
 
<style scoped>
</style>