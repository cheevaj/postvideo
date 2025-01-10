<script>
export default {
  data: () => ({
    model: null,
  }),
}
</script>
<template>
  <div>
    <v-sheet class="mx-auto red pa-0" elevation="8" max-width="800">
      <v-slide-group
        v-model="model"
        class="pa-0"
        active-class="success"
        show-arrows
      >
        <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
          <v-card
            :color="active ? undefined : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="100"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon v-if="active" color="white" size="48"
                  >mdi-close-circle-outline</v-icon
                >
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>
