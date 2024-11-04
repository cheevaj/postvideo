import Vue from 'vue'
import { Bar, Line } from 'vue-chartjs'

Vue.component('BarChart', {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('LineChart', {
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
