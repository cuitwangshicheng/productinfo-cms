import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/base.scss'
const MongodbModel = require('./store/mongodb')
// const FiledbModel = require('./store/filedb')

const db = new MongodbModel('cmsDB')
Vue.prototype.$db = db
db.init()

// const filedb = new FiledbModel('fileDB')
// Vue.prototype.$filedb = filedb
// filedb.init()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
