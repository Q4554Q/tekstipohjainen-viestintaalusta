<template>
	<div id="profile">
		Your score: {{score}}
		<ThreadList v-on="$listeners" v-bind:threads="threads"/>
	</div>
</template>

<script>
import ThreadList from './ThreadList'

export default {
	name: 'Profile',
	components: {
		ThreadList
	},
	data () {
		return {
			Score: 44,
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
			}
			]
		}
	}
}
</script>

<style scoped>

</style>
