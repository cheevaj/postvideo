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
  props: {
    video: Array,
  },
  name: 'IndexPage',
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Views',
            backgroundColor: 'rgb(254, 176, 25)',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  methods: {
    createChart() {
      const videosWithViews = this.video
        .flatMap(videoItem => videoItem.videos.videoData)
        .map(videoData => ({
          name: videoData.name,
          views: videoData.views,
        }))
      const sortedVideos = videosWithViews.sort((a, b) => b.views - a.views)
      const topVideos = sortedVideos.slice(0, 10)
      this.chartData.labels = topVideos.map(video => video.name)
      this.chartData.datasets[0].data = topVideos.map(video => video.views)
      // console.log('Updated chartData:', this.chartData)
    },
  },
  mounted() {
    this.createChart()
  },
}
</script>
