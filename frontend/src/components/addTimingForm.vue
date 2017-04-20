<template>
    <div  v-if="userType==='Business'">
    
    <h5 id="addTiming">Add slots for {{activity.name}}</h5>     

    <div v-if="msg.length != 0" class="alert alert-success">
            <strong>{{msg}}</strong>
    </div>

    <div v-if="warning.length != 0" class="alert alert-warning">
            <strong>{{warning}}</strong>
    </div>

    <form v-on:submit="addTiming">

    <div class="form-group">
        <select class="form-control" name="day" id="day" v-model="day">
            <option v-for="day in activity.activitySlots" :value="{day: day}">
                {{day.day}}
            </option>
        </select>
    </div>

    <div class="row" v-for="(slot,index) in slots">
        <div class="form-group row">
        <input type="time" id="time" name="timeInput" class="form-control" v-model="slot.time" required>
        </div>
        <div>
        <input type="number" id="maxParticipants" name="participantsInput" class="form-control" placeholder="Maximum participants" v-model="slot.maxParticipants" required>
        </div>
        <div>
        <button class="btn btn-danger" v-on:click="slots.splice(index,1)">X</button>
        </div>
    </div>


    <div class="row" >
        <button class="btn btn-danger" @click="addSlot">Add Slot</button>
        &nbsp;
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
    var URL = require('./env.js').HostURL;
    var type = localStorage.getItem('userType');
    export default {
        props: ['activity'],
        name: 'addTiming',
        data() {
            return {
                slots: [{
                    time:'',
                    maxParticipants:0
                }],
                day:'day',
                errors:[],
                countSlots:[],
                slot:'slot',
                errors:[],
                msg:[],
                warning:[]
            }
        },
        methods:{
            
            addTiming: function(e){
                e.preventDefault();
                console.log("added");
                var added = false;

                var newTiming={
                    dayId: this.day._id
                }
 
                for(var i=0; i<this.slots.length; i++){
                    if(this.slots[i].time!=''&&this.slots[i]>0){
                        newTiming.time=this.slots[i].time;
                        newTiming.maxParticipants=this.slots[i].maxParticipants;

                        this.$http.post(URL+'/business/addTiming', newTiming)
                            .then(function (res) {
                                if (res.data.errors) {
                                    this.errors = res.data.errors;
                                } else {
                                    this.msg = res.data.msg;
                                    added=true;
                                }
                        });
                    }
                }
                if(!added){
                    this.warning='There are no timings to add';
                }
            },

            addSlot: function(e){
                e.preventDefault();
                var flag = false;
                for(var i = 0; i<this.slots.length; i++){
                    if(this.slots[i].time =='' || this.slots[i].maxParticipants==0)
                      flag = true;
                    console.log(this.slots[i])
                }
                if(!flag)
                    this.slots.push({time:'', maxParticipants:0});
            }
        },
        created: function(){
            this.userType = type;
        },
        components: {
            unauthorized
        }
    }
</script>