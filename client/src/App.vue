<template>
	<div id="app">
		<LoginView v-if="showLogin" @login-clicked="handleLogin"/>
		<MainView v-else v-bind:token="token"/>
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
	methods: {
		handleLogin (token) {
			this.showLogin = false
			this.token = token
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
}
</style>
