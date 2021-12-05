<template>
	<div id="thread-list">
			<Message v-for="thread in threads" :key="thread.id" v-bind:message_data="thread.messages[0]" @message-clicked="$emit('open-thread', thread.id)"/>
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
