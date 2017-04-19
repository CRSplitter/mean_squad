<template lang="html">
	<div class="">
			<!-- {{results.activities}} -->

			<div v-if="searchType=='activity'">
				<div v-if="results.activities.length!=0">
					<div v-for= "activity in results.activities">
						<activityCard :activity="activity"></activityCard>
					</div>
				</div>
				<div v-if="results.activities.length==0">
					<h1>No activities has been found! </h1>
				</div>
	    </div>

			<div v-if="searchType=='business'">
				<div v-if="results.businesses.length!=0">
					<div v-for= "business in results.businesses">
						<!-- business card goes here -->
					</div>
				</div>
				<div v-if="results.businesses.length==0">
					<h1>No businesses has been found!</h1>
				</div>
			</div>

		</div>

</template>

<script>
	import ActivityCard from '../activityCard'
	// import BusinessCard from '../'
	var URL = require('../env.js').HostURL;
	export default {
		props: [
			'results',
			'searchType'
		],
		data() {
			return {
				errors: []
			}
		},
		components: {
			activityCard: ActivityCard
		}
	}
</script>

<style lang="css">

</style>
