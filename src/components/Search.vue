<template>
     <div class="input-group">
        <input v-model="keyword" @keyup="search" class="form-control" type="text">
        <button @click.prevent="search" class="btn btn-sm btn-outline-primary">Search</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyword: ""
            }
        },
        methods: {
            search() {
                this.$emit("search", this.keyword)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>