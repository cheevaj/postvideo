<template>
    <div>
      <v-row>
        <v-col>
          <v-form ref="videoForm" @submit.prevent="submitForm">
            <v-text-field
              v-model="videoData.name"
              label="Video Name"
              required
            ></v-text-field>
            <v-textarea
              v-model="videoData.description"
              label="Description"
              required
            ></v-textarea>
  
            <v-combobox
              v-model="videoCategoryInfo"
              label="Video Category Info"
              multiple
              chips
              clearable
              :items="availableCategories"
              required
            ></v-combobox>
  
            <v-file-input
              v-model="files.img"
              label="Image"
              accept="image/*"
              prepend-icon="mdi-camera"
              required
            ></v-file-input>
            <v-file-input
              v-model="files.bgImg"
              label="Background Image"
              accept="image/*"
              prepend-icon="mdi-image"
              required
            ></v-file-input>
            <v-file-input
              v-model="files.previewImg"
              label="Preview Image"
              accept="image/*"
              prepend-icon="mdi-image"
              multiple
            ></v-file-input>
            <v-file-input
              v-model="files.thumbnail"
              label="Thumbnail"
              accept="image/*"
              prepend-icon="mdi-image"
            ></v-file-input>
            <v-btn color="primary" @click="submitForm">Submit</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoData: {
          name: '',
          description: '',
        },
        videoCategoryInfo: [], // This will now hold an array of selected categories
        availableCategories: ['990886657', '800469563'], // Example categories
        files: {
          img: null,
          bgImg: null,
          previewImg: [],
          thumbnail: null,
        },
      };
    },
    methods: {
      async submitForm() {
        const formData = new FormData();
        formData.append('videoData', JSON.stringify(this.videoData));
        formData.append('videoCategoryInfo', JSON.stringify(this.videoCategoryInfo));
        if (this.files.img) {
          formData.append('img', this.files.img);
        }
        if (this.files.bgImg) {
          formData.append('bgImg', this.files.bgImg);
        }
        if (this.files.previewImg.length) {
          this.files.previewImg.forEach((file) => {
            formData.append('previewImg', file);
          });
        }
        if (this.files.thumbnail) {
          formData.append('thumbnail', this.files.thumbnail);
        }
  
        try {
          const response = await this.$axios.post('http://172.28.17.102:2024/video/addvideo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Response:', response.data);
          alert('Video uploaded successfully!');
        } catch (error) {
          console.error('Error uploading video:', error);
          alert('Failed to upload video.');
        }
      },
    },
  };
  </script>
  