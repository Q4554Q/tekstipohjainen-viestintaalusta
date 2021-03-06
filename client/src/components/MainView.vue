<template>
	<div id="mainview">
		<TopBar class="fixed-top" @return-clicked="openThreadList" @newthread-clicked="openNewThread"
				@profile-clicked="openProfile"/>
		<div class="container pt-4 mt-5"/>
		<ThreadList v-if="mainViewState === showThreadList" :threadData="threads" @open-thread="openThread"/>
		<Thread v-else-if="mainViewState === showThread" :threadId="threadId" @thread-deleted="openThreadList"/>
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
		/**
			* Sets the mainViewState to equal a value which makes the v-if condition in ThreadList true.
			*/
		openThreadList () {
			this.getThreads()
			this.mainViewState = this.showThreadList
		},
		/**
			* Sets the mainViewState to equal a value which makes the v-if condition in Thread true.
			* @param threadId Id of the thread that opens
			*/
		openThread (threadId) {
			this.threadId = threadId
			this.mainViewState = this.showThread
		},
		/**
			* Sets the mainViewState to equal a value which makes the v-if condition in NewThread true.
			*/
		openNewThread () {
			this.mainViewState = this.showNewThread
		},
		/**
			* Sets the mainViewState to equal a value which makes the v-if condition in Profile true.
			*/
		openProfile () {
			this.mainViewState = this.showProfile
		},
		/**
			* Gets all of the threads that will be shown in ThreadList from the database and saves them
			* into this components' data.
			* @returns {Promise<void>}
			*/
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
				this.error = 0
			} catch (error) {
				this.error = 5

				if (error.response.status === 401) {
					this.$emit('logout-clicked')
				}

				if (error.response) {
					this.errorMessage = error.response.data.error
				} else {
					this.errorMessage = error.message
				}
			}
			this.pending = false
		}
	},
	/**
		* Calls the getThreads function when the MainView component is created
		*/
	created () {
		this.getThreads()
	}
}
</script>

<style scoped>

</style>
