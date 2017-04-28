<template>
    <div v-if="userType==='Business'">

        <h5 id="addTiming">Add slots for: {{activity.name}}</h5>

        <div v-if="msg.length != 0" class="alert alert-success">
            <strong>{{msg}}</strong>
        </div>

        <form v-on:submit="addTiming">
            <div class="form-group">
                <label for="participantsInput">Day</label>
                <select class="form-control" name="day" id="day" v-model="day">
                    <option v-for="day in activity.activitySlots" :value="day">
                        {{day.day}}
                    </option>
                </select>
            </div>

            <div v-for="(slot,index) in slots">
                <div class="form-group">
                    <label for="participantsInput">Time</label>
                    <input type="time" id="time" name="timeInput" class="form-control" v-model="slot.time" required>
                </div>
                <div class="form-group">
                    <label for="participantsInput">Maximum Number Of Participants</label>
                    <input type="number" id="maxParticipants" name="participantsInput" class="form-control" placeholder="Maximum participants"
                        v-model="slot.maxParticipants" required>
                </div>
                <!--<div>
                    <button class="btn btn-danger" v-on:click="slots.splice(index,1)">X</button>
                </div>-->
                <hr>
            </div>

            <div class="center">	
				<pulseLoader :loading="loading"></pulseLoader>
			</div>
            <div class="row" v-if="!loading">
                <!--<button class="btn btn-danger" @click="addSlot">Add Slot</button> &nbsp;-->
                <input type="submit" class="btn btn-danger" value="Submit">
            </div>

        </form>


        <div>
            <unauthorized v-if="userType!='Business'"></unauthorized>
        </div>
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
    import unauthorized from './unauthorized'
    import pulseLoader from './PulseLoader.vue'

    var URL = require('./env.js').HostURL;
    var type = localStorage.getItem('userType');
    export default {
        props: ['activity', 'close'],
        name: 'addTimingForm',
        data() {
            return {
                slots: [{
                    time: '',
                    maxParticipants: 0
                }],
                day: 'day',
                errors: [],
                countSlots: [],
                slot: 'slot',
                errors: [],
                msg: [],
                loading:false
            }
        },
        methods: {

            addTiming: function (e) {
                e.preventDefault();
                this.loading=true;
                var newTiming = {
                    dayId: this.day._id
                }

                for (var i = 0; i < this.slots.length; i++) {
                    if (this.slots[i].time != '') {
                        newTiming.time = this.slots[i].time;
                        newTiming.maxParticipants = this.slots[i].maxParticipants;

                        this.$http.post(URL + '/business/addTiming', newTiming)
                            .then(function (res) {
                                this.loading=false;
                                if (res.data.errors) {
                                    this.errors = res.data.errors;
                                    this.$swal(
                                        'Failed!',
                                        res.data.errors[0].msg,
                                        'error'
                                    );                                    
                                } else {
                                    this.msg = res.data.msg;
                                    this.slots = [{
                                        time: '',
                                        maxParticipants: 0
                                    }];
                                    this.close();
                                    this.$swal(
                                        'Slot Added!',
                                        'A slot has been added on ' + this.day.day,
                                        'success'
                                    );
                                }
                            });
                    }
                }
            },

            addSlot: function (e) {
                e.preventDefault();
                var flag = false;
                for (var i = 0; i < this.slots.length; i++) {
                    if (this.slots[i].time == '' || this.slots[i].maxParticipants == 0)
                        flag = true;
                }
                if (!flag)
                    this.slots.push({
                        time: '',
                        maxParticipants: 0
                    });
            }
        },
        created: function () {
            this.userType = type;
        },
        components: {
            unauthorized,
            pulseLoader
        }
    }
</script>