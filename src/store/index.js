import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'


Vue.use(Vuex)


const actions={
  GetInfo(mstore,roles){

     return new Promise((resolve,reject)=>{
         resolve([state.Token])
         mstore.commit('GetInfo',[state.Token])
     })},
     Login({commit},Token){

       return new Promise((resolve,reject)=>{
   console.log('Login',Token)
         commit('Login',Token)
     resolve()

       })
    
     }


  }


const mutations={
    Login(state,Token){

      state.Token=Token
      console.log(state.Token,'login')
      localStorage.setItem('Token',Token);
      
    },
    GetInfo(state,roles){
      state.roles=roles
    }

}
const state={
  Token:'',
  roles:[],

} 
const getters={

}
const modules={
 permission
}

const store =new Vuex.Store({
 
actions,
mutations,
state,
modules,
getters



})
export default store;

