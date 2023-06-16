import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultState = () => {
	return {
		store: {},
		member: {}
	}
}

const store = new Vuex.Store({
	 state: {
		 store: {},
		 member: {}, 
	 },
	 getters: {
		 isLogin: state => Object.keys(state.member).length > 0   // 是否登录
	 },
	 mutations: {
		 SET_MEMBER(state, member) {
			 state.member = member
		 },
		 SET_STORE(state, store) {
			 state.store = store
		 },
		 CLEAR_MEMBER() {
			 state.member = {}
		 }
	 }
})

export default store