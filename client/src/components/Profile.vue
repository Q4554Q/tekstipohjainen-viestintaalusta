<template>
	<div id="profile">
		<div id="profile-info" class="container pt-3 my-3 fs-5 text-left">
			User name: {{accountName}}<br>
			Your score: <b>{{score}}</b><br>
			<br>
			Threads you have posted on:
		</div>
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
			score: 44,
			accountName: 'Herbertti',
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
#profile-info{
	width: 800px;
}
</style>
