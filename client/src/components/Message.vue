<template>
  <div id="message" class="container p-3 my-3 border rounded" @click="$emit('message-clicked')">

			<div class="d-flex align-items-start">
				<span class="badge rounded-pill bg-primary mx-2">{{message_data.writer_id}}</span>
				<Clock id="clock-icon" /> <small class="text-secondary">{{message_data.posted_time}}</small>
			</div>

			<div class="row">
				<div class="col-sm-10">
					{{message_data.content}}
				</div>
				<div class="col-sm-2 text-center">
					<button type="button" class="btn btn-primary btn-sm" @click="handleUpvote()"><UpvoteIcon id="vote-icons"/></button>
					<br>
					<b>{{message_data.score}}</b>
					<br>
					<button type="button" class="btn btn-primary btn-sm" @click="handleDownvote()"><DownvoteIcon id="vote-icons"/></button>
				</div>
			</div>
  </div>
</template>

<script>

import Clock from '../assets/Clock'
import UpvoteIcon from '../assets/UpvoteIcon'
import DownvoteIcon from '../assets/DownvoteIcon'

export default {
	name: 'Message',
	components: { Clock, UpvoteIcon, DownvoteIcon },
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

#clock-icon{
	margin-top: 0.3em;
	width: 0.7em;
	height: 0.7em;
	fill: #777;
}

#vote-icons{
	fill: white;
}
</style>
