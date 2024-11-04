<template>
  <div>
    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="7"
      color="rgb(255, 215, 0)"
      style="border-radius: 4px; "
      @input="emitPage"
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / 5)
    },
  },
  methods: {
    emitPage() {
      this.$emit('updatePage', this.page)
    },
    changePage(item) {
      this.page = item
      this.emitPage()
    },
  },
}
</script>
