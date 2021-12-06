<template>
	<div id="create-account" class="container p-5 my-3 rounded-3">
		<form class="align-items-center" @submit.prevent>
			<div class="row pb-1 fw-bold" id="username">
				Username:
			</div>
			<div class="row" id="usernamecontainer">
				<input v-model="username" placeholder="Username">
				<span class="usernametooltip">Username must contain at least 3 characters, and only letters or numbers</span>
			</div>
			<div class="row mt-3 pb-1 fw-bold" id="password">
				Password:
			</div>
			<div class="row" id="passwordcontainer">
				<input v-model="password" type="password">
				<span class="passwordtooltip">Password must contain at least 6 characters, at least 1 number and 1 uppercase character</span>
			</div>
			<div class="row">
				<input
					type="submit"
					value="Create Account"
					class="btn btn-primary btn-sm mt-3"
					id="createaccountbutton"
					@click="createAccount"
				/>
			</div>
		</form>
		<div class="row">
			<button class="btn btn-sm mt-3" @click="$emit('return-clicked')">
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

				this.$emit('return-clicked')
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
	width: 300px;
	background-color: #2e2e2e;
}

input {
	width: 300px;
}

#username, #password {
	color: #8ed1c6;
}

button {
	color: #8ed1c6;
	border-color: #8ed1c6;
	background-color: #2e2e2e;
}

button:hover {
	color: #8ed1c6;
}

#createaccountbutton {
	color: #8ed1c6;
	border-color: #8ed1c6;
	background-color: #2e2e2e;
}

#back-icon{
	fill: #8ed1c6;
	height: 1em;
	width: 1em;
}

#usernamecontainer, #passwordcontainer {
	position:relative;
}

#usernamecontainer:hover .usernametooltip, #passwordcontainer:hover .passwordtooltip {
	visibility: visible;
	opacity: 1;
}

#usernamecontainer .usernametooltip, #passwordcontainer .passwordtooltip {
	visibility: hidden;
	width: 200px;
	background-color: #747474;
	text-align: center;
	padding: 1em;
	border-radius: 6px;
	color: #8ed1c6;
	font-size: small;

	position: absolute;
	z-index: 1;
	top: -5px;
	left: 125%;
	margin-left: -50px;

	opacity: 0;
	transition: opacity 0.3s;
}
#usernamecontainer .usernametooltip::after, #passwordcontainer .passwordtooltip::after {
	content: "";
	position: absolute;
	top: 13%;
	right: 100%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: transparent #747474 transparent transparent;
}
</style>
