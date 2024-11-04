<template>
    <div>
      <BarChart
        :data="chartData"
        :options="chartOptions"
        style="height: 100%; width: 100%"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'IndexPage',
    data() {
      return {
        right: true,
        chartData: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: 'rgb(254, 176, 25)',
              data: [83, 76, 65, 45, 30, 28, 12],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
      }
    },
  }
  </script>
  