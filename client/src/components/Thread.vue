<template>
  <div id="thread">
    <table>
      <thead>
      <tr>
        <th>Viestiketju x</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="message in messages" :key="message.posted_time">
        <td>
          <message v-bind:message_data=message></message>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Message from './Message'

export default {
	name: 'Thread',
	components: {
		Message
	},
	data () {
		return {
			messages: [
				{
					writer_id: 1,
					content: 'Äiti mä oon internetissä',
					score: 12,
					posted_time: '13.12.2021'
				},
				{
					writer_id: 2,
					content: 'EBIN TROLORLROR',
					score: -3,
					posted_time: '13.12.2021'
				},
				{
					writer_id: 666,
					content: '@2 on apina!',
					score: 4,
					posted_time: '13.12.2021'
				}
			]
		}
	}
}

</script>

<style scoped>

</style>
