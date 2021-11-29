<template>
  <div id="message" class="container p-3 my-3 border" @click="$emit('message-clicked')">

			<div class="d-flex align-items-start">
				<span class="badge rounded-pill bg-primary mx-2">{{message_data.writer_id}}</span>
				<small class="text-muted"><span class="glyphicon glyphicon-time mx-2"></span>{{message_data.posted_time}}</small>
			</div>

			<div class="row">
				<div class="col-sm-10">
					{{message_data.content}}
				</div>
				<div class="col-sm-2">
					<button type="button" class="btn btn-primary btn-sm" @click="handleUpvote()">+</button>
					<br>
					Score: {{message_data.score}}
					<br>
					<button type="button" class="btn btn-primary btn-sm" @click="handleDownvote()">-</button>
				</div>
			</div>
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
#message{
	width: 800px;
}
</style>
