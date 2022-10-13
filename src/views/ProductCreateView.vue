<template>
    <div class="container">
        <div class="row my-4">
            <div class="col-12">
                <h3>Product Create</h3>
                <hr>
                <form action="" @submit.prevent="createProduct" ref="productCreate">
                   <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <Input label="Product Name"
                                        :errors="errors"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <Input label="Price" 
                                        type="number" 
                                        name="price"  
                                        :errors="errors" 
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <Input label="Stock" 
                                        type="number" 
                                        name="stock"
                                        :errors="errors" 
                                />
                            </div>
                        </div>
                   </div>
                   <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="photos" class="form-label">Photos</label>
                                <input type="file" 
                                    name="photos[]" 
                                    id="photos" 
                                    class="form-control" 
                                    :class="{ 'is-invalid' : errors.photos }"
                                    multiple
                                    >
                            <div class="text-danger invalid-feedback" v-if="errors.photos">
                                     {{ errors.photos[0] }}
                            </div>
                            </div>
                        </div>
                   </div>
                   <div class="row">
                        <div class="col-12">
                            <div class="text-center mt-5">
                                <button class="btn btn-primary btn-lg" :disabled="isLoading">
                                    <span v-if="isLoading" 
                                        class="spinner-border spinner-border-sm me-2"     role="status" 
                                        aria-hidden="true"
                                    ></span>
                                    <span class="sr-only">Create Product</span>
                                </button>
                            </div>
                        </div>
                   </div>
                </form>
            </div>
        </div>        
    </div>
</template>

<script>
import axios from "axios"
import Input from "../components/Input.vue"
import { mapGetters } from "vuex"
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            errors: {},
            isLoading: false
        }
    },
    components: {
        Input
    },
    computed: {
       ...mapGetters([
            "getUrl"
       ])
    },
    methods: {
        showToast(color, message){
            const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: color,
                            title: message
                        })
        },

        createProduct() {
            this.isLoading = true;
            let formData = new FormData(this.$refs.productCreate);
            axios.post(this.getUrl("products"), formData)
                .then(res => {
                    if(res.status === 200){
                        this.showToast("success", res.data.message);

                        //clearForm
                        this.$refs.productCreate.reset();

                        //clearErrorMessage
                        this.errors = {};
                    }
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                    this.showToast("error", err.response.data.message);
                })
                .finally( ()=>{
                    this.isLoading = false
                })
        }
    },

}
</script>

<style>

</style>

