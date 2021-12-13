<template>
	<div :id="computedId" class="container my-3 rounded-3" @click="$emit('message-clicked')">
		<div class="row">
			<div class="col-10 px-5 pt-4 text-break">
				<div class="row">
					<div class="d-flex align-items-start mb-1">
						<span class="badge rounded-pill" id="writerid">{{ computedWriterId }}</span>
						<Clock id="clock-icon"/>
						<small class="text-secondary"> {{ computedTime }}</small>
					</div>
				</div>
				<div v-if="message_data.removed" class="row p-3 removed">
					{{ "This message was deleted" }}
				</div>
				<div v-else class="row p-3">
					{{ message_data.content }}
				</div>
				<div class="row">
					<div v-if="message_data.writerId === writerIdInThread && !message_data.removed"
						 class="d-flex align-items-start pt-1">
						<Button type="button" class="btn" v-if="!deleteClicked" id="delete-icon" @click="deleteIconClicked">
							<DeleteIcon id="delete-icon"/>
						</Button>
						<div v-if="deleteClicked && index !== 0" class="delete-warning">
							Do you want to delete this message?
							<Button type="button" class="btn" @click="deleteMessage">
								<YesIcon id="yes-icon"/>
							</Button>
							<Button type="button" class="btn" @click="cancelDelete">
								<NoIcon id="no-icon"/>
							</Button>
						</div>
						<div v-if="deleteClicked && index === 0" class="delete-warning">
							Do you want to delete this thread and all the messages in it?
							<Button type="button" class="btn" @click="deleteMessage">
								<YesIcon id="yes-icon"/>
							</Button>
							<Button type="button" class="btn" @click="cancelDelete">
								<NoIcon id="no-icon"/>
							</Button>
						</div>

					</div>
				</div>
			</div>

			<div class="col-2 text-center d-flex flex-column m-auto">
				<div v-if="!message_data.removed" class="row">
					<button type="button" class="btn" id="upvotebutton" @click="handleUpvote">
						<UpvoteIcon :id="computedUpVoteIcon"/>
					</button>
				</div>
				<div class="row">
					<span id="score" class="fw-bold fs-4"
						  v-bind:class="{ 'text-white': !message_data.removed, 'removed': message_data.removed }">{{
							message_data.score
						}}</span>
				</div>
				<div v-if="!message_data.removed" class="row">
					<button type="button" class="btn" id="downvotebutton" @click="handleDownvote">
						<DownvoteIcon :id="computedDownVoteIcon"/>
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
import DeleteIcon from '../assets/DeleteIcon'
import YesIcon from '../assets/YesIcon'
import NoIcon from '../assets/NoIcon'

export default {
	name: 'Message',
	components: { Clock, UpvoteIcon, DownvoteIcon, DeleteIcon, YesIcon, NoIcon },
	props: {
		message_data: Object,
		writerIdInThread: Number,
		threadId: Number,
		index: Number
	},
	data () {
		return {
			deleteClicked: false,
			pending: false,
			errorMessage: '',
			error: 0
		}
	},
	methods: {
		/**
		 * Adds or updates the messages upvote to the database.
		 * @returns {Promise<void>}
		 */
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
		/**
		 * Adds or updates the messages downvote to the database
		 * @returns {Promise<void>}
		 */
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
		/**
		 * Marks the message as deleted in the database
		 * @returns {Promise<void>}
		 */
		async deleteMessage () {
			this.pending = true
			this.error = 0

			try {
				if (this.index === 0) {
					await axios.delete('/api/threads/' + this.threadId, {
						headers: {
							Authorization: `bearer ${window.accessToken}`
						}
					})
					this.$emit('thread-deleted')
					this.error = 0
				} else {
					const { data } = await axios.delete('/api/messages/' + this.message_data.id, {
						headers: {
							Authorization: `bearer ${window.accessToken}`
						}
					}).then(response => {
						this.message_data.removed = response.data.removed
					})

					this.data = data
					this.error = 0
				}
			} catch (error) {
				this.error = 5
				if (error.response) {
					this.errorMessage = error.response.data.error
				} else {
					this.errorMessage = error.message
				}
			}
			this.deleteClicked = false
			this.pending = false
		},
		/**
		 * Calculates the time difference between the time a message was posted and current time.
		 * @param date The date the message was posted.
		 * @returns {string} Time difference as a string
		 */
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
		},
		/**
		 * Sets the deleteClicked to true, that allows the display of delete message.
		 */
		deleteIconClicked () {
			this.deleteClicked = true
		},
		/**
		 * Set the deleteClicked to false and hides the delete message.
		 */
		cancelDelete () {
			this.deleteClicked = false
		}
	},
	computed: {
		/**
		 * Sets the ID of a component based on if the thread was created by the currently
		 * logged in user. Styling of the component is based on this ID.
		 * @returns {string} ID.
		 */
		computedId () {
			if (this.writerIdInThread === this.message_data.writerId) {
				return 'border'
			} else {
				return 'message'
			}
		},
		/**
		 * Sets threads creators id as a OP and numbers from others.
		 * @returns {string|number}
		 */
		computedWriterId () {
			if (this.message_data.writerId === 1) {
				return 'OP'
			} else {
				return this.message_data.writerId - 1
			}
		},
		/**
		 * Sets the time elapsed since this thread was posted.
		 * @returns {string} Time elapsed as a string.
		 */
		computedTime () {
			return this.getTimeDiff(this.message_data.postedTime)
		},
		/**
		 * Updates the status of the upvote icon
		 * @returns {string}
		 */
		computedUpVoteIcon () {
			if (this.message_data.vote === 1) {
				return 'upvoted'
			} else {
				return 'notupvoted'
			}
		},
		/**
		 * Updates the status of the downvote icon
		 * @returns {string}
		 */
		computedDownVoteIcon () {
			if (this.message_data.vote === -1) {
				return 'downvoted'
			} else {
				return 'notdownvoted'
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
	margin-left: 0.5em;
	width: 0.7em;
	height: 0.7em;
	fill: #777;
}

#notupvoted, #notdownvoted {
	fill: #8ed1c6;
	width: 2.5em;
	height: 2.5em;
}

#upvoted, #downvoted {
	fill: #666666;
	width: 2.5em;
	height: 2.5em;
}

#writerid {
	background-color: #8ed1c6;
	color: #2e2e2e;
}

button:focus:not(#downvotebutton, #upvotebutton) {
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(142, 209, 198, .6);
	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(142, 209, 198, .6);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(142, 209, 198, .6);
}

#downvotebutton, #upvotebutton {
	box-shadow: none;
}

.removed {
	color: #666666;
}

#delete-icon {
	fill: #666666;
}

.delete-warning {
	color: #bb2d3b;
}

#yes-icon, #no-icon {
	fill: #8ed1c6;
}

</style>
