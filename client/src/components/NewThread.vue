<template>
	<div id="newthread" class="container p-3 my-3 border rounded">
		<div id="newthreadfield" class="text-center">
			<b-form-textarea
				v-model="message"
				size="lg"
				placeholder="Begin a new thread with a message"
				rows="5"
				no-resize
				maxlength="350"
			></b-form-textarea>
			<button @click="handleNewThread" class="btn btn-primary btn-sm mt-3">Create thread</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewThread.vue',
	methods: {
		handleNewThread () {}
	}
}
</script>

<style scoped>
#newthread {
	max-width: 800px;
}
</style>
