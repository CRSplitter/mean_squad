<template>
	<div>
		<link rel="stylesheet" href="/static/userInfo/css/userInfo.css" scoped>
		<div class="userInfo-container" style="background-color: white;">
			<div v-if="info" class="userInfo-box box_shadow">
				<div v-if="sameUser" class="userInfo-edit">
					<div v-if="!info.username" class="userInfo-edit-box-btn center">
						<button style="width:120px" v-on:click="openForm('operatorForm')" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Operator</button>
					</div>

					<!--<div v-if="info.userType == 'Business Operator'" class="userInfo-edit-box-btn center">
						<button style="width:120px" v-on:click="openForm('operatorForm')" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Edit Business</button>
					</div>-->
					<div v-if="info.username && !(info.userType == 'Business Operator')" class="userInfo-edit-box-btn center">
						<button v-on:click="openForm('clientEditForm')" type="button" name="button" class="backgroudcolor3 font_medium box_shadow">Edit</button>
					</div>
					<div v-if="!info.username" class="userInfo-edit-box-btn center">
						<button v-on:click="openForm('businessEditForm')" type="button" name="button" class="backgroudcolor3 font_medium box_shadow">Edit</button>
					</div>
				</div>
				<div v-if="info && info.address" class="userInfo-address">
					<span class="actionfont">Address:</span>
					<br>
					<br>

					<div class="userInfo-data">
						{{info.address}}
					</div>
					<br>

				</div>
				<div v-if="info &&info.description" class="userInfo-description">
					<span class="actionfont">About:</span>
					<br>
					<br>
					<div class="userInfo-data">
						{{info.description}}
					</div>
					<br>

				</div>
				<div v-if="info && info.contactInfo" class="userInfo-contact">
					<span class="actionfont">contact:</span>
					<br>
					<br>
					<div class="userInfo-data">
						{{info.contactInfo}}
					</div>
					<br>
				</div>
				<div v-if="empty" class="userInfo-contact">
					<span class="actionfont">No Info</span>
					<br>
					<br>
					<div class="userInfo-data">
					</div>
					<br>
				</div>
				<div v-if="info && info.username" class="userInfo-username">
					<span class="actionfont">Username:</span>
					<br>
					<br>
					<div class="userInfo-data">
						{{info.username}}
					</div>
					<br>
				</div>

				<div v-if="info && info.name" class="userInfo-username">
					<span class="actionfont">Name:</span>
					<br>
					<br>
					<div class="userInfo-data">
						{{info.name}}
					</div>
					<br>
				</div>

				<div v-if="info && info.email" class="userInfo-email">
					<span class="actionfont">Email:</span>
					<br>
					<br>
					<div class="userInfo-data">
						{{info.email}}
					</div>
				</div>
				<div v-if="!info.username && info && info.userId.userType == 'Business'" class="userInfo-email">
					<span class="actionfont">Email:</span>
					<br>
					<br>
					<div class="userInfo-data">
						{{info.userId.email}}
					</div>
				</div>
				<br>
				<div v-if="info && info.latitude && info.longitude" class="userInfo-email">
					<span class="actionfont">Location:</span>
					<br>
					<br>
					<div id="registerMap">
						<gmap-map :center="{lat: parseFloat(info.latitude), lng: parseFloat(info.longitude) }" :zoom="12" style="width: 100%; height: 100%">
							<gmap-marker :position="{lat: parseFloat(info.latitude), lng: parseFloat(info.longitude) }" :clickable="false"></gmap-marker>
						</gmap-map>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['info', 'sameUser', 'openForm'],
		name: 'userInfo',
		data() {
			return {
				empty: false
			}
		},
		created: function () {
			console.log("asd",this.info)
			if (localStorage.user) {
				this.loggedIn = localStorage.user
			}

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>