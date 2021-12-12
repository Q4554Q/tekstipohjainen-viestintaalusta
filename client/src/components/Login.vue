<template>
    <div id="login" class="container p-5 my-3 rounded-3 align-items-center">
		<h1 class="fs-2">Account login</h1>
        <form class="align-items-center" @submit.prevent>
            <div class="row pb-1 mt-4 fw-bold" id="username">Username:</div>
            <div class="row">
                <input v-model="username" placeholder="Username"/>
            </div>
            <div class="row mt-4 pb-1 fw-bold" id="password">Password:</div>
            <div class="row">
                <input v-model="password" type="password" />
            </div>
            <div class="row mt-4">
                <input
                    type="submit"
                    value="Log in"
                    class="btn btn-primary btn-sm mt-3"
					id="loginbutton"
                    @click="login"
                />
            </div>
        </form>
        <div class="row mt-4">
            <button
                class="btn btn-sm my-2"
                @click="$emit('create-account-clicked')">
                Create new account
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

export default {
	name: 'Login',
	data () {
		return {
			username: '',
			password: '',
			token: null,
			pending: false,
			error: 0,
			errorMessage: ''
		}
	},
	methods: {
		/**
			* Sends a login request with the username, password and accesstoken.
			* @returns {Promise<void>}
			*/
		async login () {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.post('/api/login', {
					username: this.username,
					password: this.password
				})
				this.token = data.token

				this.error = 0

				this.$emit('login-clicked', this.token)
			} catch (error) {
				this.token = null

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
#login {
    max-width: 350px;
	background-color: #2e2e2e;
}

input {
    max-width: 300px;
}

button {
	color: #8ed1c6;
	border-color: #8ed1c6;
	background-color: #2e2e2e;
}

button:hover {
	color: #8ed1c6;
}

#loginbutton {
	color: #8ed1c6;
	border-color: #8ed1c6;
	background-color: #2e2e2e;
}

h1 {
	color: #8ed1c6;
}

#username, #password {
	color: #8ed1c6;
}

button:focus, input:focus{
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,1);
	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,1);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,1);
	outline: none;
}
</style>
