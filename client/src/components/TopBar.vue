<template>
	<div id="top-bar" class="container p-3 my-3 bg-primary text-white">
		<div class="d-flex justify-content-between">
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('return-clicked')">Return</button>
				<button type="button" class="btn bg-white btn-lg text-primary " @click="$emit('profile-clicked')">Profile</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TopBar'
}
</script>

<style scoped>
#top-bar {
	width: 800px;
}
</style>
