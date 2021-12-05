<template>
	<div id="create-account" class="container p-3 my-3">
		<form class="align-items-center" @submit.prevent>
			<div class="row">
				User name:
			</div>
			<div class="row">
				<input v-model="username" placeholder="User name">
			</div>
			<div class="row mt-3">
				Password:
			</div>
			<div class="row">
				<input v-model="password" type="password">
			</div>
			<div class="row">
				<input
					type="submit"
					value="Create Account"
					class="btn btn-primary btn-sm mt-3"
					@click="createAccount"
				/>
			</div>
		</form>
		<div class="row">
			<button class="btn btn-primary btn-sm mt-3" @click="$emit('return-clicked')">
				<BackIcon id="back-icon"/>
				Return
			</button>
		</div>
		<div v-if="pending" class="row justify-content-center">
			<b-spinner variant="primary" class="mt-3"></b-spinner>
		</div>
		<b-alert v-model="error" variant="danger" class="mt-3">
			{{ errorMessage }}
		</b-alert>
	</div>
</template>

<script>
import axios from 'axios'
import BackIcon from '../assets/BackIcon'

export default {
	name: 'CreateAccount',
	components: {
		BackIcon
	},
	data () {
		return {
			username: '',
			password: '',
			pending: false,
			error: 0,
			errorMessage: ''
		}
	},
	methods: {
		async createAccount () {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.post('/api/users', {
					username: this.username,
					password: this.password
				})

				this.error = 0

				this.$emit("return-clicked")
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
#create-account {
	width: 150px;
}

input {
	width: 150px;
}

#back-icon{
	fill: white;
	height: 1em;
	width: 1em;
}
</style>
