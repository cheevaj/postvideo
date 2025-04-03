module.exports = {
  apps: [
    {
      name: 'VideoAdmin',
      exec_mode: 'fork',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
	  args: 'start'
    }
  ]
}
