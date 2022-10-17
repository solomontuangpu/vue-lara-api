<template>
      <div class="">
       <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-lg-4">
                <h3 class="">Login Form</h3>
                <hr>
                <form action="" @submit.prevent="login()" ref="loginForm">
                    <div class="form-floating  mb-3">
                        <input type="email" class="form-control" name="email" id="floatingEmail" placeholder="Email">
                        <label for="floatingEmail">Email</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input type="password" class="form-control" name="password" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="btn btn-primary">Login</button>
                </form>
            </div>
       </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"

export default {
    computed: {
        ...mapGetters([
            "getUrl"
        ])
    },
    methods: {
        login() {
            let formData = new FormData(this.$refs.loginForm)

            fetch(this.getUrl('login'), {
                method: "POST",
                body : formData
            }).then(res => res.json())
                .then(json => {
                    if(json.success === true){

                        localStorage.setItem("auth", JSON.stringify(json.auth));
                        localStorage.setItem("token", json.token);

                        this.$store.dispatch("setToken", json.token);
                        this.$store.dispatch("setAuth", json.auth);

                        axios.defaults.headers.common["Authorization"] =
                                   "Bearer "+ localStorage.getItem("token");

                        this.$router.push("/dashboard")
                    }else{
                        console.log(json)
                    }
                })
        }
    },
}
</script>

<style>

</style>
