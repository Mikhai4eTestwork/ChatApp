import Vue from 'vue'
import Vuex from 'vuex'
import endpoint from '../modules/endpoint'
import auth from '../modules/auth'
import socket from '../modules/socket'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    endpoint,
    auth,
    socket,
  }
})
