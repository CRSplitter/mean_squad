<template>

    <div class="container text-center">
        <div v-if="errors.length > 0">
            <div class="alert alert-danger">
                <strong>Oh snap!</strong>
                <div v-for="error in errors">
                    {{ error.msg }}
                </div>
            </div>
        </div>
        <div v-if="msg.length != 0" class="alert alert-success">
            <strong>{{msg}}</strong>
        </div>


        <form v-on:submit="reserve">
            <!--<label for="details" class="sr-only">Details</label>-->
            <input type="text" v-model="details" name="details" class="form-control" id="details" placeholder="details" required>
            <br>

            <label for="numberOfParticipants" class="sr-only">Number Of Participants</label>
            <input type="number" min="1" v-model="countParticipants" name="countParticipants" id="numberOfParticipants" class="form-control"
                placeholder="participants" required>

            <br>
            <div v-if="activity">
                <select class="form-control" v-model="selected">
                    <optgroup v-for="day in activity.activitySlots" v-if="day.slots && day.slots.length != 0" :label="day.day">
                        <option v-for="slot in day.slots" :value="{slot: slot, day: day}">
                            {{day.day}} {{slot.time}} <strong>Slots Remaining: </strong> {{slot.maxParticipants - slot.currentParticipants}}
                        </option>
                    </optgroup>
                </select>
            </div>


            <br><br>
            <h3 v-if="activity">{{activity.name}}</h3>
            <hr>
            <table class="table">
            <tr v-if="selected.day.length != 0">
                <td>Date</td>
                <td>{{selected.day.day}} {{selected.slot.time}}</td>
            </tr>
            <tr v-if="countParticipants != 0"> 
                <td>Participants</td>
                <td>{{countParticipants}}</td>
            </tr>
            <tr v-if="details.length != 0">
                <td>Details</td>
                <td>{{details}}</td>
            </tr>
            <tr v-if="totalPrice != 0">
                <td>Total Price</td>
                <td>{{totalPrice}} LE</td>

            </tr>
            </table>
            <br>
            <input type="submit" class="btn btn-lg btn-danger" value="Reserve">
        </form>



    </div>
</template>

<script>
    var URL = require('./env.js').HostURL;
    export default {
        props: ['activity', 'close'],
        name: 'register',
        data() {
            return {
                countParticipants: 0,
                details: '',
                errors: [],
                msg: '',
                selected: {
                    day: '',
                    slot: ''
                }
            }
        },
        methods: {
            reserve: function (e) {
                e.preventDefault(); //prevents the page from refreshing upon form submission
                var reservation = {
                    dayId: this.selected.day._id,
                    slotId: this.selected.slot._id,
                    countParticipants: this.countParticipants,
                    details: this.details,
                    activityId: this.activity._id
                };
                var userType = localStorage.getItem('userType');
                var uri = URL + '/client/makereservation';

                if(userType === 'Business Operator') {
                    uri = URL + '/businessoperator/makeReservation';
                }

                this.$http.post(uri, reservation)
                    .then(function (res) {
                        if (res.data.errors) {
                            this.errors = res.data.errors;
                            this.$swal(
                                'Failed!',
                                res.data.errors[0].msg,
                                'error'
                            );
                        } else {
                            this.msg = res.data.msg;
							this.close();
							this.$swal(
								'Reservation made!',
								this.msg,
								'success'
							);
                        }
                    });
            }
        },
        computed: {
            totalPrice: function() {
                if(this.activity) {
                    return this.countParticipants * this.activity.price;
                }
                return 0;
            }
        }
    }
</script>
<style>
table {
    border-collapse: collapse;
    width: 50%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
</style>
