<template>
    <div  v-if="userType==='Site Admin'">

    <form v-on:submit="addTiming">
    <div class="form-group">
        <label for="inputDay" class="sr-only">Day</label>
        <select name="day" id="day" v-model="day">
            <option diabled value="">Choose day</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Saturday">Wednesday</option>
            <option value="Wednesday">Saturday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
        </select>
    </div>
        <label for="inputSlots" class="sr-only">Slot(s)</label>
        <label for="timeInput" class="sr-only">Choose time:</label>
        <section class="Form__section">
                <div class="Form__section__fields" v-for="slot in countSlots">
                    <div class="row">
                        <div class="form-group">
                        <input type="time" id="time" name="timeInput" class="form-control" v-model="time" required>
                        </div>
                        <button class="btn btn-danger" @click="removeSlot">Remove Slot</button>
                    </div>
                </div>
            </section>
        <div class="row" >
            <button class="btn btn-danger" @click="addSlot">Add Slot</button>
            &nbsp;
            <input type="submit" class="btn btn-danger" value="Submit">
        </div>
    </form>
    <div>
    <unauthorized v-if="userType!='Site Admin'"></unauthorized>
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
    var type = localStorage.getItem('userType');
    export default {
        props: ['activity'],
        name: 'addTiming',
        data() {
            return {
                slots: [
                    {time:'timeInput'}
                ],
                day:'day',
                errors:[],
                countSlots:[],
                slot:'slot'
            }
        },
        methods:{
            addTiming: function(e){
                e.preventDefault();
                console.log("added");
                //var countParticipants = this.activity.maxNumberOfParticipants;
            },
            addSlot: function(e){
                e.preventDefault();
                this.countSlots.push(this.slot);               
            },
            removeSlot: function(e){

            }
        },
        created: function(){
            this.countSlots.push(this.slot);
            this.userType = type;
        },
        components: {
            unauthorized
        }
    }
</script>