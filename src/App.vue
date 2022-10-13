<template>
  <Navbar />
  <router-view/>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  import * as bootstrap from "bootstrap";
  import store from '@/store'
  import axios from "axios"

  export default {
    components : {
      Navbar
    },
    created () {
      if(localStorage.getItem("auth") && localStorage.getItem("token")){
         store.dispatch("setAuth", JSON.parse(localStorage.getItem("auth")));
         store.dispatch("setToken", localStorage.getItem("token"));

         axios.defaults.headers.common["Authorization"] =
                                   "Bearer "+ localStorage.getItem("token");
      }
    },
  }
</script>

<style lang="scss">
@import "app.scss";
</style>
