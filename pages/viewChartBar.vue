<template>
  <div class="custom-font table-container">
    <v-card-text>
      <v-row>
        <v-col cols="6" class="pa-0">
          <v-card flat height="450px" class="rounded-0">
            <canvas id="nyViewDoughnut" height="180"></canvas>
          </v-card>
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-card
            flat
            height="450px"
            class="rounded-0"
            style="padding: 2px; background-color: #ffff00"
          >
            <Table
              height="446"
              class="table-container"
              :row-class-name="rowClassName"
              :columns="columns"
              :data="dataPie"
            ></Table>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <Table
        height="654"
        class="table-container"
        :row-class-name="rowClassName"
        :columns="columnsTable"
        :data="dataVideo"
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
          name: 'key to data can make the item selected by default.',
          value: 83,
        },
        {
          name: 'You can realise many needed effects by using events below properly',
          value: 75,
        },
        { name: 'Emitted when a row is selected. Return value', value: 64 },
        {
          name: 'Emitted when click select-all checkbox. Return value',
          value: 62,
        },
        {
          name: 'The sorting uses ascending order or descending order by default. ',
          value: 53,
        },
        {
          name: 'props with a function accepting 3 arguments: a, b and type.',
          value: 43,
        },
        { name: 'You can customize sort method by setting', value: 35 },
        {
          name: 'After sorting, you have to set the new data manually. Details on API Doc.',
          value: 32,
        },
        {
          name: 'prop items. It accepts an array. Details on Demo & API Doc.',
          value: 30,
        },
        {
          name: 'After you declare a slot in a column of columns, you can use parameters in the slot of the Table.',
          value: 25,
        },
      ],
      columns: [
        {
          title: 'ຊື່',
          key: 'name',
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
          title: 'ຍອດກົດໄລຣ',
          key: 'value',
        },
      ],
      dataPie: [],
      dataTable: [
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'key to data can make the item selected by default.',
          value: 83,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'You can realise many needed effects by using events below properly',
          value: 75,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'Emitted when a row is selected. Return value',
          value: 64,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'Emitted when click select-all checkbox. Return value',
          value: 62,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'The sorting uses ascending order or descending order by default. ',
          value: 53,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'props with a function accepting 3 arguments: a, b and type.',
          value: 43,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'You can customize sort method by setting',
          value: 35,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'After sorting, you have to set the new data manually. Details on API Doc.',
          value: 32,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'prop items. It accepts an array. Details on Demo & API Doc.',
          value: 30,
        },
        {
          imge: 'https://wallpaperaccess.com/full/1356284.jpg',
          name: 'After you declare a slot in a column of columns, you can use parameters in the slot of the Table.',
          value: 25,
        },
      ],
      columnsTable: [
        {
          title: 'ວີດີໂອ',
          key: 'imge',
          width: '200',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.imge,
                alt: params.row.name,
                width: '135',
                height: '86',
              },
              style: {
                marginTop: '5px',
                borderRadius: '4px',
              },
            })
          },
        },
        {
          title: 'ຊື່',
          key: 'name',
        },
        {
          title: 'ສີ',
          key: 'color',
          width: '100',
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
          title: 'ຍອດຂາຍ',
          key: 'value',
          width: '150',
        },
      ],
      dataVideo: [],
      myChartBar: null,
    }
  },
  mounted() {
    this.initializeData()
    this.createChart()
    this.initializeDataTable()
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
    initializeDataTable() {
      this.dataVideo = this.dataTable.map((item, index) => ({
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
              anchor: 'end', // Position label relative to the end of the bar
              align: 'top', // Align label to the top of the bar
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

.table-container {
  height: 100%;
  overflow-y: auto;
}

.table-container ::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: rgb(255, 215, 0);
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
</style>
