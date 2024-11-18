<template>
  <div>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="7"
      color="rgb(255, 215, 0)"
      style="border-radius: 4px;"
      @input="emitPage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: this.page,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / 5);
    },
  },
  watch: {
    page(newVal) {
      this.currentPage = newVal;
    },
    currentPage(newVal) {
      this.$emit('updatePage', newVal);
    },
  },
  methods: {
    emitPage() {
      this.$emit('updatePage', this.currentPage);
    },
  },
};
</script>
