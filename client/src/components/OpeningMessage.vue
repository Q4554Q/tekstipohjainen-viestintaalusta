<template>
	<div id="message" class="container p-3 my-3 rounded-3" @click="$emit('message-clicked')">

		<div class="d-flex align-items-start mx-4">
			<Clock id="clock-icon"/><small class="text-secondary"> {{ messageData.postedTime }}</small>
		</div>

		<div class="row">
			<div class="col-sm-10 px-5 py-3 text-break">
				{{ messageData.content }}
			</div>
			<div class="col-sm-1 m-auto fw-bold fs-3 text-right text-white" id="score">
				{{ messageData.score }}
			</div>
		</div>

		<div class="d-flex align-items-start mx-4">
				<MessageIcon id="message-icon"/><span class="fw-bold text-white"> {{numMessages}}</span>
		</div>
	</div>
</template>

<script>
import Clock from '../assets/Clock'
import MessageIcon from '../assets/MessageIcon'

export default {
	name: 'OpeningMessage',
	components: { Clock, MessageIcon },
	props: {
		messageData: Object,
		numMessages: Number
	}
}
</script>

<style scoped>
#message{
	width: 800px;
	background-color: #2e2e2e;
	color:#8ed1c6;
}

#clock-icon{
	margin-top: 0.3em;
	margin-right: 0.5em;
	width: 0.7em;
	height: 0.7em;
	fill: #FFF;
}

#message-icon{
	margin-right: 1em;
	fill: #FFF;
}

#score {
	text-align: right;
	padding-right: 1em;
}

</style>
