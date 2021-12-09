<template>
	<div :id="computedId" class="container my-3 rounded-3" @click="$emit('message-clicked')">
		<div class="row">
			<div class="col-sm-10 px-5 pt-4 text-break">
				<div class="row">
					<div class="d-flex align-items-start mb-1">
						<span class="badge rounded-pill" id="writerid">{{ computedWriterId }}</span>
						<Clock id="clock-icon"/>
						<small class="text-secondary"> {{ computedTime }}</small>
					</div>
				</div>
				<div class="row p-3">
					{{ message_data.content }}
				</div>
			</div>

			<div class="col-sm-2 text-center d-flex flex-column m-auto">
				<div class="row">
					<button type="button" class="btn btn-xs" @click="handleUpvote">
						<UpvoteIcon id="upvote"/>
					</button>
				</div>
				<div class="row">
					<span id="score" class="fw-bold fs-4 text-white">{{ message_data.score }}</span>
				</div>
				<div class="row">
					<button type="button" class="btn btn-xs" @click="handleDownvote">
						<DownvoteIcon id="downvote"/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import Clock from '../assets/Clock'
import UpvoteIcon from '../assets/UpvoteIcon'
import DownvoteIcon from '../assets/DownvoteIcon'
import axios from 'axios'

export default {
	name: 'Message',
	components: { Clock, UpvoteIcon, DownvoteIcon },
	props: {
		message_data: Object,
		writerIdInThread: Number
	},
	data () {
		return {
			pending: false,
			errorMessage: '',
			error: 0
		}
	},
	methods: {
		async handleUpvote () {
			this.pending = true
			this.error = 0
			let amount = 1

			if (this.message_data.vote === 1) {
				amount = 0
			}

			try {
				await axios.post('/api/messages/' + this.message_data.id, { amount: amount }, {
					headers: {
						Authorization: `bearer ${window.accessToken}`
					}
				}).then(response => {
					this.message_data.score = response.data.score
					this.message_data.vote = response.data.vote
				})

				this.error = 0
			} catch (error) {
				this.error = 5
				if (error.response) {
					this.errorMessage = error.response.data.error
				} else {
					this.errorMessage = error.message
				}
			}
			this.pending = false
		},
		async handleDownvote () {
			this.pending = true
			this.error = 0
			let amount = -1

			if (this.message_data.vote === -1) {
				amount = 0
			}

			try {
				await axios.post('/api/messages/' + this.message_data.id, { amount: amount }, {
					headers: {
						Authorization: `bearer ${window.accessToken}`
					}
				}).then(response => {
					this.message_data.score = response.data.score
					this.message_data.vote = response.data.vote
				})

				this.error = 0
			} catch (error) {
				this.error = 5
				if (error.response) {
					this.errorMessage = error.response.data.error
				} else {
					this.errorMessage = error.message
				}
			}
			this.pending = false
		},
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
				else { return Math.floor(differenceInDays / 365) + ' years ago' }
			} else if (differenceInDays > 30) {
				if (Math.floor(differenceInDays / 30) === 1) return 'A month ago'
				else { return Math.floor(differenceInDays / 30) + ' months ago' }
			} else if (differenceInDays >= 1) {
				if (Math.floor(differenceInDays) === 1) return 'A day ago'
				else { return Math.floor(differenceInDays) + ' days ago' }
			} else if (differenceInHours >= 1) {
				if (Math.floor(differenceInHours) === 1) return 'An hour ago'
				else { return Math.floor(differenceInHours) + ' hours ago' }
			} else if (differenceInMinutes >= 1) {
				if (Math.floor(differenceInMinutes) === 1) return 'A minute ago'
				else { return Math.floor(differenceInMinutes) + ' minutes ago' }
			} else if (differenceInSeconds >= 5) {
				return Math.floor(differenceInSeconds) + ' seconds ago'
			} else {
				return 'Just now'
			}
		}
	},
	computed: {
		computedId () {
			if (this.writerIdInThread === this.message_data.writerId) {
				return 'border'
			} else {
				return 'message'
			}
		},
		computedWriterId () {
			if (this.message_data.writerId === 1) {
				return 'AP'
			} else {
				return this.message_data.writerId - 1
			}
		},
		computedTime () {
			return this.getTimeDiff(this.message_data.postedTime)
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
	color:#8ed1c6;
}

#border {
	border-width: 10px;
	border-style: solid;
	border-color: transparent transparent transparent #757575;
	width: 800px;
	background-color: #2e2e2e;
	color:#8ed1c6;
}

#clock-icon {
	margin-top: 0.3em;
	margin-right: 0.5em;
	margin-left: 0.5em;
	width: 0.7em;
	height: 0.7em;
	fill: #777;
}

#upvote, #downvote {
	fill: #8ed1c6;
	width: 2.5em;
	height: 2.5em;
}

#writerid {
	background-color: #8ed1c6;
	color: #2e2e2e;
}

button:focus {
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
}

</style>
