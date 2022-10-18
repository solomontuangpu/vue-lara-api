<template>
    <label :for="name" class="form-label">{{ label }}</label>
    <input :type="type"  
            :name="name" 
            :id="name" 
            :value="value"
            :class="{ 'is-invalid' : errors[name] }"
            class="form-control"
        >
    <div class="text-danger invalid-feedback" v-if="errors[name]">
        {{ errors[name][0] }}
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: "Input Label"
            },
            type: {
                type: String,
                default: "text"
            },
            name: {
                type: String,
                default: "name"
            },
            errors: {
                type: Object,
                default: {}
            },
            value: {
                default: null
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>