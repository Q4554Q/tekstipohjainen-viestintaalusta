<template>
	<div id="mainview">
		<TopBar class="fixed-top" @return-clicked="openThreadList" @newthread-clicked="openNewThread"
				@profile-clicked="openProfile"/>
		<div class="container pt-4 mt-5"/>
		<ThreadList v-if="mainViewState === showThreadList" :threadData="threads" @open-thread="openThread"/>
		<Thread v-else-if="mainViewState === showThread" :threadId="threadId" v-bind:token="token"/>
		<NewThread v-else-if="mainViewState === showNewThread" @thread-created="openThreadList"/>
		<Profile v-else-if="mainViewState === showProfile" @open-thread="openThread" v-on="$listeners"/>
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
			threadId: null,
			threads: []
		}
	},
	methods: {
		openThreadList () {
			this.getThreads()
			this.mainViewState = this.showThreadList
		},
		openThread (threadId) {
			this.threadId = threadId
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
						Authorization: `bearer ${window.accessToken}`
					}
				})

				this.threads = data
				console.log(this.threadData)

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
	},
	created () {
		this.getThreads()
	}
}
</script>

<style scoped>

</style>
