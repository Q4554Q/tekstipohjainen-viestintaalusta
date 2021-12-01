<template>
<div id="loginview">
	<Login v-if="showLogin" @create-account-clicked="handleCreateAccount()" v-on="$listeners"/>
	<CreateAccount v-else />
</div>
</template>

<script>
import Login from './Login'
import CreateAccount from './CreateAccount'
export default {
	name: 'LoginView',
	components: { CreateAccount, Login },
	data () {
		return {
			showLogin: true
		}
	},
	methods: {
		handleLogin () {
			this.showLogin = false
		},
		handleCreateAccount () {
			this.showLogin = false
		}
	}
}
</script>

<style scoped>

</style>
