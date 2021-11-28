<template>
	<div id="thread-list">
			<Message v-for="thread in threads" :key="thread.date" v-bind:message_data="thread" @click="openThread()"/>
	</div>
</template>

<script>
import Message from './Message'

export default {
	name: 'ThreadList',
	components: {
		Message
	},
	data () {
		return {
			threads: [
				{
					writer_id: 1,
					content: 'Mistä saa parhaan rullakebun?',
					score: 12,
					posted_time: '11.12.2021'
				},
				{
					writer_id: 1,
					content: 'Onko missään bileitä?',
					score: -3,
					posted_time: '12.12.2021'
				},
				{
					writer_id: 1,
					content: 'Kattokaa mun lankaa',
					score: 4,
					posted_time: '13.12.2021'
				}
			],
			messages: [
				{
					writer_id: 2,
					content: 'Äiti mä oon internetissä',
					score: 12,
					posted_time: '13.12.2021'
				},
				{
					writer_id: 3,
					content: 'EBIN TROLORLROR',
					score: -3,
					posted_time: '13.12.2021'
				},
				{
					writer_id: 4,
					content: '@2 on apina!',
					score: 4,
					posted_time: '13.12.2021'
				}
			]
		}
	},
	methods: {
		getMessagesForThread () {		}
	},
	openThread () { }
}
</script>

<style scoped>

</style>
