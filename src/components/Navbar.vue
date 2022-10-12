<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <router-link class="navbar-brand" to="/">Lara Vue</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                   
                    <template v-if="auth === null">
                        <li class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                               {{ auth.name }}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#" 
                                    @click="logout()">Logout</a></li>
                            </ul>
                        </li>
                    </template>
                  
                </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
    computed: {
      ...mapState([
        "auth",
        "token",
      ]),
      ...mapGetters([
        "getUrl"
      ])
    },
    methods: {
        logout(){
           let headers = new Headers();
           headers.append("Authorization", "Bearer "+this.token);
           fetch(this.getUrl("logout"), {
                method: "POST",
                headers
           }).then(res => res.json())
                .then(json => {
                    if(json.success === true){

                        localStorage.removeItem("token");
                        localStorage.removeItem("auth");

                        this.$store.dispatch("logout");
                        this.$router.push("/login")
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>