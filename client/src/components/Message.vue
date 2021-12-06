<template>
	<div id="message" class="container px-3 my-3 border rounded" @click="$emit('message-clicked')">
		<div class="row">
			<div class="col-sm-10 px-5 pt-4 text-break">
				<div class="row">
					<div class="d-flex align-items-start mb-1">
						<span class="badge rounded-pill bg-primary">{{ message_data.writerId }}</span>
						<Clock id="clock-icon"/>
						<small class="text-secondary"> {{ message_data.postedTime }}</small>
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
					<span id="score" class="fw-bold fs-4">{{ message_data.score }}</span>
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
		message_data: Object
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

			try {
				await axios.post('/api/messages/' + this.message_data.id, { amount: 1 }, {
					headers: {
						Authorization: `bearer ${window.accessToken}`
					}
				}).then(response => {
					this.message_data.score = response.data.score
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

			try {
				await axios.post('/api/messages/' + this.message_data.id, { amount: -1 }, {
					headers: {
						Authorization: `bearer ${window.accessToken}`
					}
				}).then(response => {
					this.message_data.score = response.data.score
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
		}
	}
}
</script>

<style scoped>
#message {
	width: 800px;
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
	fill: #4285F4;
	width: 2.5em;
	height: 2.5em;
}

</style>
