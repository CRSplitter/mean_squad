<template lang="html">
	<div class="text-center">
		<!-- {{results.activities}} -->

		<div v-if="searchType=='activity'">
			<div v-if="results.activities && results.activities.length!=0">
				<div v-for="activity in results.activities" style="margin-top:20px">
					<activityCard :activity="activity"></activityCard>
				</div>
			</div>
			<div v-if="results.activities && results.activities.length==0">
				<h1>No activities has been found! </h1>
			</div>
		</div>

		<div v-if="searchType=='business'">
			<div v-if="results.businesses && results.businesses.length!=0">
				<div v-for="business in results.businesses" style="margin-top:20px">
					<businessCard :business="business"></businessCard>
				</div>
			</div>
			<div v-if="results.businesses && results.businesses.length==0">
				<h1>No businesses has been found!</h1>
			</div>
		</div>

	</div>

</template>

<script>
	import ActivityCard from '../activityCard';
	import BusinessCard from '../businessCard';
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
			activityCard: ActivityCard,
			businessCard: BusinessCard
		}
	}
</script>

<style lang="css">

</style>