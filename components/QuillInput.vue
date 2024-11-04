<template>
    <div>
      <quill-editor v-model="content" :options="editorOptions" style="background-color: #FFFF;"></quill-editor>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        content: '',
        editorOptions: {
          theme: 'snow',
        }
      }
    }
  }
  </script>
  