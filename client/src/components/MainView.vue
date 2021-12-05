<template>
	<div id="mainview">
		<TopBar class="fixed-top" @return-clicked="openThreadList" @newthread-clicked="openNewThread"
				@profile-clicked="openProfile"/>
		<div class="container pt-3 mt-5"/>
		<ThreadList v-if="mainViewState === showThreadList" v-bind:threads="threads" @open-thread="openThread"/>
		<Thread v-else-if="mainViewState === showThread" v-bind:messages="messages"/>
		<NewThread v-else-if="mainViewState === showNewThread" v-bind:token="token" @thread-created="openThreadList"/>
		<Profile v-else-if="mainViewState === showProfile" v-bind:token="token" @open-thread="openThread"/>
	</div>
</template>

<script>
import Thread from './Thread'
import ThreadList from './ThreadList'
import TopBar from './TopBar'
import NewThread from './NewThread'
import Profile from './Profile'
import axios from 'axios'

export default {
	name: 'MainView',
	components: {
		NewThread,
		TopBar,
		Thread,
		ThreadList,
		Profile
	},
	props: {
		token: String
	},
	data () {
		return {
			showThreadList: 0,
			showNewThread: 1,
			showThread: 2,
			showProfile: 3,
			mainViewState: 0,
			pending: false,
			error: 0,
			errorMessage: '',
			thread_id: null,
			threads: {},
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
	created () {
		this.getThreads()
	},
	methods: {
		openThreadList () {
			this.mainViewState = this.showThreadList
			this.getThreads()
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
		},
		async getThreads () {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.get('/api/threads', {
					headers: {
						Authorization: `bearer ${this.token}`
					}
				})

				this.threads = data
				console.log(this.threads)

				this.error = 0
			} catch (error) {
				this.error = 5
				if (error.response) {
					this.errorMessage = error.response.data.error
				} else {
					this.errorMessage = error.message
				}
			}
			this.pending = false
		}
	}
}
</script>

<style scoped>

</style>
