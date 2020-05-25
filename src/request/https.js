import axios from 'axios'
import QS from 'qs'
import {imgUrl} from '../assets/js/base'        
import {Toast} from 'vant'

axios.defaults.timeout = 10000
axios.defaults.withCredentials = false
axios.defaults.baseURL = imgUrl

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = config.data
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded',
      'token': localStorage.getItem('loginToken')
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//封装get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      if(res.data.code == 1){
        Toast({
          message: res.data.msg,
          duration: 1000,
          onClose(){
            location.href = ''
          }
        })
      }else{
        resolve(res.data)
      }
    }).catch(err => {
      reject(err.data)
    })
  });
}
//封装post方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        if(res.data.code == 1){
          Toast({
            message: res.data.msg,
            duration: 1000,
            onClose(){
              location.href = ''
            }
          })
        }else{
          resolve(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  });
}