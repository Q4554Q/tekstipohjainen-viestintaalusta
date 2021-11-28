<template>
	<div id="thread-list">
			<Message v-for="thread in threads" :key="thread.thread_id" v-bind:message_data="thread.message" @message-clicked="$emit('open-thread', thread.thread_id)"/>
	</div>
</template>

<script>
import Message from './Message'

export default {
	name: 'ThreadList',
	components: {
		Message
	},
	props: {
		threads: Array
	}
}
</script>

<style scoped>

</style>
