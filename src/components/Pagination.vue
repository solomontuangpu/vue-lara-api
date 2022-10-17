<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">  
            <li class="page-item" 
                :class="{'active': link.active, 'disabled' : !link.url}" 
                v-for="link in links" 
                :key="link.id"
            >
                <a class="page-link" @click.prevent="go(link.url)" href="#">{{ link.label }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            links: {
                type: Array,
            },
        },
        methods: {
            go(url) {
               this.$emit("fetchUrl", url);
            },
            changeLinks() {
                this.links[0].label = "Prev";
                this.links[this.links.length-1].label = "Next";
            }
        },
        mounted () {
            this.changeLinks();
        },
        updated () {
            this.changeLinks();
        },
    }
</script>

<style>

</style>