<template>
    <div id="login" class="container p-5 my-3 rounded-3 align-items-center">
					<h1 class="fs-2">Account login</h1>
        <form class="align-items-center" @submit.prevent>
            <div class="row pb-1 fw-bold" id="username">Username:</div>
            <div class="row">
                <input v-model="username" placeholder="Username" pattern="^[A-Za-z0-9]{3,}$"/>
            </div>
            <div class="row mt-3 pb-1 fw-bold" id="password">Password:</div>
            <div class="row">
                <input v-model="password" type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$" />
            </div>
            <div class="row">
                <input
                    type="submit"
                    value="Log in"
                    class="btn btn-primary btn-sm mt-3"
																				id="loginbutton"
                    @click="login"
                />
            </div>
        </form>
        <div class="row">
            <button
                class="btn btn-sm mt-3"
                @click="$emit('create-account-clicked')"
            >
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
    width: 300px;
				background-color: #2e2e2e;
}

input {
    width: 300px;
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
</style>
