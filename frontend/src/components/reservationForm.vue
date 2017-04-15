<template>
    <div class="container text-center">

        <form v-on:submit="reserve">
            <label for="details" class="sr-only">Details</label>
            <input type="text" v-model="details" name="details" class="form-control" id="details" placeholder="details" required>

            <label for="numberOfParticipants" class="sr-only">Number Of Participants</label>
            <input type="number" v-model="countParticipants" name="countParticipants" id="numberOfParticipants" class="form-control" placeholder="participants"
                required>

        <div v-if="activity">
            <div v-for="day in activity.activitySlots">
                <div v-if="day.slots.length != 0">
                    <h2>{{ day.day }}</h2>
                    <li v-for="slot in day.slots">
                        <input name="chosen" v-if="slot.currentParticipants != slot.maxParticipants" type="radio" 
                        v-on:click="choose(slot._id, day._id, activity._id)">
                        {{day.day}} {{slot.time}} </input>

                        <p>Slots Remaining: <strong>{{ slot.maxParticipants -  slot.currentParticipants}}</strong></p>
                    </li>
                </div>
            </div>
        </div>
            <input type="submit" class="btn btn-lg btn-danger" value="Reserve">
        </form>

    <div v-if="errors.length > 0">
        <div class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong>
            <div v-for="error in errors">
                {{ error.msg }}
            </div>
        </div>
    </div>

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
                errors: [] 
            }
        },
        methods: {
            reserve: function(e) {
                e.preventDefault();
                var reservation = {
                    dayId: this.dayId,
                    slotId: this.slotId,
                    countParticipants: this.countParticipants,
                    details: this.details,
                    activityId: this.activityId
                };
                console.log(reservation);
                var uri = 'http://localhost:8080/client/makereservation';

                this.$http.post(uri, reservation)
                    .then(function(res){
                        console.log(res.data);
                    });
            },
            choose: function(sId, dId, aId, e) {
                this.slotId = sId;
                this.dayId = dId;
                this.activityId = aId;
            }
        }
    }
</script>