<template>
	<div id="profile">
		<div id="profile-info" class="container p-3 my-3 fs-5 text-left rounded-3">
			<div class="row row py-2 px-4">
				User name: {{data.username}}
			</div>
			<div class="row py-2 px-4 d-inline-block">
				Your score: <b>{{data.score}}</b>
			</div>
			<div class="row py-2 px-4">
				<button type="button" class="btn fw-bold w-10 my-3" @click="$emit('logout-clicked')">Log out</button>
			</div>
			<div class="row py-2 px-4">
				Threads you have posted on:
			</div>
		</div>
		<ThreadList v-on="$listeners" :threadData="data.threads"/>
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
	data () {
		return {
			pending: false,
			error: 0,
			errorMessage: '',
			data: {}
		}
	},
	methods: {
		/**
			* Gets all of the data associated with the currently logged in user from the database.
			* @returns {Promise<void>}
			*/
		async getUserData () {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.get('/api/users/me', {
					headers: {
						Authorization: `bearer ${window.accessToken}`
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
	/**
		* Calls the getUserData function when the Profile component is created.
		*/
	created () {
		this.getUserData()
	}
}
</script>

<style scoped>
#profile-info{
	max-width: 800px;
	color:#8ed1c6;
	background-color: #2e2e2e;
}
button:hover {
	color: #8ed1c6;
}
button {
	max-width: 150px;
	color: #8ed1c6;
	border-color: #8ed1c6;
}
</style>
