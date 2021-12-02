<template>
	<div id="top-bar" class="container p-3 rounded-bottom bg-primary text-white">
		<div class="d-flex justify-content-between">
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('return-clicked')"><BackIcon id="back-icon"/></button>
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('newthread-clicked')">New thread <PenIcon id="pen-icon"/></button>
				<button type="button" class="btn bg-white btn-lg text-primary" @click="$emit('profile-clicked')"><ProfileIcon id="back-icon"/></button>
		</div>
	</div>
</template>

<script>
import PenIcon from '../assets/PenIcon'
import BackIcon from '../assets/BackIcon'
import ProfileIcon from '../assets/ProfileIcon'

export default {
	name: 'TopBar',
	components: {
		ProfileIcon,
		BackIcon,
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
	height: 1.2em;
	width: 1.2em;
}
#back-icon{
	fill: #4285F4;
	height: 1.5em;
	width: 1.5em;
}
</style>
