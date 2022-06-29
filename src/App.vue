<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> <br>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  
import {normal} from './http'

  export default{
created(){
           normal().then((res)=>{console.log(res)})
}

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
