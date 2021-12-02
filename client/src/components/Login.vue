<template>
	<div id="login" class="container p-3 my-3">
		<form class="align-items-center" @submit.prevent="handleSubmit">
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
				<input type="submit" value="Log in" class="btn btn-primary btn-sm mt-3" @click="$emit('login-clicked')">
		</div>
		</form>
		<div class="row">
			<button class="btn btn-primary btn-sm mt-3" @click="$emit('create-account-clicked')">Create new account</button>
		</div>
	</div>
</template>

<script>

import axios from 'axios'

export default {
	name: 'Login',
	methods: {
		async requestData () {
			this.pending = true
			try {
				const { data } = await axios.post('/api/login', { params: this.user })
				this.data = data
				this.error = false
			} catch (e) {
				this.data = null
				this.error = e
			}
			this.pending = false
		},
		data () {
			return {
				user: {
					username: '',
					password: ''
				},
				data: null,
				error: false,
				pending: true
			}
		}
	}
}
</script>

<style scoped>
#login {
	width: 150px;
}
input{
	width: 150px;
}
</style>
