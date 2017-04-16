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
        <div v-if="msg.length != 0">
            <strong>{{msg}}</strong>
        </div>

        <form v-on:submit="reserve">
            <!--<label for="details" class="sr-only">Details</label>-->
            <input type="text" v-model="details" name="details" class="form-control" id="details" placeholder="details" required>
            <br>

            <label for="numberOfParticipants" class="sr-only">Number Of Participants</label>
            <input type="number" min="1" v-model="countParticipants" name="countParticipants" id="numberOfParticipants" class="form-control" placeholder="participants"
                required>

        <div v-if="activity">
            <div v-for="day in activity.activitySlots">
                <div v-if="day.slots.length != 0">
                    <h2>{{ day.day }}</h2>

                    <select class="form-control" id="sel1" v-model="object">
                        <option v-for="slot in day.slots" :value="{ slot: slot, day: day }">
                            {{day.day}} {{slot.time}}
                        </option>
                    </select>


                    <!--<li v-for="slot in day.slots">
                        <input v-model="picked" :value="day.day + ' ' + slot.time" name="chosen" v-if="slot.currentParticipants != slot.maxParticipants" type="radio" 
                        v-on:click="choose(slot, day, activity._id)">
                        <strong>{{day.day}} {{slot.time}}</strong>    </input>

                        Available Slots Remaining: <strong>{{ slot.maxParticipants -  slot.currentParticipants}}</strong>
                    </li>-->
                    
                </div>
            </div>
        </div>
        <br><br>
            <h3>{{activity.name}}</h3><hr>
            <p>Date Picked: <strong>{{object.slot}}</strong></p>
            <p v-if="countParticipants.length != 0">Participants: <strong>{{countParticipants}}</strong></p>
            <p v-if="details.length != 0">Details: <strong>{{details}}</strong></p>
            <br>
            <input type="submit" class="btn btn-lg btn-danger" value="Reserve">
        </form>



    </div>
</template>

<script>
    export default {
        props: ['activity'],
        name: 'register',
        data() {
            return {
                countParticipants: '',
                details: '',
                activityId: '',
                dayId: '',
                slotId: '',
                errors: [],
                picked: '',
                msg: '',
                object: ''
            }
        },
        methods: {
            reserve: function(e) {
                e.preventDefault();
                var reservation = {
                    dayId: this.dayId,
                    slotId: this.object.slot._id,
                    countParticipants: this.countParticipants,
                    details: this.details,
                    activityId: this.activityId
                };
                console.log(reservation);
                var uri = 'http://localhost:8080/client/makereservation';

                this.$http.post(uri, reservation)
                    .then(function(res){
                        if(res.data.errors) {
                            this.errors = res.data.errors;
                        }
                        else {
                            this.msg = res.data.msg;
                            console.log(res.data);
                        }
                    });
            },
            choose: function(slot, day, aId, e) {
                console.log("henaa");
                this.slotId = slot._id;
                this.dayId = day._id;
                this.activityId = aId;
                //this.picked = day.day + ' at ' + slot.time;
            }
        }
    }
</script>