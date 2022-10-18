<template>
    <div class="container">
        <div class="row my-4">
            <div class="col-12">
                <h3>Product Edit</h3>
                <hr>
                <form action="" @submit.prevent="updateProduct" ref="productUpdate">
                   <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <Input label="Product Name"
                                        :errors="errors"
                                        :value="product.name"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <Input label="Price" 
                                        type="number" 
                                        name="price"  
                                        :value="product.price"
                                        :errors="errors" 
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <Input label="Stock" 
                                        type="number" 
                                        name="stock"
                                        :value="product.stock"
                                        :errors="errors" 
                                />
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
                                    <span class="sr-only">Update Product</span>
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
            productId : this.$route.params.id,
            errors: {},
            isLoading: false,
            product: ""
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
                            timer: 2000,
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

        updateProduct() {
            this.isLoading = true;
            let formData = new FormData(this.$refs.productUpdate);
            let newForm = new URLSearchParams(formData).toString();
           
            axios.put(this.getUrl("products/"+ this.productId), newForm)
                .then(res => {
                     //clearErrorMessage
                    this.errors = {};
                    if(res.data.success === true){
                        this.showToast("success", res.data.message);
                        this.product = res.data.product;
                        this.$router.push('/products')
                    }
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                    this.showToast("error", err.response.data.message);
                })
                .finally( ()=>{
                    this.isLoading = false
                })
        },

        fetchProduct(id) {
            axios.get(this.getUrl("products/"+ id))
                .then(res => {
                    this.product = res.data.data;
                })
        }
    },
    mounted () {
        this.fetchProduct(this.productId);
    },
}
</script>

<style>

</style>

