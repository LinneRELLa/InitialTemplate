<template>
  <div id="app">
    <div id="nav">
    

<router-link v-for="route in routes" :key="route.path" :to="route.path">
        <div >{{route.name}}</div>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  
import {normal} from './http'

  export default{
created(){

           normal().then((res)=>{console.log(res)})
},
mounted(){

  console.log(this.$store.state.permission)
},
computed:{
routes() {
  
  return this.$router.options.routes
}
},

  }





</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

#nav {

background: rgba(244,245,247);
}
</style>
