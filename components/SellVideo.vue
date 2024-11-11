<template>
  <div>
    <br />
    
     <v-card-text class="px-2 text-center">
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 style="color: #b3b3b3;">Not data</h2>
      </div>
    <!--  <v-btn @click="fetchData">reset</v-btn>
      <v-card-text class="px-0 pt-2 pb-0">
        <v-card
          flat
          class="rounded-0 custom-card-right"
          :width="`calc(100vw - 1px)`"
          style="padding: 8px"
        >
          <v-card
            outlined
            style="
              border-radius: 4px;
              height: 280px;
              width: calc(100vw - 1px);
              background-color: #ffff;
            "
          >
          <v-card flat height="240px" class="rounded-0 pa-1">
            <canvas id="myViewbarChart" height="95"></canvas>
          </v-card>
          </v-card>
        </v-card>
        <v-divider></v-divider>
        <v-card
          flat
          class="rounded-0 custom-card-right"
          :width="`calc(100vw - 1px)`"
          :height="`calc(100vh - (55vh + 8px))`"
          style="padding: 8px"
        >
          <v-card
            outlined
            style="border-radius: 4px; height: 280px; width: calc(100vw - 1px)"
          >
            Data
          </v-card>
        </v-card>
      </v-card-text> -->
    </v-card-text> 
  </div>
</template>
<!-- <script>
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
export default {
  name: 'PostPage',
  props: {
    video: Array,
    type: Array,
  },
  data() {
    return {
      colorBK: [
        'rgba(0, 143, 251)',
        'rgba(0, 227, 150)',
        'rgba(254, 176, 25)',
        'rgba(241, 82, 105)',
        'rgba(114, 94, 182)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(25, 159, 64)',
        'rgba(254, 19, 64)',
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(25, 159, 64)',
        'rgba(254, 19, 64)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(25, 159, 64)',
      ],
      data: [
        {
          name: '01',
          value: 83,
        },
        { name: '02', value: 64 },
        {
          name: '03',
          value: 75,
        },
        {
          name: '04',
          value: 62,
        },
      ],
      columns: [
        {
          title: 'ປະເພດ',
          key: 'name',
          renderHeader: (h) => {
            return h('h3', 'ປະເພດ')
          },
          render: (h, params) => {
            return h(
              'h3',
              {
                style: {
                  borderRadius: '4px',
                },
              },
              params.row.name
            )
          },
        },
        {
          title: 'ສີ',
          key: 'color',
          render: (h, params) => {
            return h('div', {
              style: {
                backgroundColor: params.row.color,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
              },
            })
          },
        },
        {
          title: 'ຈໍານອນ',
          key: 'value',
          render: (h, params) => {
            return h(
              'h4',
              {
                style: {
                  borderRadius: '4px',
                  color: params.row.color,
                },
              },
              params.row.value
            )
          },
        },
      ],
      dataPie: [],
      myChartBar: null,
    }
  },
  mounted() {
    this.initializeData()
    this.createChart()
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('view-video:', this.video)
      console.log('view-type:', this.type)
    },
    rowClassName(row, index) {
      if (index % 2 === 0) {
        return 'even-row'
      }
      return 'odd-row'
    },
    initializeData() {
      this.dataPie = this.data.map((item, index) => ({
        ...item,
        color: this.colorBK[index % this.colorBK.length],
      }))
    },
    createChart() {
      const ctx = document.getElementById('myViewbarChart').getContext('2d')

      if (this.myChartBar) {
        this.myChartBar.destroy()
      }
      const chartData = {
        labels: this.data.map((item) => item.name),
        datasets: [
          {
            label: 'User Values',
            data: this.data.map((item) => item.value),
            backgroundColor: this.colorBK,
            borderColor: 'rgba(255, 255, 255)',
            borderWidth: 1,
          },
        ],
      }
      this.myChartBar = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex]
                const currentValue = dataset.data[tooltipItem.index]
                const percentage = currentValue;
                return percentage;
              },
            },
          },
          plugins: {
            datalabels: {
              display: true,
              color: '#000',
              anchor: 'end',
              formatter: (value) => {
                return value;
              },
              font: {
                weight: 'bold',
              },
            },
          },
        },
        plugins: [ChartDataLabels],
      })
    },
  },
}
</script>
<style>
.color-text {
  color: rgb(115, 115, 115);
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}

.custom-scrollbar {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(255, 215, 0) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px; 
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(255, 215, 0);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background-color: transparent; 
}

</style> -->
