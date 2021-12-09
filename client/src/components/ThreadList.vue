<template>
	<div id="thread-list">
			<OpeningMessage v-for="thread in threadData" :key="thread.id" :messageData="thread.messages[0]"
							:numMessages="thread.numMessages" :writerIdInThread="thread.yourWriterId"
							:threadId="thread.id" :latestPost="thread.latestPostedTime"
							@message-clicked="$emit('open-thread', thread.id)"/>
	</div>
</template>

<script>
import OpeningMessage from './OpeningMessage'

export default {
	name: 'ThreadList',
	components: {
		OpeningMessage
	},
	props: {
		threadData: []
	}
}
</script>

<style scoped>

</style>
