<template>
<div id="create-account" class="container p-3 my-3">
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
		<div class="row mt-3">
			Retype password:
		</div>
		<div class="row">
			<input type="password">
		</div>
		<div class="row">
			<input type="submit" value="Create Account" class="btn btn-primary btn-sm mt-3">
		</div>
	</form>
</div>
</template>

<script>
export default {
	name: 'CreateAccount'
}
</script>

<style scoped>
#create-account {
	width: 150px;
}
input{
	width: 150px;
}
</style>
