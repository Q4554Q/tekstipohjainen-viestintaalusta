<template>
	<div id="thread">
		<message v-for="message in messages" :key="message.posted_time" v-bind:message_data="message"></message>
		<NewMessage></NewMessage>
	</div>
</template>

<script>

import Message from './Message'
import NewMessage from './NewMessage'

export default {
	name: 'Thread',
	components: {
		Message,
		NewMessage
	},
	props: {
		messages: Array
	}
}

</script>

<style scoped>

</style>
