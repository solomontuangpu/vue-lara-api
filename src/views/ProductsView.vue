<template>
    <div class="container">
       <div class="row mt-3">
            <div class="col-12">
                <h3>Product List</h3>
                <hr>
                <table class="table table-bordered text-center align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products.data" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td class="text-start">{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.stock }}</td>
                            <td>{{ product.date }}</td>
                            <td>{{ product.time }}</td>
                            <td>
                                <div class="btn-group">
                                    <button 
                                        @click="fetchProduct(product.id)" 
                                        class="btn btn-sm btn-outline-primary"
                                        id="showProductDetail"
                                    >
                                        <i class="bi bi-info-circle"></i>
                                    </button>
                                    <button 
                                        class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                        @click="deleteProduct(product.id)"
                                        class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Product Detail Model -->
                <Detail 
                    title="Product Detail"
                    :name=productDetail.name
                    :price=productDetail.price
                    :stock=productDetail.stock
                />

                <Pagination 
                    v-if="products.meta" 
                    @fetchUrl="fetchProducts"
                    :links="products.meta.links"
                     />
            </div>
       </div>
    </div>
</template>

<script>
import axios from "axios"
import { mapGetters } from 'vuex';

import Detail from '../components/Detail.vue'
import Pagination from '../components/Pagination.vue'

import Modal from 'bootstrap/js/dist/modal';
import Swal from 'sweetalert2'

export default {
    components: { Pagination, Detail },
    data() {
        return {
            products : {},
            productDetail: ""
        }
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
        fetchProducts(url) {
            axios.get(url)
            .then(res => {
                let data = res.data;
                this.products = data;
            })
        },
        fetchProduct(id) {
            axios.get(this.getUrl("products/") + id)
            .then(res => {
               let data = res.data.data;
               this.productDetail = data;    
               
               //showModal with Data
               let myModal = document.getElementById('productDetailModal');
                const modal = new Modal(myModal); // Instantiates your modal
                modal.show(); // shows your modal
             
            })
        },
        deleteProduct(id){
            axios.delete(this.getUrl("products/") + id)
            .then(res=> {
                let currentUrl = this.products.meta.links.find(link => link.active === true).url;
                this.fetchProducts(currentUrl);
                this.showToast("success", res.data.message)
            })
        }
    },
    mounted(){
       this.fetchProducts(this.getUrl("products"));
    }  
}
</script>

<style>

</style>

