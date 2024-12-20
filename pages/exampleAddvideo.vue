<template>
  <div>
    <br />
    <v-card class="pa-12">
      <Select
        v-model="localFormUpdate.category"
        multiple
        filterable
        :default-label="localFormUpdate.category"
      >
        <Option
          v-for="(option, index) in filteredCategory"
          :value="option.cateId"
          :key="index"
          >{{ option.name }}</Option
        >
      </Select>
      {{ localFormUpdate.category }}
    </v-card>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      localFormUpdate: { category: [107450146, 690853801, 367836473] },
      category: [],
    }
  },
  computed: {
    filteredCategory() {
      return this.category.filter(
        (item) => item.languageId === this.category[1].languageId
      )
    },
  },
  mounted() {
    this.dataResponseAll()
  },
  methods: {
    async dataResponseAll() {
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:2024/video/getallvideocategory'),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [videocategory] = responses
        this.category = videocategory.data.detail
        console.log(this.category)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
}
</script>
