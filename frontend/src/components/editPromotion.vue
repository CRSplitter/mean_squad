<template>
	<div class="">
		<h2>Edit Promotion</h2>
		<div v-if="errors.length > 0">
			<div class="alert alert-danger">
				<strong>Oh snap!</strong>
				<div v-for="error in errors">
					{{ error.msg }}
				</div>
			</div>
		</div>
		<br>
        <div v-if="msg.length != 0" class="alert alert-success">
            <strong>{{msg}}</strong>
        </div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter details"  v-model="promotion.details" >
		</div>
		<div class="form-group">
			<input  class="form-control" placeholder="Enter discount value" type="number" v-model="promotion.discountValue">
		</div>
				<br>

		<div class="center">
		<button class="backgroudcolor3" @click="submit">Edit</button>

		</div>
	</div>
</template>
<script>
	export default {
		props: ['activity', 'promotion'],
		data() {
			return {
				promotionNew: {
					details: '',
					discountValue: ''
				},
				errors: [],
				msg: ''
			}
		},

		methods: {

			submit: function (e) {
				e.preventDefault();
				var uri = 'http://localhost:8080/business/editPromotion';

				console.log(this.promotion)
                this.$http.post(uri,{
					promotionId:this.promotion._id,
					discountValue:this.promotion.discountValue,
					details:this.promotion.details
				})
                    .then(function (res) {
						console.log(res)
                        if (res.data.errors) {
                            this.errors = res.data.errors;
                        } else {
                            this.msg = res.data.msg;
                            console.log(res.data);
                        }
                    });
            	}
			}
		}

	
</script>
<style scoped>

input{
	border-radius: 10px;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}
.min{
	margin-left: 10px;
}
button {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }
    .editContainer{
      position: relative;
    }

</style>