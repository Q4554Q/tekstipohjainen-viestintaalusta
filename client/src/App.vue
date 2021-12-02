<template>
	<div id="app">
		<LoginView v-if="showLogin" @login-clicked="handleLogin"/>
		<MainView v-else />
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
			token: '',
			messages: [{
				writer_id: 1,
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
				score: 12,
				posted_time: '13.12.2021'
			},
			{
				writer_id: 2,
				content: 'EBIN TROLORLROR',
				score: -3,
				posted_time: '13.12.2021'
			},
			{
				writer_id: 666,
				content: '@2 on apina!',
				score: 4,
				posted_time: '13.12.2021'
			}
			]
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
