<template>
	<div id="mainview">
		<button @click="changeView()">test</button>
		<ThreadList v-if="showThreadList" v-bind:threads="threads" @open-thread="openThread"/>
		<Thread v-else v-bind:messages="messages"/>
		<p>Viimeksi klikatun threadin id: {{thread_id}}</p>
	</div>
</template>

<script>
import Thread from './Thread'
import ThreadList from './ThreadList'

export default {
	name: 'MainView',
	components: {
		Thread,
		ThreadList
	},
	data () {
		return {
			showThreadList: true,
			thread_id: null,
			threads: [{
				thread_id: 1,
				topic: 'main',
				writer_id: 1,
				message: {
					writer_id: 1,
					content: 'Mistä saa parhaan rullakebun?',
					score: 12,
					posted_time: '11.12.2021'
				}
			},
			{
				thread_id: 2,
				topic: 'main',
				writer_id: 1,
				message: {
					writer_id: 1,
					content: 'Onko missään bileitä?',
					score: -3,
					posted_time: '12.12.2021'
				}
			},
			{
				thread_id: 3,
				topic: 'main',
				writer_id: 1,
				message: {
					writer_id: 1,
					content: 'Kattokaa mun lankaa',
					score: 4,
					posted_time: '13.12.2021'
				}
			}
			],
			messages: [
				{
					writer_id: 1,
					content: 'Äiti mä oon internetissä',
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
		changeView () {
			this.showThreadList = !this.showThreadList
		},
		openThread (threadId) {
			this.thread_id = threadId
			this.showThreadList = false
		}
	}
}
</script>

<style scoped>

</style>
