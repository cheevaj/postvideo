<template>
    <div class="custom-font">
      <canvas id="myChartSell" style="height: 280px;"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js'
  
  export default {
    data() {
      return {
        data: [
          { name: 'tonny', value: 73 },
          { name: 'janny', value: 54 },
          { name: 'janson', value: 42 },
          { name: 'aly', value: 23 },
        ],
        myChartBar: null,
      }
    },
    mounted() {
      this.createChart()
    },
    methods: {
      createChart() {
        const ctx = document.getElementById('myChartSell').getContext('2d')
  
        if (this.myChartBar) {
          this.myChartBar.destroy()
        }
  
        const colorBK = [
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
        ]
  
        const colorBD = [
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
        ]
  
        // Extract labels and values from the data array
        const labels = this.data.map(item => item.name)
        const values = this.data.map(item => item.value)
  
        const chartData = {
          labels,
          datasets: [
            {
              label: 'User Values',
              data: values,
              backgroundColor: colorBK,
              borderColor: colorBD,
              borderWidth: 1,
            },
          ],
        }
  
        this.myChartBar = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: {
            legend: {
              display: true,
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            animation: {
              duration: 1,
              onComplete: () => {
                const chartInstance = this.myChartBar
                const ctx = chartInstance.ctx
                ctx.font = Chart.helpers.fontString(
                  Chart.defaults.global.defaultFontSize,
                  Chart.defaults.global.defaultFontStyle,
                  Chart.defaults.global.defaultFontFamily
                )
                ctx.textAlign = 'center'
                ctx.textBaseline = 'bottom'
                // chartData.datasets.forEach((dataset, i) => {
                //   const meta = chartInstance.controller.getDatasetMeta(i)
                //   meta.data.forEach((bar, index) => {
                //     const data = dataset.data[index]
                //     if (data !== 0) {
                //       ctx.font = 'bold 14px Arial'
                //       ctx.fillText(data, bar._model.x, bar._model.y - 5)
                //     }
                //   })
                // })
              },
            },
          },
        })
      },
    },
  }
  </script>
  
  <style>
  .custom-font {
    font-family: 'Noto Sans Lao', sans-serif;
  }
  </style>
  