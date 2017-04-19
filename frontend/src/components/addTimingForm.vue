<template>
    <div>

    <form v-on:submit="addTiming">
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
        
        <label for="inputSlots" class="sr-only">Slot(s)</label>
        <label for="timeInput" class="sr-only">Choose time:</label>
        <section class="Form__section">
                <div class="Form__section__fields" v-for="slot in countSlots">
                    <div class="Form__group">
                        <input type="time" id="time" name="timeInput" class="Form__element" placeholder="Time">
                    </div>
                </div>
                <button class="Form__button" @click="addSlot">Add Slot</button>
            </section>

        <input type="submit" class="btn btn-danger" value="Submit">
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
            }
        },
        created: function(){
            this.countSlots.push(this.slot);
        }
    }
</script>