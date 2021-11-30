<template>
	<div id="mainview">
		<TopBar class="fixed-top" @return-clicked="openThreadList" @newthread-clicked="openNewThread" @profile-clicked="openProfile"/>
		<div class="container pt-3 mt-5"/>
		<ThreadList v-if="mainViewState === showThreadList" v-bind:threads="threads" @open-thread="openThread"/>
		<Thread v-else-if="mainViewState === showThread" v-bind:messages="messages"/>
		<NewThread v-else-if="mainViewState === showNewThread"></NewThread>
		<Profile v-else-if="mainViewState === showProfile" @open-thread="openThread"/>
	</div>
</template>

<script>
import Thread from './Thread'
import ThreadList from './ThreadList'
import TopBar from './TopBar'
import NewThread from './NewThread'
import Profile from './Profile'

export default {
	name: 'MainView',
	components: {
		NewThread,
		TopBar,
		Thread,
		ThreadList,
		Profile
	},
	data () {
		return {
			showThreadList: 0,
			showNewThread: 1,
			showThread: 2,
			showProfile: 3,
			mainViewState: 0,
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
			},
			{
				thread_id: 4,
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
				thread_id: 5,
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
				thread_id: 6,
				topic: 'main',
				writer_id: 1,
				message: {
					writer_id: 1,
					content: 'Mistä saa parhaan rullakebun?',
					score: 12,
					posted_time: '11.12.2021'
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
		openThreadList () {
			this.mainViewState = this.showThreadList
		},
		openThread (threadId) {
			this.thread_id = threadId
			this.mainViewState = this.showThread
		},
		openNewThread () {
			this.mainViewState = this.showNewThread
		},
		openProfile () {
			this.mainViewState = this.showProfile
		}
	}
}
</script>

<style scoped>

</style>
