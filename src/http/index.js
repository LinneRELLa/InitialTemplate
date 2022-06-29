import axios from 'axios'


const http=axios.create({
	baseURL:'./api'

})


http.interceptors.request.use(
    config=>{

config.headers.axios=true;
  return config;
    }

	)

const normal=()=>{return http({
	method:'post',
	url:'/api/Films'
})}  

export {normal}