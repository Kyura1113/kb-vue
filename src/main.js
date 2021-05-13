import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

import less from 'less'
Vue.use(less)

import { Button, Layout, Switch, Icon, Affix, Menu, Input, Tabs, Breadcrumb, Popover, Upload, Modal, Tag, AutoComplete, Anchor, message } from 'ant-design-vue';
Vue.use(Menu)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Switch)
Vue.use(Icon)
Vue.use(Affix)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(Breadcrumb)
Vue.use(Popover)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Tag)
Vue.use(AutoComplete)
Vue.use(Anchor)
Vue.prototype.$message = message

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import './variables.less'

Vue.prototype.$http = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
