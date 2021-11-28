<template>
<div id="newmessage">
		<div id="newMessageArea" class="container p-3 my-3 border">
			<b-form-textarea
				v-model="message"
				size="lg"
				placeholder="Kirjoita viesti"
				rows="5"
				no-resize
				maxlength="350"
			></b-form-textarea>
			<button @click="handleNewMessage">Lähetä viesti</button>
		</div>
</div>
</template>

<script>
export default {
	name: 'NewMessage.vue',
	methods: {
		handleNewMessage () {
			// otetaan message ja luodaan uusi Message-olio
		}
	}
}
</script>

<style scoped>
#newMessageArea {
	max-width: 800px;
}
</style>
