<template>
  <div id="message">
			<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>{{message_data.posted_time}}</small>
			<p>Id: {{message_data.writer_id}}</p>
    <p>{{message_data.content}}</p>
			<button @click="handleUpvote()">+</button>
			<p>Score: {{message_data.score}}</p>
			<button @click="handleDownvote()">-</button>
  </div>
</template>

<script>
export default {
	name: 'Message',
	props: {
		message_data: Object
	},
	methods: {
		handleUpvote () {},
		handleDownvote () {}
	}
}
</script>

<style scoped>

</style>
