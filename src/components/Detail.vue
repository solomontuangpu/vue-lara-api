<template>
  <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="productDetailModalLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Name: {{ name }}</p>
            <p>Price: {{ price }}</p>
            <p>Stock: {{ stock }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
       props: {
        title: {
            type: String,
            default: "title"
        },
        name: {
            type: String,
        },
        price: {
            type: Number
        },
        stock : {
            type: Number
        }
    
       },
    }
</script>

<style lang="scss" scoped>

</style>