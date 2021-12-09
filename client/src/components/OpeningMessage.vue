<template>
	<div class="container p-3 my-3 rounded-3" @click="$emit('message-clicked')" :id="computedId">

		<div class="row">
			<div class="col-sm-10 px-3 text-break">
				<div class="row">
					<div class="d-flex align-items-start my-1">
						<Clock id="clock-icon"/>
						<small class="text-secondary"> {{ computedTime }}</small>
					</div>
				</div>
				<div class="row p-3">
					{{ messageData.content }}
				</div>
				<div class="row pt-3">
					<div class="d-flex align-items-start mt-1">
						<MessageIcon id="message-icon"/>
						<span class="fw-bold text-white"> {{ numMessages }}</span>
						<small class="text-secondary mx-4">Last post {{ computedLatestMsgTime }}</small>
					</div>
				</div>
			</div>
			<div class="col-sm-1 m-auto fw-bold fs-3 text-right text-white" id="score">
				{{ messageData.score }}
			</div>
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
		numMessages: Number,
		writerIdInThread: Number,
		threadId: Number,
		lastMessage: Object,
		latestPost: String
	},
	methods: {
		getTimeDiff (date) {
			const dateArray = []

			dateArray.push(date.slice(0, 4)) 	// YYYY
			dateArray.push(date.slice(5, 7)) 	// MM
			dateArray.push(date.slice(8, 10))	// DD
			dateArray.push(date.slice(11, 13))// hh
			dateArray.push(date.slice(14, 16))// mm
			dateArray.push(date.slice(17, 19))// ss

			const currentDate = new Date()
			const comparableDate = new Date(dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2] +
				'T' + dateArray[3] + ':' + dateArray[4] + ':' + dateArray[5] + '.000+00:00')

			const differenceInMs = currentDate - comparableDate
			const differenceInSeconds = differenceInMs / 1000
			const differenceInMinutes = differenceInSeconds / 60
			const differenceInHours = differenceInMinutes / 60
			const differenceInDays = differenceInHours / 24

			if (differenceInDays > 365) {
				if (Math.floor(differenceInDays / 365) === 1) return 'A year ago'
				else {
					return Math.floor(differenceInDays / 365) + ' years ago'
				}
			} else if (differenceInDays > 30) {
				if (Math.floor(differenceInDays / 30) === 1) return 'A month ago'
				else {
					return Math.floor(differenceInDays / 30) + ' months ago'
				}
			} else if (differenceInDays >= 1) {
				if (Math.floor(differenceInDays) === 1) return 'A day ago'
				else {
					return Math.floor(differenceInDays) + ' days ago'
				}
			} else if (differenceInHours >= 1) {
				if (Math.floor(differenceInHours) === 1) return 'An hour ago'
				else {
					return Math.floor(differenceInHours) + ' hours ago'
				}
			} else if (differenceInMinutes >= 1) {
				if (Math.floor(differenceInMinutes) === 1) return 'A minute ago'
				else {
					return Math.floor(differenceInMinutes) + ' minutes ago'
				}
			} else if (differenceInSeconds >= 5) {
				return Math.floor(differenceInSeconds) + ' seconds ago'
			} else {
				return 'Just now'
			}
		}
	},
	computed: {
		computedTime () {
			if (this.messageData !== undefined) {
				return this.getTimeDiff(this.messageData.postedTime)
			} else {
				return ''
			}
		},
		computedLatestMsgTime () {
			if (this.messageData !== undefined) {
				return this.getTimeDiff(this.latestPost).toLowerCase()
			} else {
				return ''
			}
		},
		computedId () {
			if (this.writerIdInThread === this.messageData.writerId) {
				return 'border'
			} else {
				return 'message'
			}
		}
	}
}
</script>

<style scoped>
#message {
	border-width: 10px;
	border-style: solid;
	border-color: transparent transparent transparent transparent;
	width: 800px;
	background-color: #2e2e2e;
	color: #8ed1c6;
}

#border {
	border-width: 10px;
	border-style: solid;
	border-color: transparent transparent transparent #757575;
	width: 800px;
	background-color: #2e2e2e;
	color: #8ed1c6;
}

#clock-icon {
	margin-top: 0.3em;
	margin-right: 0.5em;
	width: 0.7em;
	height: 0.7em;
	fill: #757575;
}

#message-icon {
	margin-right: 1em;
	fill: #FFF;
}

#score {
	text-align: right;
	padding-right: 1em;
}

</style>
