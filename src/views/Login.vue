<template>
	<div>
		<button @click="login('admin')">以管理员登录</button>
        <button @click="login('normal')">以普通用户登录</button>
	</div>


</template>


<script>
	
export default{



      methods:{
      	login(Token){

      	
          this.$store.dispatch('Login',Token)
     console.log(this.$router.options.routes)
this.$router.go()


      	}
      }



}



</script>