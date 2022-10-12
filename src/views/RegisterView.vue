<template>
    <div class="">
       <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-lg-4">
                <h3 class="">Register Form</h3>
                <hr>
                <form action="" @submit.prevent="register" ref="registerForm">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" name="name" placeholder="name@example.com">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input type="email" class="form-control" name="email" id="floatingEmail" placeholder="Email">
                        <label for="floatingEmail">Email</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input type="password" class="form-control" name="password" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input type="password" class="form-control" name="password_confirmation" id="floatingConfirmPassword" placeholder="Confirm Password">
                        <label for="floatingConfirmPassword">Confirm Password</label>
                    </div>
                    <button class="btn btn-primary">Register</button>
                </form>
            </div>
       </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    export default {
        computed: {
            ...mapGetters([
                "getUrl"
            ])
        },
            methods: {
            register() {
                let formData = new FormData(this.$refs.registerForm)

                fetch(this.getUrl("register"), {
                    method: "POST",
                    body : formData
                }).then(res => res.json())
                    .then(json => {
                        if(json.success === true){
                            this.$router.push('login')
                        }
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
