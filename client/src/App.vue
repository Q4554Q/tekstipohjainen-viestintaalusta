<template>
	<div id="app">
		<LoginView v-if="showLogin" @login-clicked="handleLogin"/>
		<MainView v-else @logout-clicked="handleLogout"/>
	</div>
</template>

<script>
import MainView from './components/MainView'
import LoginView from './components/LoginView'

export default {
	name: 'App',
	components: {
		LoginView,
		MainView
	},
	data () {
		return {
			showLogin: true,
			token: ''
		}
	},
	created () {
		const token = localStorage.getItem('TOKEN')
		if (token) {
			this.setToken(token)
		}
	},
	methods: {
		handleLogin (token) {
			this.setToken(token)
		},
		handleLogout () {
			this.setToken('')
		},
		setToken (token) {
			this.token = token
			window.accessToken = token
			localStorage.setItem('TOKEN', token)

			this.showLogin = token === ''
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
	background: rgba(30,30,30,50);

}
html {
	background: rgba(30,30,30,50);
}
</style>
