<template>
	<div id="login" class="container p-3 my-3">
		<form class="align-items-center">
		<div class="row">
				User name:
		</div>
		<div class="row">
				<input v-model="message" placeholder="User name">
		</div>
		<div class="row mt-3">
				Password:
		</div>
		<div class="row">
				<input type="password">
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
export default {
	name: 'Login'
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
