<template>
  <div id="message">
			<p>Id: {{message_data.writer_id}}, Date: {{message_data.posted_time}} </p>
    <p>{{message_data.content}}</p>
			<p>Score: {{message_data.score}}</p>
  </div>
</template>

<script>
export default {
	name: 'Message',
	props: {
		message_data: Object
	}
}
</script>

<style scoped>

</style>
