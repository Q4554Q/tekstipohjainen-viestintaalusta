<template>
	<div id="app">
		<MainView />
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Message from './components/Message'
import ThreadList from './components/ThreadList'
import MainView from './components/MainView'
import Thread from './components/Thread'

export default {
	name: 'App',
	components: {
		HelloWorld,
		Message,
		ThreadList,
		Thread,
		MainView
	},
	data () {
		return {
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
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
