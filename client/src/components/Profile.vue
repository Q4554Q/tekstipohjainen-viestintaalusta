<template>
	<div id="profile">
		<div id="profile-info" class="container pt-3 my-3 fs-5 text-left">
			User name: {{data.username}}<br>
			Your score: <b>{{data.score}}</b><br>
			<br>
			Threads you have posted on:
		</div>
		<ThreadList v-on="$listeners" v-bind:threads="data.threads"/>
	</div>
</template>

<script>
import ThreadList from './ThreadList'
import axios from 'axios'

export default {
	name: 'Profile',
	components: {
		ThreadList
	},
	props: {
		token: String
	},
	data () {
		return {
			pending: false,
			error: 0,
			errorMessage: '',
			data: {}
		}
	},
	methods: {
		async getData () {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.get('/api/users/me', {
					headers: {
						Authorization: `bearer ${this.token}`
					}
				})

				this.data = data
				console.log(this.data)

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
		this.getData()
	}
}
</script>

<style scoped>
#profile-info{
	width: 800px;
}
</style>
