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
      columns: [
        {
          title: 'ປະເພດໜັງ',
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
      columnsTable: [
        {
          title: 'ວີດີໂອ',
          key: 'imge',
          width: '200',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: `https://apicenter.laotel.com:9443/tplussocial?img=${params.row.img}`,
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
      dataVideo: [],
      myChartBar: null,
    }
  },
  computed: {
    setData() {
      return this.type.map((typeItem) => {
        const matchingVideo = this.video.find(
          (videoItem) => videoItem.typeId === typeItem.typeId
        )
        return {
          languageId: typeItem.languageId || '',
          name: typeItem.name || '',
          typeId: typeItem.typeId,
          videoData: matchingVideo ? matchingVideo.videos.videoData : [],
          value: matchingVideo ? matchingVideo.videos.videoData.length : 0,
        }
      })
    },
  },
  mounted() {
    this.initializeData()
    this.initializeDataTable()
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
      this.dataPie = this.setData.map((item, index) => ({
        ...item,
        color: this.colorBK[index % this.colorBK.length],
      }))
    },
    initializeDataTable() {
      const currentData = this.setData[this.tabItem]
      if (currentData) {
        this.dataVideo = currentData.videoData.map((video, index) => ({
          ...video,
          color: this.colorBK[index % this.colorBK.length],
          value: video.views || 0,
        }))
      }
    },
    createChart() {
      console.log('data-T:', this.setData)
      const ctx = document.getElementById('nyViewDoughnut').getContext('2d')
      if (this.myChartBar) {
        this.myChartBar.destroy()
      }
      const chartData = {
        labels: this.setData.map((item) => item.name),
        datasets: [
          {
            label: 'User Values',
            data: this.setData.map((item) => item.value),
            backgroundColor: this.colorBK,
            borderColor: 'rgba(255, 255, 255)',
            borderWidth: 1,
          },
        ],
      }
      this.myChartBar = new Chart(ctx, {
        type: 'pie',
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
              color: '#fff',
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
