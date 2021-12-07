<template>
	<div id="mainview">
		<TopBar class="fixed-top" @return-clicked="openThreadList" @newthread-clicked="openNewThread"
				@profile-clicked="openProfile"/>
		<div class="container pt-4 mt-5"/>
		<ThreadList v-if="mainViewState === showThreadList" v-bind:threads="threads" @open-thread="openThread"/>
		<Thread v-else-if="mainViewState === showThread" v-bind:threadId="threadId" v-bind:token="token"/>
		<NewThread v-else-if="mainViewState === showNewThread" v-bind:token="token" @thread-created="openThreadList"/>
		<Profile v-else-if="mainViewState === showProfile" v-bind:token="token" @open-thread="openThread" v-on="$listeners"/>
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
		}
	}
}
</script>

<style scoped>

</style>
