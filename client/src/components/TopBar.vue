<template>
	<div id="top-bar" class="container p-3 rounded-bottom bg-primary text-white">
		<div class="d-flex justify-content-between">
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('return-clicked')">Return</button>
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('newthread-clicked')">New thread <PenIcon id="pen-icon"/></button>
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('profile-clicked')">Profile</button>
		</div>
	</div>
</template>

<script>
import PenIcon from '../assets/PenIcon'

export default {
	name: 'TopBar',
	components: {
		PenIcon
	}
}
</script>

<style scoped>
#top-bar {
	width: 800px;
}
#pen-icon{
	fill: #4285F4;
	height: 0.9em;
	width: 0.9em;
	margin-bottom: 0.1em;
}
</style>
