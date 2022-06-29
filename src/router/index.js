import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

export const staticroutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
     path:'/login',
     name:'Login',
     component:()=>import('../views/Login'),
            

  }
]
export const dynamicroutes=[
              {

                path:'/AcInfo',
                name:'AcInfo',
                component:()=>import  ('../views/AcInfo'),
                meta:{
                  roles:['admin','normal']
                }

              }
                 

]

// permission.js




const router = new VueRouter({
  mode:'hash',
  base: process.env.BASE_URL,
  routes:staticroutes
})


router.beforeEach(async(to, from, next) => {

  if(!store.state.roles.length&&localStorage.getItem('Token')){
     await store.dispatch('Login',localStorage.getItem('Token'))
      
  }


  console.log('from',from.path,'to',to.path)




  if (store.state.Token) { // 判断是否有token
console.log('已登录')
router.options.routes.forEach((x)=>{if(x.name=='Login'){
  console.log('de',x)
router.options.routes.splice(router.options.routes.indexOf(x),1)

}})
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
   
        // 判断当前用户是否已拉取完user_info信息
      if (store.state.roles.length === 0) {
    
        store.dispatch('GetInfo').then(res => { // 拉取info
          const roles = res;
     
          // 把获取到的role传进去进行匹配，生成可以访问的路由
          store.dispatch('permission/GenerateRoutes',  roles ).then(() => { 
   console.log(store.state.permission)
            // 动态添加可访问路由表（核心代码，没有它啥也干不了）
          store.state.permission.addRoutes.forEach((x)=>{

           console.log('add',x)
            router.addRoute(x)
            router.options.routes.push(x)

       console.log(router)


          })

            
            
            // hack方法 确保addRoutes已完成
            next({ ...to, replace: true })
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
if (to.path == '/login'||to.path == '/AcInfo') {
  console.log('next')
    next();
     

    }
    else{
      next('/login'); // 否则全部重定向到登录页
    }
    
  }

})
export default router
