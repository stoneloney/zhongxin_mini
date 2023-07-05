import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultState = () => {
	return {
		store: {},
		member: {},
		openid: '',
		token: ''
	}
}

const store = new Vuex.Store({
	 state: {
		 store: {},
		 member: {},
		 openid: '',
		 token: ''
	 },
	 getters: {
		 isLogin: state => Object.keys(state.member).length > 0,   // 是否登录
	 },
	 mutations: {
		 SET_MEMBER(state, member) {
			 state.member = member
		 },
		 SET_STORE(state, store) {
			 state.store = store
		 },
		 SET_OPENID(state, openid) {
			state.openid = openid
		 },
		 SET_TOKEN(state, token) {
			state.token = token
		 },
		 CLEAR_MEMBER() {
			 state.member = {}
		 }
	 }
})

export default store