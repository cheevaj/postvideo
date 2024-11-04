<template>
  <div class="custom-font custom-scrollbar">
    <v-card-text>
      <v-row>
        <v-col>
          <v-card flat height="250px" class="rounded-0">
            <canvas id="nyViewDoughnut" height="110"></canvas>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <Table
        height="240"
        class="custom-scrollbar"
        :row-class-name="rowClassName"
        :columns="columns"
        :data="dataPie"
      ></Table>
    </v-card-text>
  </div>
</template>

<script>
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
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
          name: 'ໜັງ',
          value: 83,
        },
        {
          name: 'ກະຕຸນ',
          value: 75,
        },
        { name: 'ອາຫານ', value: 64 },
        {
          name: 'ຂ່າວສານ',
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
                  color:params.row.color,
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
  },
  methods: {
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
      const ctx = document.getElementById('nyViewDoughnut').getContext('2d')

      if (this.myChartBar) {
        this.myChartBar.destroy()
      }
      const chartData = {
        labels: this.data.map((item) => item.value),
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
        type: 'bar',
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
                const total = dataset.data.reduce(
                  (acc, value) => acc + value,
                  0
                )
                const percentage = ((currentValue / total) * 100).toFixed(2)
                return `${percentage}%`
              },
            },
          },
          plugins: {
            datalabels: {
              display: true,
              color: '#000',
              anchor: 'end',
              formatter: (value, ctx) => {
                const total = ctx.chart.data.datasets[0].data.reduce(
                  (acc, value) => acc + value,
                  0
                )
                const percentage = ((value / total) * 100).toFixed(2)
                return `${percentage}%`
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

</style>
