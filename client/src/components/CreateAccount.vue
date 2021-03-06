<template>
	<div id="create-account" class="container p-5 my-3 rounded-3">
		<h1 class="fs-4">Create a new account</h1>
		<form class="align-items-center" @submit.prevent>
			<div class="row pb-1 mt-5 fw-bold" id="username">
				Username:
			</div>
			<div class="row" id="usernamecontainer">
				<input v-model="username" placeholder="Username"
					   pattern="^[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]{3,}$">
				<span
					class="usernametooltip">Username must contain at least 3 characters, and only letters or numbers</span>
			</div>
			<div class="row mt-4 pb-1 fw-bold" id="password">
				Password:
			</div>
			<div class="row" id="passwordcontainer">
				<input v-model="password" type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$">
				<span class="passwordtooltip">Password must contain at least 6 characters, at least 1 number and at least 1 uppercase character</span>
			</div>
			<div class="row mt-4 pb-1 fw-bold" id="password2">
				Re-enter your Password:
			</div>
			<div class="row" id="passwordcontainer2">
				<input v-model="password2" type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$">
			</div>
			<div class="row mt-4">
				<input
					type="submit"
					value="Create Account"
					class="btn btn-primary btn-sm mt-3"
					id="createaccountbutton"
					@click="createAccount"
				/>
			</div>
		</form>
		<div class="row mt-4">
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
			password2: '',
			pending: false,
			error: 0,
			errorMessage: ''
		}
	},
	methods: {
		/**
			* Validates the password and username clientside and sends them to the database if they're valid.
			* If the password or username are invalid, then this sets an error to describe what is invalid.
			* @returns {Promise<void>}
			*/
		async createAccount () {
			if (this.username.length < 3) {
				this.error = 5
				this.errorMessage = 'Username must be longer than 3 characters.'
			} else if (!(/^[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]*$/.test(this.username))) {
				this.error = 5
				this.errorMessage = 'Username must only contain letters or numbers.'
			} else if (this.password.length < 6) {
				this.error = 5
				this.errorMessage = 'Password must be at least 6 characters long.'
			} else if (!(/[a-z]+/.test(this.password))) {
				this.error = 5
				this.errorMessage = 'Password must contain a lowercase letter.'
			} else if (!(/[0-9]/.test(this.password))) {
				this.error = 5
				this.errorMessage = 'Password must contain a number.'
			} else if (this.password === '' || this.password2 === '') {
				this.error = 5
				this.errorMessage = 'Please fill both password fields.'
			} else if (this.password !== this.password2) {
				this.error = 5
				this.errorMessage = 'Passwords don\'t match!'
			} else if (!(/[A-Z]+/.test(this.password))) {
				this.error = 5
				this.errorMessage = 'Password must contain an uppercase letter.'
			} else {
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
}
</script>

<style scoped>
#create-account {
	max-width: 350px;
	background-color: #2e2e2e;
}

input {
	max-width: 300px;
}

input:focus {
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,1);
	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,1);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,1);
	outline: none;
}
#username, #password, #password2, h1 {
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

#back-icon {
	fill: #8ed1c6;
	height: 1.5em;
	width: 1.5em;
}

#usernamecontainer, #passwordcontainer, #passwordcontainer2 {
	position: relative;
}

#usernamecontainer:hover .usernametooltip, #passwordcontainer:hover .passwordtooltip {
	visibility: visible;
	opacity: 1;
}

#usernamecontainer .usernametooltip, #passwordcontainer .passwordtooltip {
	visibility: hidden;
	width: 200px;
	background-color: #8ed1c6;
	text-align: center;
	padding: 1em;
	border-radius: 6px;
	color: #2e2e2e;
	font-size: small;

	position: absolute;
	z-index: 1;
	top: -5px;
	left: 125%;
	margin-left: -50px;

	opacity: 0;
	transition: opacity 0.3s
}

#usernamecontainer .usernametooltip::after, #passwordcontainer .passwordtooltip::after {
	content: "";
	position: absolute;
	top: 13%;
	right: 100%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: transparent #8ed1c6 transparent transparent;
}
</style>
