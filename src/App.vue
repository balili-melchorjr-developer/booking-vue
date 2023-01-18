<template>
  <router-view />
</template>
<script>
import { api } from 'boot/axios'

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {

    }
  },

  beforeCreate() {
    this.$store.commit('initializeStore')

    if (this.$store.state.token) {
      api.defaults.headers.common['Authorization'] = "Token " + this.$store.state.token
    } else {
      api.defaults.headers.common['Authorization'] = ""
    }
  }
})
</script>
