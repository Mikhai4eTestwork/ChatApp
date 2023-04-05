<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return{}
  },
  methods: {
    ...mapActions(['TOKEN_SET'])
  },
  created: function(){
    if (localStorage.getItem('auth')){
      let auth_data = JSON.parse(localStorage.getItem('auth')) 
      this.TOKEN_SET(auth_data)
    }
  }
}
</script>
