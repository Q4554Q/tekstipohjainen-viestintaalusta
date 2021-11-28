<template>
	<div id="mainview">
		<button @click="changeView()">test</button>
		<ThreadList v-if="showThreadList" />
		<Thread v-else/>
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
			showThreadList: true
		}
	},
	methods: {
		changeView () {
			this.showThreadList = !this.showThreadList
		}
	}
}
</script>

<style scoped>

</style>
