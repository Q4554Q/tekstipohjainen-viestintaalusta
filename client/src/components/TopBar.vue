<template>
	<div id="top-bar" class="container p-3 rounded-bottom text-white">
		<div class="d-flex justify-content-between">
				<button type="button" class="btn" @click="$emit('return-clicked')"><HomeIcon id="home-icon"/></button>
				<button type="button" class="btn fw-bold" @click="$emit('newthread-clicked')" id="newthreadbutton">New thread <PenIcon id="pen-icon"/></button>
				<button type="button" class="btn" @click="$emit('profile-clicked')"><ProfileIcon id="profile-icon"/></button>
		</div>
	</div>
</template>

<script>
import PenIcon from '../assets/PenIcon'
import HomeIcon from '../assets/HomeIcon'
import ProfileIcon from '../assets/ProfileIcon'

export default {
	name: 'TopBar',
	components: {
		ProfileIcon,
		HomeIcon,
		PenIcon
	}
}
</script>

<style scoped>
#top-bar {
	width: 800px;
	background-color: #2e2e2e;
}
#pen-icon{
	fill: #8ed1c6;
	height: 1.2em;
	width: 1.2em;
}
button {
	background-color: #2e2e2e;
	color: #8ed1c6;
}
button:focus {
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
}
#newthreadbutton {
	border-color: #8ed1c6;
}
#home-icon, #profile-icon{
	fill: #8ed1c6;
	height: 1.5em;
	width: 1.5em;
}
button:hover {
	color: #8ed1c6;
}
</style>
